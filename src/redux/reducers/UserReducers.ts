import {IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE} from '../actions/fetch';
import {LOGIN_LOADING, LOGIN, USER_INFO, USER_INFO_LOADING} from '../types';
import {User} from '../actions/UserActions';
import {Action} from './LoginReducers';

interface State {
  user: User;
  loading: boolean;
}

const intialState = {
  user: {} as User,
  loading: false,
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case USER_INFO_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_INFO:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    default:
      return state;
  }
};
