import React, { useState,useContext,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import Header from "../Shared/Header";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthGlobal from "../Context/store/AuthGlobal"; // make sure the path is correct
import baseURL from "../assets/common/baseUrl";

const ProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);

  const [showResetFields, setShowResetFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const context = useContext(AuthGlobal);

    useEffect(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          if (context?.stateUser?.user?.id) {
            axios.get(`${baseURL}/me`, {
                headers: { Authorization: `Bearer ${res}` },
              })
                .then((user) => {
                  setUserProfile(user.data);})              .catch((err) => console.log(err));
          }
        })
        .catch((error) => console.log(error));

      return () => setUserProfile(null);
    }, [context?.stateUser?.isAuthenticated]);

  const handleResetClick = () => {
    setShowResetFields(true);
  };

  const handleSubmit = () => {
    console.log("Old:", oldPassword, "New:", newPassword, "Confirm:", confirmPassword);
    setShowResetFields(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/Images/ProfileBackground.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header navigation={navigation} />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.profileCard}
          enableOnAndroid={true}
          extraScrollHeight={hp(10)} // Adjusts the space when the keyboard is visible
        >
          <Text style={styles.profileTitle}>
            <View style={styles.line} />
            <Text style={styles.profileTitle}>  Profile </Text>
            <View style={styles.line} />
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Name: </Text>{userProfile?.data?.name}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Email: </Text>{userProfile?.data?.email}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Member Type: </Text>{userProfile?.data?.role}
          </Text>

          {!showResetFields ? (
            <TouchableOpacity onPress={handleResetClick}>
              <Text style={styles.resetText}>Reset Password</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputSection}>
              <TextInput
                placeholder="Old Password"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
                style={styles.input}
              />
              <TextInput
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
              />
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  profileCard: {
    width: "100%",
    height: hp(50), // Use responsive height
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp(7), // Use responsive padding
    alignItems: "center",
    elevation: 3,
    position: "absolute",
    bottom: 0,
  },
  profileTitle: {
    fontSize: wp(7), // Responsive font size
    fontWeight: "bold",
    textAlign: "center",
    color: "#E67E00",
    marginBottom: hp(3), // Responsive margin
  },
  line: {
    width: wp(20), // Responsive width
    height: 3,
    backgroundColor: '#097969',
    marginHorizontal: 10,
  },
  info: {
    fontSize: wp(5), // Responsive font size
    color: "#333",
    marginBottom: hp(2), // Responsive margin
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  resetText: {
    color: "#E67E00",
    marginTop: hp(2), // Responsive margin
    fontWeight: "bold",
  },
  inputSection: {
    marginTop: hp(3), // Responsive margin top
    width: "100%",
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: wp(3), // Responsive padding
    borderRadius: 8,
    marginBottom: hp(2), // Responsive margin bottom
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  submitBtn: {
    marginTop: hp(5), // Responsive margin top
    width: wp(50), // Responsive button width
    backgroundColor: '#E67E00',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: hp(2), // Responsive padding
    alignSelf: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
