import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

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
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)} 
        >
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5), 
  },
  logo: {
    width: wp(60), 
    height: wp(60), 
    marginBottom: hp(3), 
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    marginBottom: hp(2),
    fontSize: wp(3.5),
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: wp(5), 
    marginVertical: hp(2), 
    width: '100%',
  },
  icon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    height: hp(6), 
    fontSize: wp(3.8), 
  },
  eyeIcon: {
    position: 'absolute',
    right: wp(3),
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginTop: hp(1),
    color: '#097969',
    fontSize: wp(3.5),
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  signupText: {
    color: '#555',
    fontSize: wp(3.5),
  },
  signupLink: {
    color: '#097969',
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: hp(5), 
    width: wp(50),
    backgroundColor: '#E3963E',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: hp(2), 
  },
  loginButtonText: {
    color: '#fff',
    fontSize: wp(4), 
    fontWeight: 'normal',
  },
});

export default LoginScreen;
