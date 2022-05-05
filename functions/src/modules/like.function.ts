import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { markEventTried, shouldEventRun } from './util';

const db = admin.firestore();

export const countUpLiked = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/likedRadios/{radioId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await db
          .doc(`radios/${context.params.radioId}`)
          .update('likedCount', admin.firestore.FieldValue.increment(1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

export const countDownLiked = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/likedRadios/{radioId}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      return db
        .doc(`radios/${context.params.radioId}`)
        .update('likedCount', admin.firestore.FieldValue.increment(-1));
    });
  });
