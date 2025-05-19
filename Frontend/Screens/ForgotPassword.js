import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';
import Header from '../Shared/Header';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      setError('Please enter your email');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    navigation.navigate('DefaultPassword');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Header navigation={navigation} />
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <Text style={styles.infoText}>
        Make sure your email is already registered in the
      </Text>
      <Text style={styles.infoText}>
        Estate admin system
      </Text>

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
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
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
    alignItems: 'center',
    padding: wp(4),
  },
  logo: {
    width: wp(50),
    height: wp(50),
    marginTop: hp(5),
    marginBottom: hp(3),
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: hp(1),
    fontSize: wp(4),
    color: '#333',
    marginRight: wp(10),
  },
  formContainer: {
    width: '100%',
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
    height: hp(6),
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(3),
  },
  button: {
    width: '50%',
    backgroundColor: '#E3963E',
    borderRadius: wp(2),
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: hp(2),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'normal',
  },
  errorText: {
    marginBottom: hp(2),
    fontSize: wp(4),
    color: 'red',
    textAlign: 'center',
  },
});

export default ForgotPassword;
