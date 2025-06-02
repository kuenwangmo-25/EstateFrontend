import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Header from '../Shared/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };


  useEffect(() => {
    console.log('Email changed:', email); // 🔍 DEBUG: Track email input

    if (email.trim() === '') {
      setError('');
      setIsButtonDisabled(true);
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsButtonDisabled(true);
    } else {
      setError('');
      setIsButtonDisabled(false);
    }
  }, [email]);

  const handleRegister = async () => {
    console.log('Register button pressed'); // 🔍 DEBUG: Confirm button press

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
        email: email,
      });

      console.log('Response:', response.data); // 🔍 DEBUG: Log server response

      if (response.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent',
          text2: 'Please check your email',
        });
        navigation.navigate('OTPConfirm', { email }); // ✅ Pass email to OTP screen
      }
    } catch (error) {
      console.error('Register error:', error); // 🔍 DEBUG: Log any errors

      const errorMessage = error?.response?.data?.message;

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
      <Header navigation={navigation} />
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

        <TouchableOpacity
          style={[
            styles.button,
            (isButtonDisabled || !email.trim()) && styles.buttonDisabled,
          ]}
          onPress={handleRegister}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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
    marginRight: '10%',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: wp(5),
    marginVertical: hp(2),
    width: '90%',
  },
  input: {
    flex: 1,
    height: hp(6),
  },
  button: {
    marginTop: hp(4),
    width: wp(60),
    backgroundColor: '#E3963E',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(5),
    fontWeight: 'normal',
  },
  errorText: {
    color: 'red',
    fontSize: wp(4),
    marginBottom: hp(1),
    textAlign: 'center',
  },
});

export default RegisterScreen;
