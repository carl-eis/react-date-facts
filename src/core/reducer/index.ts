import { combineReducers } from 'redux';
import { history } from '../config/history';
import { connectRouter } from 'connected-react-router';

const reducers = {
  router: connectRouter(history),
};

export const appReducer = combineReducers(reducers);

export type IApplicationState = ReturnType<typeof appReducer>;
