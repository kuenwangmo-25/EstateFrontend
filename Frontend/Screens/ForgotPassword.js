import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';
import Header from '../Shared/Header';
import Toast from 'react-native-toast-message'; // Make sure this is imported at the top
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  const handleConfirm = async () => {


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
        navigation.navigate('confirmPassword', { email }); // Pass email to OTP screen
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
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Header navigation={navigation} />
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <Text style={styles.infoText}>
        Make sure your email is already registered in the
      </Text>
      <Text style={styles.infoText}>
        Estate admin system
      </Text>

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
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
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
    padding: wp(4),
  },
  logo: {
    width: wp(50),
    height: wp(50),
    marginTop: hp(5),
    marginBottom: hp(3),
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1),
    fontSize: wp(4),
    color: '#333',
    marginRight: wp(10),
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2),
    paddingHorizontal: wp(6),
    marginVertical: hp(2),
    width: '90%',
  },
  input: {
    flex: 1,
    height: hp(6),
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(3),
  },
  button: {
    width: '50%',
    backgroundColor: '#E3963E',
    borderRadius: wp(2),
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: hp(2),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'normal',
  },
  errorText: {
    marginBottom: hp(2),
    fontSize: wp(4),
    color: 'red',
    textAlign: 'center',
  },
});

export default ForgotPassword;
