import firebase from 'firebase/app';
import { Radio } from '@/types/radikoProgram';
import { db } from '..';

export const radioConverter = {
  toFirestore(user: Radio): firebase.firestore.DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Radio {
    const data = snapshot.data(options) as Radio;
    return {
      ...data,
    };
  },
};

export const createRadio = (radio: Omit<Radio, 'radioId'>) => {
  const radioId: string = db.collection('_').doc().id;
  return db
    .collection('radios')
    .doc(radioId)
    .set({ ...radio, radioId });
};
