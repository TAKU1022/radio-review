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
import { destroyCookie, setCookie } from 'nookies';

type UserContext = {
  user: User<Date> | null;
  firebaseUser: firebase.User | null;
  changeUser: Dispatch<SetStateAction<User<Date> | null>>;
  changeFirebaseUser: Dispatch<SetStateAction<firebase.User | null>>;
};

export const UserContext = createContext<UserContext | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, changeUser] = useState<User<Date> | null>(null);
  const [firebaseUser, changeFirebaseUser] = useState<firebase.User | null>(
    null
  );

  useEffect(() => {
    let unsubscribeUser: firebase.Unsubscribe;
    const unsubscribeAuth = auth.onAuthStateChanged(
      (firebaseUserData: firebase.User | null) => {
        if (firebaseUserData) {
          const uid = firebaseUserData.uid;
          setCookie(null, 'uid', uid, { maxAge: 30 * 24 * 60 * 60 });

          unsubscribeUser = db
            .collection('users')
            .withConverter(userConverter)
            .doc(uid)
            .onSnapshot((snapshot) => {
              const userData: User<firebase.firestore.Timestamp> | undefined =
                snapshot.data();
              changeUser(
                userData
                  ? { ...userData, createdAt: userData.createdAt.toDate() }
                  : null
              );
              firebaseUserData.getIdToken(true);
            });
        } else {
          destroyCookie(null, 'uid');
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
