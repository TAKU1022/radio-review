import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import firebase from 'firebase/app';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { User } from '@/types/user';
admin.initializeApp();

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((userRecord: UserRecord) => {
    const user: User = {
      uid: userRecord.uid,
      name: userRecord.displayName,
      avatarURL: userRecord.photoURL,
      email: userRecord.email,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      isAdmin: false,
    };

    return db.doc(`users/${userRecord.uid}`).set({ ...user });
  });
