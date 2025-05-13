import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ navigation, onSearchPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
        <Icon name="arrow-back" size={20} color="green" />
      </TouchableOpacity>

      <View style={{ flex: 1 }} />  {/* This takes up remaining space to push search to the right */}

      {/* Search Button */}
      <TouchableOpacity onPress={onSearchPress} style={styles.circleButton}>
        <Icon name="search" size={20} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 40,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 10,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default Header;
