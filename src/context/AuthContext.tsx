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
      // Set loading true at the START of every auth transition (not just on mount).
      // Without this, a login event that fires after the initial mount leaves
      // loading=false while the Firestore read below is still in flight, which
      // lets ProtectedRoute see {user: null, loading: false} and bounce back to
      // /login before setUser() ever runs.
      setLoading(true);

      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;

            // Use Firebase Auth's own sign-in timestamp instead of the
            // Firestore lastLogin field. The Firestore field is also written
            // by Login.tsx's updateDoc call as part of the same login flow,
            // so reading it here race against that write and could see a
            // stale value from the previous session.
            const lastSignIn = firebaseUser.metadata.lastSignInTime
              ? new Date(firebaseUser.metadata.lastSignInTime).getTime()
              : 0;
            const diffInMs = Date.now() - lastSignIn;

            if (diffInMs > 60 * 60 * 1000) {
              await signOut(auth);
              setUser(null);
            } else {
              setUser({ ...userData, uid: firebaseUser.uid });
            }
          } else {
            await signOut(auth);
            window.location.reload();
            return;
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);