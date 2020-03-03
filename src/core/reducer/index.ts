import { combineReducers } from 'redux';
import { history } from '../config/history';
import { connectRouter } from 'connected-react-router';
import dateInfoReducer from '../../modules/date-info/reducer';


const reducers = {
  router: connectRouter(history),
  dateInfo: dateInfoReducer,
};

export const appReducer = combineReducers(reducers);

export type IApplicationState = ReturnType<typeof appReducer>;
