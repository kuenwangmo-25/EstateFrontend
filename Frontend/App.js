import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Navigation/AppNavigator';
import Auth from './Context/store/Auth';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Auth>
      <>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast />
      </>
    </Auth>
  );
};

export default App;
