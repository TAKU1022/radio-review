import firebase from 'firebase/app';
import { User } from '@/types/user';
import { db } from '..';

export const userConverter = {
  toFirestore(user: User): firebase.firestore.DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): User {
    const data = snapshot.data(options) as User;
    return {
      ...data,
    };
  },
};

export const fetchUserById = async (uid: string): Promise<User | undefined> => {
  const snapshot: firebase.firestore.DocumentSnapshot<User> = await db
    .collection('users')
    .withConverter(userConverter)
    .doc(uid)
    .get();

  return snapshot.data();
};
