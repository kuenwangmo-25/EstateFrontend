import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';
import Toast from 'react-native-toast-message'; // Make sure this is imported at the top
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const OTPConfirmScreen = ({ navigation, route }) => {
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
      enableOnAndroid={true}
      extraScrollHeight={hp(10)}
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
              <Icon name="key" size={16} color="#aaa" style={{ marginRight: 5 }} />
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
  },
  logo: {
    width: wp(50),
    height: wp(50),
    marginBottom: hp(-5),
    marginTop: hp(5),
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1),
    fontSize: wp(4),
    color: '#333',
    marginRight: '10%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: wp(5),
    marginVertical: hp(2),
    width: wp(80),
  },
  input: {
    flex: 1,
    height: hp(6),
  },
  button: {
    width: wp(50),
    backgroundColor: '#E3963E',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: hp(2),
    alignSelf: 'center',
    marginTop: hp(3),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(4.5),
    fontWeight: 'normal',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: wp(4),
    marginBottom: hp(2),
  },
});

export default OTPConfirmScreen;
