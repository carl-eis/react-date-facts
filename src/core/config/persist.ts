// import createEncryptor from 'redux-persist-transform-encrypt';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

// export const encryptor = createEncryptor({
//   secretKey: 'some-key',
//   onError: () => {
//     localStorage.clear();
//     window.location.reload();
//   },
// });

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  // transforms: [encryptor],
  throttle: 1000,
  stateReconciler: autoMergeLevel1,
};
