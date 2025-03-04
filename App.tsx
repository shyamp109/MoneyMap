import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StackNavigation from './src/navigations/StackNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{flex: 1}}>
          <StackNavigation />
          <Toast />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
