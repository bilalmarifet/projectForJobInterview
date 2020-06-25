import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
import client from '../services/client';
import {adsQuery} from './graphql/queries';
import {loginWithEmail} from './graphql/mutations';
import {LOGIN, LOGIN_LOADING} from '../types';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Navigator from '../services/Navigator';

export function UserLogin(email: String, password: String) {
  return (dispatch: any) => {
    // Alert.alert('error2');
    console.log('Asdasdsad');
    dispatch({type: LOGIN_LOADING, payload: true});
    client
      .mutate({
        mutation: loginWithEmail,
        variables: {email: email, password: password},
      })
      .then(resp => {
        console.log(resp);
        let token = resp.data.loginWithEmail.token;
        if (token) {
          dispatch({type: LOGIN, payload: token});
        }
        Navigator.navigate('AppStack');
      })
      .catch(e => {
        console.log(e);
        console.log('helall');
        dispatch({type: LOGIN_LOADING, payload: false});
      });
  };
}
