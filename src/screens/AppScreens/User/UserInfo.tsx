import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, Button, Text} from 'react-native';
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
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../../../constants';
import {getUserInfo, User} from '../../../redux/actions/UserActions';
import {AppState} from '../../../redux/store';
import {color} from 'react-native-reanimated';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getUserInfo: () => void;
  loading: boolean;
  user: User;
}

class Home extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Profile',
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
    console.log(this.props.user);
    if (this.props.loading) {
      return (
        <View
          style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.innerContainer}>
            <Text style={{fontWeight: '700'}}>Name Surname</Text>
            <Text style={{color: 'black'}}>
              {this.props.user.firstName} {this.props.user.lastName}
            </Text>
          </View>
          <View style={styles.innerContainer}>
            <Text style={{fontWeight: '700'}}>Email</Text>
            <Text style={{color: 'black'}}>{this.props.user.email}</Text>
          </View>

          <View style={styles.innerContainer}>
            <Text style={{fontWeight: '700'}}>Mobile Number</Text>
            <Text style={{color: 'black'}}>{this.props.user.mobileNumber}</Text>
          </View>
        </ScrollView>
      );
    }
  }

  render() {
    return <View style={{flex: 1}}>{this.renderContent()}</View>;
  }
}

const mapStateToProps = (state: AppState) => ({
  loading: state.user.loading,
  user: state.user.user,
});

function bindToAction(dispatch: any) {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
  };
}

export default connect(
  mapStateToProps,
  bindToAction,
)(Home);
