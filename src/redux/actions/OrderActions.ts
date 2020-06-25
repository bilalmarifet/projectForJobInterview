import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
import client from '../services/client';
import {
  getUserInfoQuery,
  getRestaurants,
  getPastOrders,
} from './graphql/queries';
import {loginWithEmail} from './graphql/mutations';
import {
  LOGIN,
  LOGIN_LOADING,
  USER_INFO_LOADING,
  USER_INFO,
  GET_RESTAURANT_LIST_LOADING,
  GET_RESTAURANT_LIST,
  GET_RESTAURANT_LIST_MORE,
  GET_ORDER_LIST_LOADING,
  GET_ORDER_LIST,
  GET_ORDER_LIST_MORE,
} from '../types';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Navigator from '../services/Navigator';
import {List} from 'native-base';

export interface orderItem {
  amount: number;
  description: String;
  id: number;
  name: String;
  quantity: number;
  totalAmount: number;
}
export interface Order {
  restaurantName: String;
  total: number;
  deliveryFee: number;
  items: orderItem[];
  promoCode: number;
}

export function getPastOrderList(index: number, limit: number) {
  return (dispatch: any) => {
    dispatch({type: GET_ORDER_LIST_LOADING, payload: true});
    client
      .query({
        query: getPastOrders,
        variables: {
          index: index,
          limit: limit,
        },
      })
      .then(resp => {
        console.log(resp);
        if (resp.data) {
          var list: Order[] = [];
          resp.data.pastOrders.forEach(element => {
            var order = {} as Order;

            order.restaurantName = element.restaurant.name;
            order.total = element.total;
            order.deliveryFee = element.deliveryFee;
            order.promoCode = element.totalPromoCodeAmount;
            var itemList: orderItem[] = [];

            element.items.forEach(element => {
              var item: orderItem = {
                amount: element.amount,
                description: element.description,
                id: element.id,
                name: element.name,
                quantity: element.quantity,
                totalAmount: element.totalAmount,
              };
              itemList.push(item);
            });
            order.items = itemList;
            list.push(order);
          });
          dispatch({
            type: index > 0 ? GET_ORDER_LIST_MORE : GET_ORDER_LIST,
            payload: list,
          });
        }
      })

      .catch(e => {
        console.log(e);
        dispatch({type: GET_ORDER_LIST_LOADING, payload: false});
      });
  };
}
