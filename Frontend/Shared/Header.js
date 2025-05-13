import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
        <Icon name="arrow-back" size={wp('5%')} color="#097969" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp('4%'),
    paddingTop: hp('5%'),
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  circleButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    borderWidth: 1.5,
    marginLeft: wp('2.5%'),
    marginBottom: hp('1.5%'),
    borderColor: "#097969",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default Header;
