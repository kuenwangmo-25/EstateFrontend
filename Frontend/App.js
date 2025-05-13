import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import AppNavigator from './Navigation/AppNavigator'
import Auth from './Context/store/Auth'; // ✅ import Auth provider
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Auth>
      <NavigationContainer>
      <AppNavigator /> {/* Use AppNavigator here */}
      <Toast />
    </NavigationContainer>
    </Auth>
    
  );
};

export default App;
