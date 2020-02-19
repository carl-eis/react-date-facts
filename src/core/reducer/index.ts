import { combineReducers } from 'redux';
import { userProfileReducer } from '../../modules/user-profile/reducer';
import { history } from '../config/history';
import { connectRouter } from 'connected-react-router';

const reducers = {
  userProfile: userProfileReducer,
  router: connectRouter(history),
};

export const appReducer = combineReducers(reducers);

export type IApplicationState = ReturnType<typeof appReducer>;
