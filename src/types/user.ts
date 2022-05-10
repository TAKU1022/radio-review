import firebase from 'firebase/app';

export type User<T> = {
  uid: string;
  name?: string;
  avatarURL?: string;
  email?: string;
  createdAt: T;
  isAdmin: boolean;
};
