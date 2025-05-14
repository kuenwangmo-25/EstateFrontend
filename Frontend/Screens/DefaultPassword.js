import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import FormContainer from '../Shared/FormContainer';
import Header from '../Shared/Header';

const DefaultPassword = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled" 
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
    padding: wp(5), 
    marginTop: hp(2), 
  },
  logo: {
    width: wp(50),  
    height: wp(50), 
    marginBottom: hp(2), 
    marginTop: hp(5), 
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1), 
    fontSize: wp(4), 
    color: '#333',
    marginRight: wp(10), 
  },
  otpBox: {
    width: '90%',
    height: hp(30), 
    padding: wp(5), 
    backgroundColor: '#EFEFEF',
    borderRadius: wp(2), 
    marginTop: hp(3), 
    marginBottom: hp(3), 
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: wp(4), 
    color: '#000',
    textAlign: 'center',
    marginBottom: hp(2), 
    marginRight: wp(5), 
  },
  button: {
    marginTop: hp(3), 
    width: '50%',
    backgroundColor: '#E3963E',
    borderRadius: wp(2), 
    alignItems: 'center',
    paddingVertical: hp(2),
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'normal',
  },
});

export default DefaultPassword;
