import React from 'react';
import {  Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../Shared/FormContainer';
import Header from '../Shared/Header';

const OTPScreen = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={hp(10)} 
    >
      <Header
        navigation={navigation} 
      />
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <FormContainer>
        <Text style={styles.infoText}>
          Make sure your email is already registered in the
        </Text>
        <Text style={styles.infoText}>
          Estate admin system
        </Text>

        <View style={styles.otpBox}>
          <Text style={styles.otpText}>
            An <Text style={styles.otpWord}>OTP</Text> has been sent to your registered email.
            <Text style={styles.otpWord}> </Text>Please check your inbox to proceed.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("OTPConfirm")}>
            <Text style={styles.buttonText}>Okay</Text>
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
    padding: wp(5), 
    marginTop: hp(2), 
  },
  logo: {
    width: wp(50), 
    height: wp(50), 
    marginTop: hp(5),
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1), 
    fontSize: wp(4.5),
    color: '#333',
    marginRight: "10%",
  },
  otpBox: {
    width: wp(80),
    height: hp(30), 
    padding: wp(5), 
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    margin: wp(5), 
    marginRight: "20%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: wp(4),
    color: '#000',
    textAlign: 'center',
    marginBottom: hp(2), 
    marginRight: "5%",
  },
  otpWord: {
    color: '#E3963E',
    fontWeight: 'bold',
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
    fontSize: wp(5),
    fontWeight: 'normal',
  },
});

export default OTPScreen;
