import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import Header from '../Shared/Header';

const FeedbackScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid>
      <Header 
        navigation={navigation} 
        title="Feedback" 
      />

      <Image
        source={require('../assets/Images/feedback.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.formContainer}>
       
        <View style={styles.titleContainer}>
          <View style={styles.line}></View>
          <Text style={styles.title}>Feedback</Text>
          <View style={styles.line}></View>
        </View>

        <Text style={styles.subtitle}>
          Kindly Provide Your Feedback Here!
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Descriptions"
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f1f2f6',
    paddingTop: hp(5), 
  },
  image: {
    width: '100%',
    height: hp(25), 
    marginBottom: hp(3),
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp(7), 
    borderTopRightRadius: wp(7), 
    paddingHorizontal: wp(7), 
    paddingVertical: hp(4), 
    flex: 1,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(3), 
    justifyContent: 'center',
  },
  line: {
    width: '20%',  
    height: hp(0.3), 
    backgroundColor: '#097969', 
    marginHorizontal: wp(3), 
  },
  title: {
    fontSize: wp(6), 
    color: '#f39c12',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp(4),
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: hp(4), 
  },
  textInput: {
    height: hp(18), 
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: wp(3), 
    padding: wp(4),
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: hp(4), 
  },
  submitButton: {
    marginTop: hp(5),
    width: '50%',
    backgroundColor: '#E3963E',
    borderRadius: wp(2),
    alignItems: 'center',
    alignSelf:'center',
    paddingVertical: hp(2), 
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(4),
  },
});
