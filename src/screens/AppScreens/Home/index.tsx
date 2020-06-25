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

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getRestaurantList: (
    index: number,
    showOffline: boolean,
    limit: number,
    delivery: boolean,
  ) => void;

  loading: boolean;
  restaurantList: Restaurant[];
}

class Home extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  componentDidMount() {
    this.props.getRestaurantList(0, false, 30, false);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Restaurants',
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
  renderContent() {
    if (this.props.loading && !this.props.restaurantList) {
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
            this.props.getRestaurantList(0, false, 30, false);
          }}
          data={this.props.restaurantList}
          renderItem={({item, index}) => {
            return (
              <View style={styles.innerContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{item.name}</Text>
                  <Text style={{color: '#9f9f9f', fontWeight: '300'}}>
                    {item.type}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text>Delivery</Text>
                  <Icon
                    style={{fontSize: 15, marginTop: 1, marginLeft: 10}}
                    name={
                      item.delivery
                        ? 'ios-checkmark-circle-outline'
                        : 'ios-close-circle'
                    }
                  />
                </View>
                <Text style={{marginTop: 10}}>
                  <Text style={{fontWeight: '600'}}>Address: </Text>
                  {item.address}
                </Text>
              </View>
            );
          }}
          onEndReached={() => {
            if (!this.props.loading) {
              const index = this.state.page;
              this.setState({page: index + 1});
              this.props.getRestaurantList(index + 1, false, 15, false);
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
  loading: state.restaurant.loading,
  restaurantList: state.restaurant.restaurantList,
});

function bindToAction(dispatch: any) {
  return {
    getRestaurantList: (
      index: number,
      showOffline: boolean,
      limit: number,
      delivery: boolean,
    ) => dispatch(getRestaurantList(index, showOffline, limit, delivery)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction,
)(Home);
