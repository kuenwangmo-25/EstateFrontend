import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Header from '../Shared/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message'; // Make sure this is imported at the top
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
   
  const handleRegister = async () => {
    console.log(email)
    if (email.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Missing Email',
        text2: 'Please enter your email',
      });
      return;
    }
  
    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
      return;
    }
  
    try {
      const response = await axios.post(`${baseURL}/register`, {
        email : email,
      });
      console.log(response.data)

      if (response.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent',
          text2: 'Please check your email',
        });
        navigation.navigate('OTPConfirm', { email }); // Pass email to OTP screen
      }
    } catch (error) {

      const errorMessage = error?.response?.data?.message;
      console.error(error);

      if (errorMessage === 'User not Registered by the Admin') {
        Toast.show({
          type: 'error',
          text1: 'Access Denied',
          text2: 'You must be registered by an admin to proceed.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage || 'Something went wrong',
        });
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
    >
      <Header
        navigation={navigation}  
      />
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <Text style={styles.infoText}>
        Make sure your email is already registered in the
      </Text>
      <Text style={styles.infoText}>Estate admin system</Text>

      <FormContainer style={styles.formContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          keyboardType="email-address"
          icon={<Icon name="envelope" size={wp(5)} color="#aaa" />}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: wp(4), // Responsive padding
  },
  logo: {
    width: wp(50), // Responsive width for the logo
    height: wp(50), // Responsive height for the logo
    marginTop: hp(5), // Responsive margin
    marginBottom: hp(3), // Responsive margin
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1), // Responsive vertical margin
    fontSize: wp(4), // Responsive font size
    color: '#333',
    marginRight: "10%",
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: wp(5), // Responsive padding
    marginVertical: hp(2), // Responsive vertical margin
    width: '90%',
  },
  input: {
    flex: 1,
    height: hp(6), // Responsive height for the input
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(5), // Responsive margin top
  },
  button: {
    marginTop: hp(4), // Responsive margin top
    width: wp(60), // Responsive width for the button
    backgroundColor: '#E3963E', // Change to your desired color
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: hp(2), // Responsive padding for button
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(5), // Responsive font size
    fontWeight: 'normal',
  },
});

export default RegisterScreen;
