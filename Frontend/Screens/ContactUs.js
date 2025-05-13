import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Header from '../Shared/Header'; // Import HeaderWithBack component
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Responsive screen utility

const ContactUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
          <Icon name="phone" size={hp(4)} color="#E3963E" />
          <Text style={styles.contactText}>+975 1234567 / 7078</Text>
        </View>

        <View style={styles.contactInfoColumn}>
          <Icon name="envelope" size={hp(4)} color="#E3963E" />
          <Text style={styles.contactText}>gcitEstate@gmail.com</Text>
        </View>

        <View style={styles.contactInfoColumn}>
          <Icon name="map-marker" size={hp(4)} color="#E3963E" />
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
    paddingTop: hp(5), // Responsive top padding
  },
  image: {
    width: wp(80), // Responsive width for the image
    height: wp(80), // Responsive height for the image
    resizeMode: 'contain',
    marginBottom: hp(3), // Responsive margin bottom
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%', // Responsive width for the card
    borderRadius: wp(2), // Responsive border radius
    padding: wp(5), // Responsive padding
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    bottom:"4%",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2), // Responsive margin bottom
  },
  line: {
    width: '20%', // Shorter line width
    height: hp(0.3), // Increased height for thicker line
    backgroundColor: '#097969', // Line color
  },
  title: {
    fontSize: wp(6), // Responsive font size for title
    fontWeight: 'bold',
    color: '#E3963E',
    textAlign: 'center',
    marginHorizontal: wp(2),
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: hp(3), // Responsive margin bottom
  },
  contactInfoColumn: {
    alignItems: 'center',
    marginVertical: hp(2), // Increased spacing between icons
  },
  contactText: {
    marginTop: hp(1), // Responsive margin top
    fontSize: wp(4.5), // Responsive font size
    color: '#333',
    textAlign: 'center',
  },
});

export default ContactUsScreen;
