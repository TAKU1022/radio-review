import firebase from 'firebase/app';
import { ReviewComment, ReviewCommentWithUser } from '@/types/reviewComment';
import { db } from '..';
import { fetchUserById } from './user';

export const reviewCommentConverter = {
  toFirestore(reviewComment: ReviewComment): firebase.firestore.DocumentData {
    return { ...reviewComment };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ReviewComment {
    const data = snapshot.data(options) as ReviewComment;
    return {
      ...data,
    };
  },
};

export const createReviewComment = (
  reviewComment: Omit<ReviewComment, 'commentId'>
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

  if (!snapshot) return;

  const reviewCommentList: ReviewComment[] = snapshot.docs.map(
    (doc: firebase.firestore.QueryDocumentSnapshot<ReviewComment>) => doc.data()
  );
  const reviewCommentsWithUser: ReviewCommentWithUser[] = await Promise.all(
    reviewCommentList.map(async (reviewComment: ReviewComment) => {
      return {
        reviewComment,
        user: await fetchUserById(reviewComment.uid),
      };
    })
  );

  return reviewCommentsWithUser;
};
