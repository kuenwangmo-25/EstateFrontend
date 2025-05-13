import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import AppNavigator from './Navigation/AppNavigator'

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator /> {/* Use AppNavigator here */}
    </NavigationContainer>
  );
};

export default App;
