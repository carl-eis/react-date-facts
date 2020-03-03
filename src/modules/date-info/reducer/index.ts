import { IReduxAction } from '../../../core/interfaces';
import { FACT_FETCH_SUCCESS, DATE_RANGE_CHANGE, FACT_FETCH_ERROR } from '../actions';

export interface IDateInfoReducerState {
  isLoadingFact: boolean;
  dateFact: string;
  startDate: string;
  endDate: string;
}

const initialState: IDateInfoReducerState = {
  isLoadingFact: false,
  dateFact: '',
  startDate: '',
  endDate: '',
};

const dateInfoReducer = (state = initialState, action: IReduxAction): IDateInfoReducerState => {
  const { type, data } = action;
  switch (type) {
    case DATE_RANGE_CHANGE: {
      const { startDate, endDate } = data;
      return {
        ...state,
        dateFact: 'loading ...',
        isLoadingFact: true,
        startDate,
        endDate,
      };
    }
    case FACT_FETCH_ERROR: {
      return {
        ...state,
        dateFact: '',
        isLoadingFact: false,
      };
    }
    case FACT_FETCH_SUCCESS: {
      return {
        ...state,
        dateFact: data,
        isLoadingFact: false,
      };
    }
    default:
      return state;
  }
};

export default dateInfoReducer;
