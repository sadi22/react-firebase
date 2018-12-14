const DOCUMENT = 'USERS_';

const actions = {
  LOAD_FROM_FIRESTORE: DOCUMENT + 'LOAD_FROM_FIRESTORE',
  LOAD_FROM_FIRESTORE_SUCCESS: DOCUMENT + 'LOAD_FROM_FIRESTORE_SUCCESS',
  LOAD_FROM_FIRESTORE_ERROR: DOCUMENT + 'LOAD_FROM_FIRESTORE_ERROR',

  SAVE_INTO_FIRESTORE: DOCUMENT + 'SAVE_INTO_FIRESTORE',
  SAVE_IMAGE_INTO_FIRESTOR: DOCUMENT + 'SAVE_IMAGE_INTO_FIRESTOR',
  SAVE_INTO_FIRESTORE_ERROR: DOCUMENT + 'SAVE_INTO_FIRESTORE_ERROR',

  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',

  loadFromFireStore: () => {
    return { type: actions.LOAD_FROM_FIRESTORE };
  },

  loadFromFireStoreSuccess: data => ({
    type: actions.LOAD_FROM_FIRESTORE_SUCCESS,
    payload: { data },
  }),

  loadFromFireStoreError: error => ({
    type: actions.LOAD_FROM_FIRESTORE_ERROR,
    payload: { error },
  }),

  saveIntoFireStore: (data, picture = null,  actionName = 'insert') => ({
    type: actions.SAVE_INTO_FIRESTORE,
    payload: { data, picture, actionName },
  }),

  saveImageToFirestore: (picture, actionName = 'insert', folderName) => ({
      type: actions.SAVE_IMAGE_INTO_FIRESTOR,
      payload: {picture, actionName, folderName },
  }),

  toggleModal: (data = null) => ({
    type: actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
    payload: { data },
  }),

  update: data => ({
    type: actions.FIRESTORE_UPDATE,
    payload: { data },
  }),

  saveIntoFireStoreError: error => ({
    type: actions.SAVE_INTO_FIRESTORE_ERROR,
    payload: { error },
  }),

  resetFireStoreDocuments: () => ({
    type: actions.RESET_FIRESTORE_DOCUMENTS,
  }),

  resetFireStoreDocumentsError: error => ({
    type: actions.RESET_FIRESTORE_DOCUMENTS_ERROR,
    payload: { error },
  }),
};
export default actions;
