import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in your credential');
      setTimeout(() => setError(''), 1000);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setTimeout(() => setError(''), 1000);
      return;
    }

    setError('');
    console.log('Logging in with:', email, password);
    navigation.replace('Home');
  };

  const handleForgotPassword = () => {
    navigation.navigate('FogotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      {/* Show error message if exists */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign Up Section */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    resizeMode: 'contain',
  },
  // errorText: {
  //   color: 'red',
  //   marginBottom: 10,
  //   fontSize: 14,
  //   fontWeight: '500',
  // },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: '#7ac943',
    fontSize: 13,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#555',
    fontSize: 12,
  },
  signupLink: {
    color: '#7ac943',
    fontSize: 13,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 30,
    width: '50%',
    backgroundColor: '#E67E00',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default LoginScreen;
