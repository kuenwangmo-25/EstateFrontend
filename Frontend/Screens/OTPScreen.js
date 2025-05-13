import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../Shared/FormContainer';
import Header from '../Shared/Header';

const OTPScreen = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={hp(10)} // Adjust the space when keyboard is visible
    >
      <Header
        navigation={navigation}  // Pass navigation prop for the back button functionality
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
    padding: wp(5), // Responsive padding
    marginTop: hp(2), // Responsive margin
  },
  logo: {
    width: wp(50), // Responsive width
    height: wp(50), // Responsive height
    marginTop: hp(5), // Responsive margin
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1), // Reduced vertical margin to bring text closer
    fontSize: wp(4.5), // Responsive font size
    color: '#333',
    marginRight: "10%",
  },
  otpBox: {
    width: wp(80), // Responsive width
    height: hp(30), // Responsive height
    padding: wp(5), // Responsive padding
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    margin: wp(5), // Responsive margin
    marginRight: "20%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: wp(4), // Responsive font size
    color: '#000',
    textAlign: 'center',
    marginBottom: hp(2), // Responsive margin
    marginRight: "5%",
  },
  otpWord: {
    color: '#E3963E',
    fontWeight: 'bold',
  },
  button: {
    width: wp(50), // Responsive width
    backgroundColor: '#E3963E',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: hp(2), // Responsive padding
    alignSelf: 'center',
    marginTop: hp(3), // Responsive margin
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(5), // Responsive font size
    fontWeight: 'normal',
  },
});

export default OTPScreen;
