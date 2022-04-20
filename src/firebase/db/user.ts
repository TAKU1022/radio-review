import firebase from 'firebase/app';
import { User } from '@/types/user';

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
