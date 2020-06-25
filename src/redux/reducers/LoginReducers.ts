import {IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE} from '../actions/fetch';
import {LOGIN_LOADING, LOGIN} from '../types';
export interface Action {
  type: string;
  payload: any;
}
interface State {
  token: string | null;
  loading: boolean;
}

const intialState = {
  token: null,
  loading: false,
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };

    default:
      return state;
  }
};
