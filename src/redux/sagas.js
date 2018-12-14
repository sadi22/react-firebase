import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import users from './users/sagas'
export default function* rootSaga(getState) {
  yield all([
      authSagas(),
      users(),
  ]);
}
