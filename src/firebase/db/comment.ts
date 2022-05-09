import firebase from 'firebase/app';
import { ReviewComment } from '@/types/reviewComment';
import { db } from '..';

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
