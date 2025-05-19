import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Header from '../Shared/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ContactUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/Images/contactus.png')}
          style={styles.image}
        />
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <View style={styles.line}></View>
            <Text style={styles.title}>Contact Us</Text>
            <View style={styles.line}></View>
          </View>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
    alignItems: 'center',
  },
  image: {
    width: wp(80),
    height: wp(80),
    resizeMode: 'contain',
    marginBottom: hp(3),
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: wp(5),
    alignItems: 'center',
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 0,
    borderTopLeftRadius: wp(2),    // top-left corner radius
    borderTopRightRadius: wp(2),   // top-right corner radius
    borderBottomLeftRadius: 0,     // no bottom-left radius
    borderBottomRightRadius: 0,    // no bottom-right radius
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
    justifyContent: 'center',
  },
  line: {
    width: '20%',
    height: hp(0.3),
    backgroundColor: '#097969',
  },
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#E3963E',
    textAlign: 'center',
    marginHorizontal: wp(2),
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: hp(3),
  },
  contactInfoColumn: {
    alignItems: 'center',
    marginVertical: hp(2),
  },
  contactText: {
    marginTop: hp(1),
    fontSize: wp(4.5),
    color: '#333',
    textAlign: 'center',
  },
});

export default ContactUsScreen;
