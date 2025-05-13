import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Responsive screen utility
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Import KeyboardAwareScrollView
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';
import baseURL from '../assets/common/baseUrl';
import axios from 'axios';


const ConfirmPassword = ({ navigation }) => {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const { email } = route.params; // Get the email passed from RegisterScreen

  const handleConfirm = async () => {
    if (otp.trim() === '') {
      setError('Please enter the OTP');
      Toast.show({
        type: 'error',
        text1: 'Missing OTP',
        text2: 'Please enter the OTP',
      });
      setTimeout(() => setError(''), 1000);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/register`, {
        email,
        otp,
      });

      if (response.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'OTP Verified',
          text2: 'Welcome!',
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid OTP',
          text2: response.data.message || 'Please try again',
        });
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: err?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <KeyboardAwareScrollView 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled" // Ensures tapping outside the keyboard closes it
    >
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <FormContainer>
        <Text style={styles.infoText}>
          Make sure your email is already registered in the
        </Text>
        <Text style={styles.infoText}>
          Estate admin system
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Input
           placeholder="Enter OTP"
          name="otp"
          id="otp"
          value={otp}
          onChangeText={setOTP}
          keyboardType="numeric"
          icon={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="key" size={16} color="#aaa" style={{ marginRight: wp(2) }} />
            </View>
          }
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <View style={styles.button}>
          <TouchableOpacity onPress={handleConfirm}>
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: wp(5), // Responsive padding
    marginTop: hp(3), // Responsive margin top
  },
  logo: {
    width: wp(50), // Responsive width
    height: wp(50), // Responsive height
    marginTop: hp(5), // Responsive margin top
    marginBottom: hp(2), // Responsive margin bottom
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1), // Responsive vertical margin
    fontSize: wp(4), // Responsive font size
    color: '#333',
    marginRight: wp(10), // Responsive margin
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive border radius
    paddingHorizontal: wp(6), // Responsive padding
    marginVertical: hp(2), // Responsive margin
    width: '90%',
  },
  input: {
    flex: 1,
    height: hp(7), // Responsive height
  },
  button: {
    marginTop: hp(3), // Responsive margin top
    width: '50%',
    backgroundColor: '#E3963E',
    borderRadius: wp(2), // Responsive border radius
    alignItems: 'center',
    paddingVertical: hp(2), // Responsive padding
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(4.5), // Responsive font size
    fontWeight: 'normal',
  },
  errorText: {
    fontSize: wp(4), // Responsive font size
    color: '#ff0000',
    textAlign: 'center',
    marginVertical: hp(2), // Responsive margin
  },
});

export default ConfirmPassword;
