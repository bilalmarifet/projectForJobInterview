import React, {Component} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {Formik} from 'formik';
import * as Yup from 'yup';
// import Icon from "react-native-vector-icons/SimpleLineIcons";
import {loginUserService} from '../../../redux/services/user';
import {Input, Button} from '../../../components';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import {UserLogin} from '../../../redux/actions/LoginActions';
import {connect} from 'react-redux';
import {AppState} from '../../../redux/store';
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  UserLogin: (email: string, password: string) => void;
}
export interface userData {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(4)
    .max(16)
    .required(),
  password: Yup.string()
    .min(6)
    .max(16)
    .required(),
});

class Login extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const {navigation} = this.props;

    this.props.UserLogin('oliverjones@gmail.com', '123456');

    // showMessage({
    //   message: 'Wrong password or email',
    //   description: 'Please enter correct email or password',
    //   type: 'danger',
    // });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView bounces={false}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}>
              {props => {
                console.log(props, 'fdsfsdfdsf');
                return (
                  <View>
                    <View style={styles.headStyle}>
                      {/* <Icon name="emotsmile" size={100} /> */}
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="Email"
                        value={props.values.email}
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        error={props.touched.email && props.errors.email}
                      />
                      <Input
                        placeholder="Password"
                        value={props.values.password}
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        secureTextEntry
                        error={props.touched.password && props.errors.password}
                      />
                      <Button
                        text="Login"
                        onPress={() =>
                          this.props.UserLogin(
                            'oliverjones@gmail.com',
                            '123456',
                          )
                        }
                      />
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  loading: state.login.loading,
});

function bindToAction(dispatch: any) {
  return {
    UserLogin: (email: string, password: string) =>
      dispatch(UserLogin(email, password)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction,
)(Login);
