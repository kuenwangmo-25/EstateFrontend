import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';

const ConfirmPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password.trim() === '') {
      setError('Please enter the default password');
      setTimeout(() => setError(''), 3000); // show error for 3 seconds
      return;
    }
    // Clear error if any and navigate
    setError('');
    navigation.navigate('Home');
  };

  return (
    <KeyboardAwareScrollView 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled" 
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
          <TouchableOpacity 
            onPress={handleConfirm} 
            disabled={password.trim() === ''}  // disable if password is empty
            activeOpacity={password.trim() === '' ? 1 : 0.7}
          >
            <Text style={[styles.buttonText, password.trim() === ''  ]}>
              Confirm
            </Text>
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
    marginTop: hp(3), 
  },
  logo: {
    width: wp(50), 
    height: wp(50), 
    marginTop: hp(5), 
    marginBottom: hp(2), 
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1), 
    fontSize: wp(4), 
    color: '#333',
    marginRight: wp(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2), 
    paddingHorizontal: wp(6), 
    marginVertical: hp(2), 
    width: '90%',
  },
  input: {
    flex: 1,
    height: hp(7), 
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
    fontSize: wp(4.5), 
    fontWeight: 'normal',
  },
 
  errorText: {
    fontSize: wp(4), 
    color: '#ff0000',
    textAlign: 'center',
    marginVertical: hp(2), 
  },
});

export default ConfirmPassword;
