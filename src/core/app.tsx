import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { persistor, store } from './store';
import { history } from './config/history';

import { AppRouter } from './router';
import { ConnectedRouter } from 'connected-react-router';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
      >
      </PersistGate>
      <ConnectedRouter history={history}>
        <AppRouter/>
      </ConnectedRouter>
    </Provider>
  );
}

export default hot(App);
