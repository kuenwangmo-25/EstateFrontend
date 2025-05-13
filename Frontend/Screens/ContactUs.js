import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Header from '../Shared/Header'; // Import HeaderWithBack component

const ContactUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Pass navigation prop to Header */}
      <Header 
        navigation={navigation}  // Pass navigation prop for the back button functionality
      />
      <Image
        source={require('../assets/Images/contactus.png')} // Replace with your local image path
        style={styles.image}
      />
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <View style={styles.line}></View>
          <Text style={styles.title}>Contact Us</Text>
          <View style={styles.line}></View>
        </View>
        <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        <View style={styles.contactInfoColumn}>
          <Icon name="phone" size={35} color="#E67E00" />
          <Text style={styles.contactText}>+975 1234567 / 7078</Text>
        </View>

        <View style={styles.contactInfoColumn}>
          <Icon name="envelope" size={35} color="#E67E00" />
          <Text style={styles.contactText}>gcitEstate@gmail.com</Text>
        </View>

        <View style={styles.contactInfoColumn}>
          <Icon name="map-marker" size={35} color="#E67E00" />
          <Text style={styles.contactText}>Chamjekha, Kabesa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  image: {
    width: 350, // Increased image size
    height: 350,
    resizeMode: 'contain',
    marginBottom: 20, // Added space between image and card
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  line: {
    width: 50, // Shorter line width
    height: 3, // Increased height for thicker line
    backgroundColor: '#579A4E', // Line color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E67E00',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  contactInfoColumn: {
    alignItems: 'center',
    marginVertical: 30, // Increased spacing between icons
  },
  contactText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default ContactUsScreen;
