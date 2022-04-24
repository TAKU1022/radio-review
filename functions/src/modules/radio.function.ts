import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  functions.config().algolia.id as string,
  functions.config().algolia.key as string
);
const radioIndex = client.initIndex('radios');

export const syncRadioToAlgolia = functions
  .region('asia-northeast1')
  .firestore.document(`radios/{radioId}`)
  .onWrite((change, context) => {
    const newData = change.after.exists ? change.after.data() : null;

    if (!newData) {
      return radioIndex.deleteObject(context.params.radioId);
    }

    return radioIndex.saveObject({
      objectID: context.params.radioId,
      ...newData,
    });
  });
