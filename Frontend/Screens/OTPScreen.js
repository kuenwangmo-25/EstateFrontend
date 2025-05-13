import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import FormContainer from '../Shared/FormContainer';

const OTPScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
     
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#FFFFFF',
  // This moves the content towards the top
    alignItems: 'center',
    padding: 20,
    marginTop: 20, // Adjusted to shift content upwards
  },
  logo: {
    width: 200,
    height: 200,
    // marginBottom: ,
    marginTop: 40,
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 5, // Reduced vertical margin to bring text closer
    fontSize: 16,
    color: '#333',
    marginRight:"10%",
    
  },
  otpBox: {
    width: '90%',
    height: '70%',
    padding: 20,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    margin: 20,
    marginRight:"20%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
    marginRight:"5%",
  },
  otpWord: {
    color: '#E67E00',
    fontWeight: 'bold',
  },
  button: {
    width: '60%',
    backgroundColor: '#E67E00',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
  },
});

export default OTPScreen;
