import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import firebase from 'firebase/app';
import { User } from '@/types/user';
import { auth, db } from '../firebase';
import { userConverter } from '../firebase/db/user';

type UserContext = {
  user: User | null;
  firebaseUser: firebase.User | null;
  changeUser: Dispatch<SetStateAction<User | null>>;
  changeFirebaseUser: Dispatch<SetStateAction<firebase.User | null>>;
};

export const UserContext = createContext<UserContext | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, changeUser] = useState<User | null>(null);
  const [firebaseUser, changeFirebaseUser] = useState<firebase.User | null>(
    null
  );

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
              changeUser(snapshot.data() || null);
              firebaseUserData.getIdToken(true);
            });
        } else {
          changeUser(null);
        }

        changeFirebaseUser(firebaseUserData);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, firebaseUser, changeUser, changeFirebaseUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
