import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Responsive screen utility
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Import KeyboardAwareScrollView
import FormContainer from '../Shared/FormContainer';
import Header from '../Shared/Header';

const DefaultPassword = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled" // Ensures tapping outside the keyboard closes it
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
            A default password has been sent to your registered email.
            Please check your inbox to proceed.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("confirmPassword")}
          >
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
    marginTop: hp(2), // Responsive margin top
  },
  logo: {
    width: wp(50),  // Responsive width for logo
    height: wp(50), // Responsive height for logo
    marginBottom: hp(2), // Responsive margin bottom
    marginTop: hp(5), // Responsive margin top
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1), // Reduced vertical margin to bring text closer
    fontSize: wp(4),  // Responsive font size
    color: '#333',
    marginRight: wp(10), // Responsive margin
  },
  otpBox: {
    width: '90%',
    height: hp(30), // Responsive height
    padding: wp(5), // Responsive padding
    backgroundColor: '#EFEFEF',
    borderRadius: wp(2), // Responsive border radius
    marginTop: hp(3), // Responsive margin top
    marginBottom: hp(3), // Responsive margin bottom
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: wp(4), // Responsive font size
    color: '#000',
    textAlign: 'center',
    marginBottom: hp(2), // Responsive margin bottom
    marginRight: wp(5), // Responsive margin
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
    fontSize: wp(4), // Responsive font size
    fontWeight: 'normal',
  },
});

export default DefaultPassword;
