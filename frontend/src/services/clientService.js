import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Create or update client profile
export const createClientProfile = async (userId, userData) => {
  try {
    const clientRef = doc(db, 'clients', userId);
    const clientDoc = await getDoc(clientRef);

    const clientData = {
      ...userData,
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    };

    if (!clientDoc.exists()) {
      // Create new client profile
      await setDoc(clientRef, {
        ...clientData,
        createdAt: serverTimestamp(),
        activePostings: [],
        completedPostings: [],
        totalPostings: 0,
        totalSpent: 0,
        rating: 0,
        totalRatings: 0,
        completedProjects: 0,
        activeProjects: 0
      });
    } else {
      // Update existing client
      await updateDoc(clientRef, clientData);
    }
  } catch (error) {
    console.error('Error creating/updating client profile:', error);
    throw error;
  }
};

// Get client profile
export const getClientProfile = async (userId) => {
  try {
    const clientRef = doc(db, 'clients', userId);
    const clientDoc = await getDoc(clientRef);
    
    if (clientDoc.exists()) {
      return { id: clientDoc.id, ...clientDoc.data() };
    } else {
      throw new Error('Client profile not found');
    }
  } catch (error) {
    console.error('Error getting client profile:', error);
    throw error;
  }
};

// Post a new project
export const postProject = async (userId, projectData) => {
  try {
    // First add project to projects collection
    const projectRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      clientId: userId,
      status: 'open',
      applicants: [],
      freelancerId: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Then update client's active postings
    const clientRef = doc(db, 'clients', userId);
    const projectWithId = {
      ...projectData,
      id: projectRef.id,
      status: 'open',
      createdAt: serverTimestamp()
    };

    await updateDoc(clientRef, {
      activePostings: arrayUnion(projectWithId),
      totalPostings: (await getDoc(clientRef)).data().totalPostings + 1,
      activeProjects: (await getDoc(clientRef)).data().activeProjects + 1,
      updatedAt: serverTimestamp()
    });

    return projectRef.id;
  } catch (error) {
    console.error('Error posting project:', error);
    throw error;
  }
};

// Get client's projects
export const getClientProjects = async (userId) => {
  try {
    const q = query(
      collection(db, 'projects'),
      where('clientId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const projects = [];
    
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    return projects;
  } catch (error) {
    console.error('Error getting client projects:', error);
    throw error;
  }
};

// Update project status
export const updateProjectStatus = async (projectId, status, clientId) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      status,
      updatedAt: serverTimestamp()
    });

    // Also update in client's postings
    const clientRef = doc(db, 'clients', clientId);
    const clientDoc = await getDoc(clientRef);
    
    if (clientDoc.exists()) {
      const clientData = clientDoc.data();
      const activePostings = clientData.activePostings || [];
      const completedPostings = clientData.completedPostings || [];

      // Find and update the project
      const updatedActivePostings = activePostings.map(project => 
        project.id === projectId ? { ...project, status, updatedAt: serverTimestamp() } : project
      );

      // If status is completed, move to completed postings
      if (status === 'completed') {
        const completedProject = updatedActivePostings.find(p => p.id === projectId);
        const remainingActivePostings = updatedActivePostings.filter(p => p.id !== projectId);
        
        if (completedProject) {
          await updateDoc(clientRef, {
            activePostings: remainingActivePostings,
            completedPostings: [...completedPostings, { ...completedProject, status: 'completed' }],
            activeProjects: Math.max(0, clientData.activeProjects - 1),
            completedProjects: (clientData.completedProjects || 0) + 1,
            updatedAt: serverTimestamp()
          });
        }
      } else {
        await updateDoc(clientRef, {
          activePostings: updatedActivePostings,
          updatedAt: serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.error('Error updating project status:', error);
    throw error;
  }
};

// Accept freelancer application
export const acceptFreelancerApplication = async (projectId, freelancerId, clientId) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      freelancerId,
      status: 'in-progress',
      updatedAt: serverTimestamp()
    });

    // Update client's active postings
    const clientRef = doc(db, 'clients', clientId);
    const clientDoc = await getDoc(clientRef);
    
    if (clientDoc.exists()) {
      const activePostings = clientDoc.data().activePostings || [];
      const updatedPostings = activePostings.map(project => 
        project.id === projectId 
          ? { ...project, freelancerId, status: 'in-progress', updatedAt: serverTimestamp() }
          : project
      );

      await updateDoc(clientRef, {
        activePostings: updatedPostings,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error accepting freelancer application:', error);
    throw error;
  }
};

// Get project applicants
export const getProjectApplicants = async (projectId) => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('projectId', '==', projectId)
    );
    
    const querySnapshot = await getDocs(q);
    const applicants = [];
    
    querySnapshot.forEach((doc) => {
      applicants.push({ id: doc.id, ...doc.data() });
    });

    return applicants;
  } catch (error) {
    console.error('Error getting project applicants:', error);
    throw error;
  }
};