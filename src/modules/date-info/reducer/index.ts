import { IReduxAction } from '../../../core/interfaces';

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
    default:
      return state;
  }
};

export default dateInfoReducer;
