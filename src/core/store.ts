import { appReducer as rootReducer } from './reducer';
import { rootSaga } from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistConfig } from './config/persist';
import { history } from './config/history';

/* Middleware Configuration */

const logger = createLogger({
  collapsed: true,
  level: 'info',
});

const sagaMiddleware = createSagaMiddleware();

/* Redux Devtools Configuration */

const options = {};
const composeEnhancers = composeWithDevTools(options);

/* Store Configuration */

const configureStore = (mode: 'dev' | 'prod' = 'prod') => {
  const persistedReducer = persistReducer(persistConfig, rootReducer as any);

  const getStore = (storeMode: string) => {
    /**
     * Dev store, needs compose enhancers,
     * Only use redux devtools in dev mode as it is expensive
     */
    if (storeMode === 'dev') {
      return createStore(
        persistedReducer,
        composeEnhancers(
          applyMiddleware(
            sagaMiddleware, routerMiddleware(history), logger
          )
        )
      );
    }
    /**
     * Prod Store
     */
    return createStore(
      persistedReducer,
      applyMiddleware(
        sagaMiddleware, routerMiddleware(history)
      )
    );
  };

  const store = getStore(mode);

  const persistor = persistStore(
    store,
    null,
    () => {
      console.warn('store persisted, attempting to load user.');
    }
  );

  sagaMiddleware.run(rootSaga);

  // @ts-ignore
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // @ts-ignore
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return { persistor, store };
};

/* Store environment selection */

const { NODE_ENV } = process.env;

const STORE_MODE = NODE_ENV === 'production' ? 'prod' : 'dev';

const {
  persistor: p,
  store: s
} = configureStore(STORE_MODE);

export const store = s;
export const persistor = p;
