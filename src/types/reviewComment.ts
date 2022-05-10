import firebase from 'firebase/app';
import { User } from './user';

export type ReviewComment<T> = {
  commentId: string;
  text: string;
  createdAt: T;
  updatedAt: T;
  uid: string;
  radioId: string;
};

export type ReviewCommentWithUser = {
  reviewComment: ReviewComment<Date>;
  user?: User<Date>;
};
