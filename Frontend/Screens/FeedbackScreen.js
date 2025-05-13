import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Responsive screen utility
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Keyboard awareness
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
        source={require('../assets/Images/feedback.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.formContainer}>
        {/* Title with lines on both sides */}
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
    paddingTop: hp(5), // Responsive padding
  },
  image: {
    width: '100%',
    height: hp(25), // Responsive height
    marginBottom: hp(3), // Responsive margin
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp(7), // Responsive border radius
    borderTopRightRadius: wp(7), // Responsive border radius
    paddingHorizontal: wp(7), // Responsive padding
    paddingVertical: hp(4), // Responsive padding
    flex: 1,
  },
  // Title container with lines on both sides
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(3), // Responsive margin
    justifyContent: 'center',
  },
  line: {
    width: '20%',  // Shortened line width for responsive design
    height: hp(0.3), // Line height adjusted for responsiveness
    backgroundColor: '#097969', // Line color
    marginHorizontal: wp(3), // Responsive space between the line and title text
  },
  title: {
    fontSize: wp(6), // Responsive font size
    color: '#f39c12',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp(4), // Responsive font size
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: hp(4), // Responsive margin
  },
  textInput: {
    height: hp(18), // Responsive height for text input
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: wp(3), // Responsive border radius
    padding: wp(4), // Responsive padding
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: hp(4), // Responsive margin
  },
  submitButton: {
    marginTop: hp(5), // Responsive margin top
    width: '50%',
    backgroundColor: '#E3963E',
    borderRadius: wp(2), // Responsive border radius
    alignItems: 'center',
    alignSelf:'center',
    paddingVertical: hp(2), // Responsive padding
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(4), // Responsive font size
  },
});
