import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {props.title && <Text style={styles.title}>{props.title}</Text>}
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
});

export default FormContainer;
