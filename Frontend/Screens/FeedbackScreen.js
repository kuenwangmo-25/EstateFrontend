import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Header from '../Shared/Header';

const FeedbackScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    paddingTop: 50,
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 35,
    flex: 1,
  },
  // Title container with lines on both sides
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    justifyContent: 'center',
  },
  line: {
    width: '20%',  // Shortened line width
    height: 1,     // Thickness of the line
    backgroundColor: '#579A4E', // Line color
    marginHorizontal: 10, // Space between the line and title text
  },
  title: {
    fontSize: 24,
    color: '#f39c12',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 30,
  },
  textInput: {
    height: 140,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#E67E00',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
