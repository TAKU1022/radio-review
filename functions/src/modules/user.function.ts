import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { User } from '@/types/user';
admin.initializeApp();

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((userRecord: UserRecord) => {
    const user: Omit<User, 'createdAt'> = {
      uid: userRecord.uid,
      name: userRecord.displayName,
      avatarURL: userRecord.photoURL,
      email: userRecord.email,
      isAdmin: false,
    };

    return db
      .doc(`users/${userRecord.uid}`)
      .set({ ...user, createdAt: new Date() });
  });
