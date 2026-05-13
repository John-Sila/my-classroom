import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError } from '../lib/errorHandler';
import { OperationType, type Test, type TestAttempt, type UserProfile, type Question } from '../types';

export const FirestoreService = {
  // Users
  async createUserProfile(profile: Partial<UserProfile>) {
    const path = `users/${profile.uid}`;
    try {
      await setDoc(doc(db, 'users', profile.uid!), {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async getAllLearners() {
    const path = 'users';
    try {
      const q = query(collection(db, 'users'), where('rank', '==', 'learner'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id })) as UserProfile[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  // Tests
  async createTest(test: any, questions: any[]) {
    const path = 'tests';
    try {
      const testRef = await addDoc(collection(db, 'tests'), {
        ...test,
        createdAt: serverTimestamp(),
        timestamp: serverTimestamp(),
        isActive: true
      });
      
      // Subcollection for questions
      const questionPromises = questions.map(q => 
        addDoc(collection(db, `tests/${testRef.id}/questions`), q)
      );
      await Promise.all(questionPromises);
      
      return testRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async getTests() {
    const path = 'tests';
    try {
      const q = query(collection(db, 'tests'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Test[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  // Attempts
  listenToTestAttempts(testId: string, callback: (attempts: TestAttempt[]) => void) {
    const path = 'testAttempts';
    const q = query(collection(db, 'testAttempts'), where('testId', '==', testId), orderBy('score', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const attempts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as TestAttempt[];
      callback(attempts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }
};
