import {IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE} from '../actions/fetch';
import {
  LOGIN_LOADING,
  LOGIN,
  USER_INFO,
  USER_INFO_LOADING,
  GET_RESTAURANT_LIST_LOADING,
  GET_RESTAURANT_LIST,
  GET_RESTAURANT_LIST_MORE,
  GET_ORDER_LIST_MORE,
  GET_ORDER_LIST_LOADING,
  GET_ORDER_LIST,
} from '../types';
import {User} from '../actions/UserActions';
import {Restaurant} from '../actions/restaurantActions';
import {Action} from './LoginReducers';
import {Order} from '../actions/OrderActions';

interface State {
  orderList: Order[];
  loading: boolean;
}

const intialState = {
  orderList: [],
  loading: false,
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case GET_ORDER_LIST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_ORDER_LIST:
      return {
        ...state,
        loading: false,
        orderList: action.payload,
      };
    case GET_ORDER_LIST_MORE:
      return {
        ...state,
        loading: false,
        orderList: [...state.orderList, ...action.payload],
      };

    default:
      return state;
  }
};
