import firebase from 'firebase/app';

export type User = {
  uid: string;
  name?: string;
  avatarURL?: string;
  email?: string;
  createdAt: firebase.firestore.Timestamp;
  isAdmin: boolean;
};
