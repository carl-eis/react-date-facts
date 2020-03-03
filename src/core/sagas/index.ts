import { all } from 'redux-saga/effects';
import dateFactFetchSaga from '../../modules/date-info/sagas/date-fact-fetch';

export function* rootSaga() {
  yield all([
    dateFactFetchSaga(),
  ]);
}
