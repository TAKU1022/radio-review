import firebase from 'firebase/app';
import { Radio } from '@/types/radikoProgram';
import { db } from '..';

export const radioConverter = {
  toFirestore(radio: Radio): firebase.firestore.DocumentData {
    return { ...radio };
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

export const createRadio = (radio: Omit<Radio, 'radioId'>): Promise<void> => {
  const radioId: string = db.collection('_').doc().id;
  return db
    .collection('radios')
    .doc(radioId)
    .set({ ...radio, radioId });
};

export const fetchAllRadio = async (): Promise<Radio[]> => {
  const snapshot = await db
    .collection('radios')
    .withConverter(radioConverter)
    .get();
  const radioList = snapshot.docs.map(
    (doc: firebase.firestore.QueryDocumentSnapshot<Radio>) => doc.data()
  );

  return radioList;
};

export const fetchRadioById = async (
  radioId: string
): Promise<Radio | undefined> => {
  const snapshot = await db
    .collection('radios')
    .withConverter(radioConverter)
    .doc(radioId)
    .get();

  return snapshot.data();
};

export const deleteRadioById = async (radioId: string): Promise<void> => {
  return db.collection('radios').doc(radioId).delete();
};
