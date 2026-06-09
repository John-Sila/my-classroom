import React, { createContext, useContext, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, Timestamp, getDocFromServer } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useAuthStore } from '../store/authStore';
import { UserProfile, OperationType } from '../types';
import { handleFirestoreError } from '../utils/firebaseErrors';

const AuthContext = createContext({});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setLoading } = useAuthStore();

useEffect(() => {
  setLoading(true); // ← ensure loading starts true before listener attaches

    // 1. Connection check as required
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();

  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          const lastLogin = userData.lastLogin.toDate();
          const diffInMs = Date.now() - lastLogin.getTime();

          if (diffInMs > 60 * 60 * 1000) {
            await signOut(auth);
            setUser(null);
          } else {
            setUser({ ...userData, uid: firebaseUser.uid });
          }
        } else {
          if (firebaseUser.email === 'jsila3000@gmail.com') {
            const newProfile: any = { /* unchanged */ };
            await setDoc(userDocRef, newProfile);
            setUser(newProfile);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false); // ← always fires last, after user is set
  });

  return () => unsubscribe();
}, [setUser, setLoading]);


  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
