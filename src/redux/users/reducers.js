import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  users: {},
  modalActive: false,
  user: {
      id: new Date().getTime(),
      key: null,
      uid: new Date().getTime(),
      firstname: '',
      lastname: '',
      email: '',
      agreedTerms: 1,
      agreedTermsDate: new Date(),
      agreedTermsVersion: '',
      available: 1,
      companyName: '',
      expertise: '',
      profilePictureUrl: '',
      signatureUrl: '',
      userGroup: 'employee',
      viewedGuide: '',
      userRole: 'staff',
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.LOAD_FROM_FIRESTORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.LOAD_FROM_FIRESTORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload.data,
        errorMessage: false,
      };
    case actions.LOAD_FROM_FIRESTORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        user: payload.data == null ? initState.user : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        user: payload.data,
      };
    default:
      return state;
  }
}
