import {compose, applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';

import reducer from './reducers/LoginReducers';
import AsyncStorage from '@react-native-community/async-storage';
import LoginReducers from './reducers/LoginReducers';
import UserReducers from './reducers/UserReducers';
import RestaurantReducers from './reducers/RestaurantReducers';
import OrderReducers from './reducers/OrderReducers';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const {logger} = require(`redux-logger`);

  middlewares.push(logger);
}

const rootReducer = combineReducers({
  login: LoginReducers,
  user: UserReducers,
  restaurant: RestaurantReducers,
  order: OrderReducers,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return {store, persistor};
}
