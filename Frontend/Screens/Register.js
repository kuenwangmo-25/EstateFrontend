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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (email.trim() === '') {
      setError('Please enter your email');
      return;
    }

    setError('');
    navigation.navigate('OTP');
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
