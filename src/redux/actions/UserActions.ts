import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
import client from '../services/client';
import {getUserInfoQuery} from './graphql/queries';
import {loginWithEmail} from './graphql/mutations';
import {LOGIN, LOGIN_LOADING, USER_INFO_LOADING, USER_INFO} from '../types';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Navigator from '../services/Navigator';

export interface User {
  address: String;
  email: String;
  firstName: String;
  lastName: String;
  mobileNumber: String;
}
export function getUserInfo() {
  return (dispatch: any) => {
    dispatch({type: USER_INFO_LOADING, payload: true});
    client
      .query({
        query: getUserInfoQuery,
        variables: null,
      })
      .then(resp => {
        if (resp.data) {
          let data = resp.data.user;

          var user: User = {
            address: data.addresses[0].addressLine1,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            mobileNumber: data.mobileNumber,
          };
          dispatch({type: USER_INFO, payload: user});
        }
      })

      .catch(e => {
        console.log(e);
        dispatch({type: USER_INFO_LOADING, payload: false});
      });
  };
}
