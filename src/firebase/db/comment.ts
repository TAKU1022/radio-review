import firebase from 'firebase/app';
import { ReviewComment, ReviewCommentWithUser } from '@/types/reviewComment';
import { db } from '..';
import { fetchUserById } from './user';
import { User } from '@/types/user';

export const reviewCommentConverter = {
  toFirestore(
    reviewComment: ReviewComment<firebase.firestore.Timestamp>
  ): firebase.firestore.DocumentData {
    return { ...reviewComment };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ReviewComment<firebase.firestore.Timestamp> {
    const data = snapshot.data(
      options
    ) as ReviewComment<firebase.firestore.Timestamp>;
    return {
      ...data,
    };
  },
};

export const createReviewComment = (
  reviewComment: Omit<ReviewComment<Date>, 'commentId'>
): Promise<void> => {
  const commentId: string = db.collection('_').doc().id;
  return db
    .collection('radios')
    .doc(reviewComment.radioId)
    .collection('reviewComments')
    .doc(commentId)
    .set({
      ...reviewComment,
      commentId,
    });
};

export const fetchReviewCommentsWithUser = async (
  radioId: string
): Promise<ReviewCommentWithUser[] | undefined> => {
  const snapshot = await db
    .collection('radios')
    .doc(radioId)
    .collection('reviewComments')
    .withConverter(reviewCommentConverter)
    .get();

  if (!snapshot || snapshot.docs.length === 0) return;

  const reviewCommentList: ReviewComment<firebase.firestore.Timestamp>[] =
    snapshot.docs.map(
      (
        doc: firebase.firestore.QueryDocumentSnapshot<
          ReviewComment<firebase.firestore.Timestamp>
        >
      ) => doc.data()
    );
  const reviewCommentWithUserList: ReviewCommentWithUser[] = await Promise.all(
    reviewCommentList.map(
      async (reviewComment: ReviewComment<firebase.firestore.Timestamp>) => {
        const user: User<Date> | undefined = await fetchUserById(
          reviewComment.uid
        );
        return {
          reviewComment: {
            ...reviewComment,
            createdAt: reviewComment.createdAt.toDate(),
            updatedAt: reviewComment.updatedAt.toDate(),
          },
          user,
        };
      }
    )
  );

  return reviewCommentWithUserList;
};
