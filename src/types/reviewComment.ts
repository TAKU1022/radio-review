import firebase from 'firebase/app';
import { User } from './user';

export type ReviewComment = {
  commentId: string;
  text: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  uid: string;
  radioId: string;
};

export type ReviewCommentWithUser = {
  reviewComment: ReviewComment;
  user: User;
};
