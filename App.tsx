import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Provider} from 'react-redux';
import {View} from 'react-native';
import AppContainer from './src/navigation/AppNavigation';
import configureStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {ApolloProvider} from 'react-apollo';

import client from './src/redux/services/client';
import Navigator from './src/redux/services/Navigator';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ApolloProvider client={client}>
          <Provider store={configureStore().store}>
            <PersistGate loading={null} persistor={configureStore().persistor}>
              <AppContainer
                ref={navigatorRef => {
                  Navigator.setTopLevelNavigator(navigatorRef);
                }}
              />
            </PersistGate>
          </Provider>
        </ApolloProvider>
        <FlashMessage
          style={{
            marginBottom: 30,
            marginHorizontal: 20,
            borderRadius: 5,
            opacity: 0.8,
          }}
          position="bottom"
          animated={true}
        />
      </View>
    );
  }
}
