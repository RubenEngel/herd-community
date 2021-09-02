import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firestore } from '../firebase';
import { auth } from '../firebase';

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
  }, [user]);

  return { user, username };
};
