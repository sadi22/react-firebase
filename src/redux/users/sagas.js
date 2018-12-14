import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
import omit from 'lodash/omit';
import fakeData from './fakeData';

const {
  database,
  createBatch,
  rsfFirestore,
  createNewRef,
  storage,
  processFireStoreCollection,
} = FirebaseHelper;
const fakeDataList = new fakeData(5).getAll();

/**
 * DOC: https://redux-saga-firebase.js.org/reference/dev/firestore
 */

const COLLECTION_NAME = 'users'; // change your collection
const ORDER_BY = 'id';
const ORDER = 'desc';

function* loadFromFirestore() {

  try {
    const collections = database
      .collection(COLLECTION_NAME)
      // .where('deleted_at', '==', null)
      .orderBy(ORDER_BY, ORDER);
    const snapshot = yield call(rsfFirestore.getCollection, collections);
    let data = processFireStoreCollection(snapshot);
    yield put(actions.loadFromFireStoreSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.loadFromFireStoreError(error));
  }
}

function* storeIntoFirestore({ payload }) {
  const { data, picture, actionName } = payload;
  try {
    switch (actionName) {
      case 'delete':
        yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${data.key}`, {
          deleted_at: new Date().getTime(),
        });
        break;
      case 'update':
          var save = false;
          var storageUrl = 'users/';
          var blob = new Blob([picture], { type: "image/jpeg" });
          var uploadTask = storage
              .ref(storageUrl)
              .child(picture.name)
              .put(blob);
          uploadTask.on('state_changed',
              function(snapshot){
          }, function(error) {
          }, function() {
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  data['profilePictureUrl'] = downloadURL;
                  console.log(data);
                  // rsfFirestore.setDocument(`${COLLECTION_NAME}/${data.key}`, {
                  //     ...omit(data, ['key']),
                  // });
                  var update = {};
                  update[data.key] = data;
                  database.ref().child('user').update(update);
                  save = true;
              });
          });

          // var updates = {};
          // updates['/posts/' + newPostKey] = postData;
          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;


          // console.log('Test');
          // yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${data.key}`, {
          //     ...omit(data, ['key']),
          // }) ;
          break;
      default:

          yield call(rsfFirestore.addDocument, COLLECTION_NAME, data);
          break;
    }
    yield put({ type: actions.LOAD_FROM_FIRESTORE });
  } catch (error) {
    console.log(error);
    yield put(actions.saveIntoFireStoreError(error));
  }
}

function* storeImageOntoFirestore({ payload }) {
    const { picture, actionName, folderName } = payload;
    try {
        switch (actionName) {
            default:
                var storageUrl = 'users/';
                var blob = new Blob([picture], { type: "image/jpeg" });
                var uploadTask = storage
                    .ref(storageUrl)
                    .child(picture.name)
                    .put(blob);
                uploadTask.on('state_changed',
                    function(snapshot){
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            return downloadURL;
                        });
                    });

                break;
        }
        yield put({ type: actions.LOAD_FROM_FIRESTORE });
    } catch (error) {
        console.log(error);
        yield put(actions.saveIntoFireStoreError(error));
    }
}


const readAllFirestoreDocuments = async () =>
  await database
    .collection(COLLECTION_NAME)
    .get()
    .then(querySnapshot => {
      const documents = [];
      try {
        querySnapshot.forEach(doc => {
          documents.push(doc.id);
        });
      } catch (e) {}
      return documents;
    });

function* resetFireStoreDocuments() {
  try {
    const docsKey = yield call(readAllFirestoreDocuments);

    let batch = createBatch();
    docsKey.forEach(key => {
      batch.delete(database.collection(COLLECTION_NAME).doc(key));
      batch.commit();
      batch = createBatch();
    });

    batch = createBatch();
    fakeDataList.forEach(user => {
      const doc = database.collection(COLLECTION_NAME).doc(createNewRef());
      batch.set(doc, user);
    });
    batch.commit();

    yield put({ type: actions.LOAD_FROM_FIRESTORE });
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_FROM_FIRESTORE, loadFromFirestore),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
    takeEvery(actions.SAVE_IMAGE_INTO_FIRESTOR, storeImageOntoFirestore),
    takeEvery(actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments),
  ]);
}
