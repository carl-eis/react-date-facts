import { call, put, takeLatest } from 'redux-saga/effects';
import { DATE_RANGE_CHANGE, factFetchError, factFetchSuccess } from '../../actions';
import { IReduxAction } from '../../../../core/interfaces';
import fetchDateFact from '../../api/fetch-date-fact';

function* sagaWorker(action: IReduxAction) {
  try {
    const {
      data: {
        startDate,
      },
    } = action;

    const parsedDate = new Date(startDate);
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1;

    const dateFact = yield call(fetchDateFact, day, month);
    return yield put(factFetchSuccess(dateFact));
  } catch (ex) {
    console.error(ex);
    return yield put(factFetchError(ex));
  }
}

function* dateFactFetchSaga() {
  yield takeLatest([DATE_RANGE_CHANGE], sagaWorker);
}

export default dateFactFetchSaga;
