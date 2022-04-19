import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import firebase from 'firebase/app';
import { User } from '@/types/user';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase';
import { userConverter } from '../firebase/db/user';

type UserContext = {
  user: User | null;
  firebaseUser: firebase.User | null;
  updateUser: Dispatch<SetStateAction<User | null>>;
  updateFirebaseUser: Dispatch<SetStateAction<firebase.User | null>>;
};

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContext | null>(null);

export const UserProvider: React.VFC<Props> = ({ children }) => {
  const [user, updateUser] = useState<User | null>(null);
  const [firebaseUser, updateFirebaseUser] = useState<firebase.User | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    let unsubscribeUser: firebase.Unsubscribe;
    const unsubscribeAuth = auth.onAuthStateChanged(
      (firebaseUserData: firebase.User | null) => {
        if (firebaseUserData) {
          const uid = firebaseUserData.uid;

          unsubscribeUser = db
            .collection('users')
            .withConverter(userConverter)
            .doc(uid)
            .onSnapshot((snapshot) => {
              updateUser(snapshot.data() || null);
              firebaseUserData.getIdToken(true);
            });
        } else {
          router.push('/sign_in');
          updateUser(null);
        }

        updateFirebaseUser(firebaseUserData);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, firebaseUser, updateUser, updateFirebaseUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
