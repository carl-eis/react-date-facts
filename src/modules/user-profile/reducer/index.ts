// import {

// } from '../actions';

export interface IUserProfileReducerState {
  [x: string]: any;
}

const initialState = {};

export const userProfileReducer = (state = initialState, action: any): IUserProfileReducerState => {
  const { type, data } = action;
  switch (type) {
    default:
      return state;
  }
};
