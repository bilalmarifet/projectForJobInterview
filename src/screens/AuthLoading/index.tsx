import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {AppState} from '../../redux/store';
import {connect} from 'react-redux';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  token: string;
}

class AuthLoading extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const {navigation} = this.props;
    global.TOKEN = this.props.token ? this.props.token : null;
    console.log('global.TOKEN', global.TOKEN);
    navigation.navigate(this.props.token ? 'AppStack' : 'AuthStack');
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  token: state.login.token,
});

function bindToAction(dispatch: any) {}

export default connect(
  mapStateToProps,
  {},
)(AuthLoading);
