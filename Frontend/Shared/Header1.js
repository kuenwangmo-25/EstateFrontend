import React, { useState } from "react";
import {
  View, TouchableOpacity, StyleSheet, TextInput, Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Header1 = ({ navigation, onSearch }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      Keyboard.dismiss();
      onSearch(""); 
    }
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
        <Icon name="arrow-back" size={wp('4.5%')} color="#097969" />
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        {isSearching && (
          <TextInput
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearchChange}
            style={styles.searchInput}
            autoFocus
          />
        )}
      </View>

      <TouchableOpacity onPress={handleSearchToggle} style={styles.circleButton}>
        <Icon name={isSearching ? "close" : "search"} size={wp('4.5%')} color="#097969" />
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
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  circleButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    borderWidth: 1.5,
    borderColor: "#097969",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  centerContainer: {
    flex: 1,
    marginHorizontal: wp('2%'),
  },
  searchInput: {
    height: hp('5.5%'),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    fontSize: wp('4%'),
    backgroundColor: "#fff",
  },
});

export default Header1;
