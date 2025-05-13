import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';

const FogotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (email.trim() === '') {
      setError('Please enter your email');
      return;
    }

    setError('');
    navigation.navigate('DefaultPassword');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <Text style={styles.infoText}>
        Make sure your email is already registered in the Estate admin system
      </Text>

      <FormContainer style={styles.formContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          keyboardType="email-address"
          icon={<Icon name="envelope" size={20} color="#aaa" />}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 40,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 14,
    color: '#333',
    marginHorizontal: '1%',
  },
  formContainer: {
    width: '100%',
  },
  // errorText: {
  //   marginBottom: 12,
  //   fontSize: 16,
  //   alignSelf: 'center',
  // },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  
  },
  button: {
    marginTop: 30,
    width: '50%',
    backgroundColor: '#E67E00',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default FogotPassword;
