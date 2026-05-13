import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuthStore } from '../store/useStore';
import type { UserProfile } from '../types';

export function useAuth() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          
          // Check for 1 hour inactivity
          const now = Date.now();
          const lastLogin = userData.lastLogin?.toMillis?.() || 0;
          const oneHour = 60 * 60 * 1000;

          if (now - lastLogin > oneHour && lastLogin !== 0) {
            await signOut(auth);
            setUser(null);
          } else {
            // Update lastLogin on every successful session start/refresh
            await updateDoc(doc(db, 'users', firebaseUser.uid), {
              lastLogin: serverTimestamp(),
            });
            setUser({ ...userData, uid: firebaseUser.uid });
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);
}
