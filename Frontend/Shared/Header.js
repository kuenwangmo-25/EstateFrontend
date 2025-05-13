import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
        <Icon name="arrow-back" size={20} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row", // Aligns the button and title horizontally
    alignItems: "center", // Vertically aligns button and title
    paddingHorizontal: 15,
    paddingTop: 40, // Increased paddingTop to move the header slightly further down
    position: "absolute", // Position the header absolutely
    top: 0, // Keeps it at the top
    left: 0, // Ensures it's at the left of the screen
    backgroundColor: "transparent", // No background box
    zIndex: 10, // Ensures it's on top of other content
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginLeft: 10, // Adjusted left margin to shift the button closer to the left corner
    marginBottom: 10,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // No fill
  },
});

export default Header;
