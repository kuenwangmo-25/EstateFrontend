import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen'; // Ensure correct path
import HomeScreen from '../Screens/HomeScreen'; 
import IssueReport from '../Screens/IssueReport';
import NotificationScreen from '../Screens/Notification';
import ContactUsScreen from '../Screens/ContactUs';
import RegisterScreen from '../Screens/Register';
import OTPScreen from '../Screens/OTPScreen';
import OTPConfirmScreen from '../Screens/OTPConfirm';
import ProfileScreen from '../Screens/ProfileScreen';
import FeedbackScreen from '../Screens/FeedbackScreen';
import IssueListScreen from '../Screens/IssueList';
import IssueDetailScreen from '../Screens/IssueDetailScreen';
import FogotPassword from '../Screens/ForgotPassword';
import DefaultPassword from '../Screens/DefaultPassword';
import ConfirmPassword from '../Screens/ConfirmPassword';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={ RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="IssueReport" component={IssueReport} options={{headerShown: false}}/>
      <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Notification" component={NotificationScreen} options={{headerShown: false}} />
      <Stack.Screen name="OTP" component={OTPScreen} options={{headerShown: false}}/>
      <Stack.Screen name="OTPConfirm" component={OTPConfirmScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{headerShown: false}}/>
      <Stack.Screen name="IssueList" component={IssueListScreen} options={{headerShown: false}}/>
      <Stack.Screen name="IssueDetail" component={IssueDetailScreen} options={{headerShown: false}}/>
      <Stack.Screen name="FogotPassword" component={FogotPassword} options={{headerShown: false}}/>
      <Stack.Screen name="DefaultPassword" component={DefaultPassword} options={{headerShown: false}}/>
      <Stack.Screen name="confirmPassword" component={ConfirmPassword} options={{headerShown: false}}/>

    </Stack.Navigator>
  );
}

export default AppNavigator;
