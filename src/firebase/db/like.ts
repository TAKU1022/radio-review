import firebase from 'firebase/app';
import { db } from '..';

export const likeRadio = (userId: string, radioId: string): Promise<void> => {
  return db
    .collection('users')
    .doc(userId)
    .collection('likedRadios')
    .doc(radioId)
    .set({ radioId });
};

export const unLikeRadio = (userId: string, radioId: string): Promise<void> => {
  return db
    .collection('users')
    .doc(userId)
    .collection('likedRadios')
    .doc(radioId)
    .delete();
};

export const fetchIsLikedRadio = async (
  userId: string,
  radioId: string
): Promise<boolean> => {
  const snapshot = await db
    .collection('users')
    .doc(userId)
    .collection('likedRadios')
    .doc(radioId)
    .get();

  return !!snapshot.id;
};
