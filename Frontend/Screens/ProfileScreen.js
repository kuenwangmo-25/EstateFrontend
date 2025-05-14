import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import Header from "../Shared/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ProfileScreen = ({ navigation }) => {
  const [showResetFields, setShowResetFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

        <View style={styles.profileCard}>
          <View style={styles.titleRow}>
            <View style={styles.line} />
            <Text style={styles.profileTitle}>Profile</Text>
            <View style={styles.line} />
          </View>

          <Text style={styles.info}>
            <Text style={styles.label}>Name: </Text>Jigme Dema
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Email: </Text>12210053.gcit@rub.edu.bt
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Member Type: </Text>Student
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
        </View>
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
    position: "relative",
  },
  profileCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(70),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: wp(7),
    paddingTop: hp(3),
    paddingBottom: hp(3),
    elevation: 3,
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
    justifyContent: "center",
  },
  profileTitle: {
    fontSize: wp(7),
    fontWeight: "bold",
    textAlign: "center",
    color: "#E67E00",
    marginHorizontal: 10,
  },
  line: {
    width: wp(20),
    height: 3,
    backgroundColor: "#097969",
  },
  info: {
    fontSize: wp(5),
    color: "#333",
    marginBottom: hp(1.5),
    alignSelf: "flex-start",
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  resetText: {
    color: "#E67E00",
    marginTop: hp(2),
    fontWeight: "bold",
  },
  inputSection: {
    marginTop: hp(2),
    width: "100%",
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: wp(3),
    borderRadius: 8,
    marginBottom: hp(1.5),
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  submitBtn: {
    marginTop: hp(2),
    width: wp(50),
    backgroundColor: "#E67E00",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: hp(1.8),
    alignSelf: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
