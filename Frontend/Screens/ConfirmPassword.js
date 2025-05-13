import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <FormContainer>
        <Text style={styles.infoText}>
          Make sure your email is already registered in the Estate admin system
        </Text>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* OTP Input Field with Key Icon */}
        <Input
          placeholder="Password"
          name="password"
          id="password"
          value={password}
          onChangeText={setPassword}
          keyboardType="numeric"
          icon={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="key" size={16} color="#aaa" style={{ marginRight: 5 }} />
            </View>
          }
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        {/* Confirm Button */}
        <View style={styles.button}>
          <TouchableOpacity onPress={handleConfirm}>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
    color: '#666',
  },
  
  
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
  button: {
    marginTop: 30,
    width: '50%',
    backgroundColor: '#E67E00',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    alignSelf: 'center', // This will center the button horizontally
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ConfirmPassword;
