import {IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE} from '../actions/fetch';
import {
  LOGIN_LOADING,
  LOGIN,
  USER_INFO,
  USER_INFO_LOADING,
  GET_RESTAURANT_LIST_LOADING,
  GET_RESTAURANT_LIST,
  GET_RESTAURANT_LIST_MORE,
} from '../types';
import {User} from '../actions/UserActions';
import {Restaurant} from '../actions/restaurantActions';
import {Action} from './LoginReducers';

interface State {
  restaurantList: Restaurant[];
  loading: boolean;
}

const intialState = {
  restaurantList: [],
  loading: false,
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case GET_RESTAURANT_LIST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_RESTAURANT_LIST:
      return {
        ...state,
        loading: false,
        restaurantList: action.payload,
      };
    case GET_RESTAURANT_LIST_MORE:
      return {
        ...state,
        loading: false,
        restaurantList: [...state.restaurantList, ...action.payload],
      };

    default:
      return state;
  }
};
