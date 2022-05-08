import firebase from 'firebase/app';

export type ReviewComment = {
  commentId: string;
  text: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  uid: string;
  radioId: string;
};
