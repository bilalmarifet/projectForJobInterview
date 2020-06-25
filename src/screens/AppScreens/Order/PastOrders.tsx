import React, {Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Text,
  ScrollView,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import {connect} from 'react-redux';
import {Header} from '../../../components';
import styles from '../../styles';
import {AvatarItem} from '../../../components';
import {logoutUserService} from '../../../redux/services/user';
import {Thumbnail, Icon} from 'native-base';
import {fetchImageData, fetchMoreImageData} from '../../../redux/actions/fetch';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../../../constants';
import {
  getRestaurantList,
  Restaurant,
} from '../../../redux/actions/restaurantActions';
import {AppState} from '../../../redux/store';
import {
  getPastOrderList,
  Order,
  orderItem,
} from '../../../redux/actions/OrderActions';
import {GraphQLNonNull} from 'graphql';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getPastOrderList: (index: number, limit: number) => void;

  loading: boolean;
  orderList: Order[];
}

class PastOrders extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  componentDidMount() {
    this.props.getPastOrderList(0, 15);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Past Orders',
      headerStyle: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.52,
        shadowRadius: 2.46,
        elevation: 9,
        backgroundColor: 'white',
        shadowColor: colors.secondary,
        borderBottomWidth: 0,
      },
    };
  };
  renderItemOrder(item: orderItem) {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 13}}>{item.name}</Text>
          <Text style={{fontSize: 13}}>${item.amount}</Text>
        </View>
        <Text style={{textAlign: 'right', fontSize: 13}}>
          ${item.totalAmount}
        </Text>
      </View>
    );
  }
  renderContent() {
    if (this.props.loading && !this.props.orderList) {
      return (
        <View
          style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <FlatList
          refreshing={this.props.loading}
          onRefresh={() => {
            this.setState({page: 0});
            this.props.getPastOrderList(0, 15);
          }}
          data={this.props.orderList}
          renderItem={({item, index}) => {
            return (
              <View style={styles.innerContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{item.restaurantName}</Text>
                  <Text style={{color: '#9f9f9f', fontWeight: '300'}}>
                    Total : ${item.total}
                  </Text>
                </View>

                <View style={{marginTop: 10}}>
                  {item.items.map(e => this.renderItemOrder(e))}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text>Delivery Fee</Text>
                  <Text style={{color: '#9f9f9f', fontWeight: '300'}}>
                    ${item.deliveryFee}
                  </Text>
                </View>
              </View>
            );
          }}
          onEndReached={() => {
            if (!this.props.loading) {
              const index = this.state.page;
              this.setState({page: index + 1});
              this.props.getPastOrderList(index + 1, 15);
            }
          }}
          onEndReachedThreshold={0.5}
          initialNumToRender={5}
          ListFooterComponent={
            this.props.loading && this.state.page > 0 ? (
              <View>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      );
    }
  }

  render() {
    return <View style={{flex: 1}}>{this.renderContent()}</View>;
  }
}

const mapStateToProps = (state: AppState) => ({
  loading: state.order.loading,
  orderList: state.order.orderList,
});

function bindToAction(dispatch: any) {
  return {
    getPastOrderList: (index: number, limit: number) =>
      dispatch(getPastOrderList(index, limit)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction,
)(PastOrders);
