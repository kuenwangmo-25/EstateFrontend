import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Responsive screen utility
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Import KeyboardAwareScrollView
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';

const ConfirmPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password.trim() === '') {
      setError('Please enter the default password');
      setTimeout(() => setError(''), 1000); // Clear the error after 1 second
      return;
    }
    navigation.navigate('Home');
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
          placeholder="Password"
          name="password"
          id="password"
          value={password}
          onChangeText={setPassword}
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
