import firebase from 'firebase/app';
import { User } from '@/types/user';
import { db } from '..';

export const userConverter = {
  toFirestore(
    user: User<firebase.firestore.Timestamp>
  ): firebase.firestore.DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): User<firebase.firestore.Timestamp> {
    const data = snapshot.data(options) as User<firebase.firestore.Timestamp>;
    return {
      ...data,
    };
  },
};

export const fetchUserById = async (
  uid: string
): Promise<User<Date> | undefined> => {
  const snapshot: firebase.firestore.DocumentSnapshot<
    User<firebase.firestore.Timestamp>
  > = await db.collection('users').withConverter(userConverter).doc(uid).get();
  const user: User<firebase.firestore.Timestamp> | undefined = snapshot.data();

  if (!user) return;

  return { ...user, createdAt: user.createdAt.toDate() };
};
