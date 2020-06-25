import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
import client from '../services/client';
import {getUserInfoQuery, getRestaurants} from './graphql/queries';
import {loginWithEmail} from './graphql/mutations';
import {
  LOGIN,
  LOGIN_LOADING,
  USER_INFO_LOADING,
  USER_INFO,
  GET_RESTAURANT_LIST_LOADING,
  GET_RESTAURANT_LIST,
  GET_RESTAURANT_LIST_MORE,
} from '../types';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Navigator from '../services/Navigator';

export interface Restaurant {
  address: String;
  name: String;
  delivery: boolean;
  type: String;
}

export function getRestaurantList(
  index: number,
  showOffline: boolean,
  limit: number,
  delivery: boolean,
) {
  return (dispatch: any) => {
    dispatch({type: GET_RESTAURANT_LIST_LOADING, payload: true});
    client
      .query({
        query: getRestaurants,
        variables: {
          index: index,
          showOffline: showOffline,
          limit: limit,
          delivery: delivery,
        },
      })
      .then(resp => {
        console.log(resp);
        if (resp.data) {
          let data = resp.data.user;
          var list: Restaurant[] = [];
          resp.data.restaurants.forEach(element => {
            var item: Restaurant = {
              address:
                element.restaurantAddressSlugCityName +
                ' ' +
                element.restaurantAddressSlugAdminWard +
                ' ' +
                element.restaurantAddressPostalCode,
              name: element.name,
              delivery: element.delivery,
              type: element.types[0].name,
            };
            list.push(item);
          });

          dispatch({
            type: index > 0 ? GET_RESTAURANT_LIST_MORE : GET_RESTAURANT_LIST,
            payload: list,
          });
        }
      })

      .catch(e => {
        console.log(e);
        dispatch({type: GET_RESTAURANT_LIST_LOADING, payload: false});
      });
  };
}
