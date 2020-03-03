import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  throttle: 1000,
  stateReconciler: autoMergeLevel1,
};
