import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Header from "../Shared/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ProfileScreen = ({ navigation }) => {
  const [showResetFields, setShowResetFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // For inline error messages
  const [newPassError, setNewPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const handleResetClick = () => {
    setShowResetFields(true);
  };

  const validatePassword = (password) => {
    // At least 8 chars, one uppercase, one number, one special char
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = () => {
    let valid = true;

    if (!validatePassword(newPassword)) {
      setNewPassError(
        "Password must be 8+ chars, include uppercase, number & special char."
      );
      valid = false;
    } else {
      setNewPassError("");
    }

    if (newPassword !== confirmPassword) {
      setConfirmPassError("New Password and Confirm Password do not match.");
      valid = false;
    } else {
      setConfirmPassError("");
    }

    if (!valid) return;

    // Submit logic here
    console.log("Old:", oldPassword, "New:", newPassword, "Confirm:", confirmPassword);

    setShowResetFields(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCancel = () => {
    setShowResetFields(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setNewPassError("");
    setConfirmPassError("");
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/Images/ProfileBackground.png")}
      style={styles.background}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid
        extraScrollHeight={hp(5)}
        keyboardShouldPersistTaps="handled"
      >
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
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Old Password"
                  secureTextEntry={!showOld}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowOld(!showOld)}
                >
                  <Feather name={showOld ? "eye" : "eye-off"} size={20} color="#888" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="New Password"
                  secureTextEntry={!showNew}
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    // live validation on typing (optional)
                    if (!validatePassword(text)) {
                      setNewPassError(
                        "Password must be 8+ chars, include uppercase, number & special char."
                      );
                    } else {
                      setNewPassError("");
                    }
                  }}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowNew(!showNew)}
                >
                  <Feather name={showNew ? "eye" : "eye-off"} size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {newPassError ? (
                <Text style={styles.errorText}>{newPassError}</Text>
              ) : null}

              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirm}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (newPassword !== text) {
                      setConfirmPassError("New Password and Confirm Password do not match.");
                    } else {
                      setConfirmPassError("");
                    }
                  }}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirm(!showConfirm)}
                >
                  <Feather name={showConfirm ? "eye" : "eye-off"} size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {confirmPassError ? (
                <Text style={styles.errorText}>{confirmPassError}</Text>
              ) : null}

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: wp(7),
    paddingTop: hp(2),
    paddingBottom: hp(7),
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
    marginBottom: hp(2.5),
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
  inputWrapper: {
    position: "relative",
    marginBottom: hp(1.5),
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: wp(3),
    paddingRight: wp(10),
    borderRadius: 8,
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: wp(3),
    top: "35%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(2),
    width: "100%",
  },
  submitBtn: {
    width: "48%",
    backgroundColor: "#E67E00",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: hp(1.8),
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelBtn: {
    width: "48%",
    backgroundColor: "#636357",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: hp(1.8),
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: wp(3.5),
    marginBottom: hp(1),
    marginLeft: wp(1),
  },
});

export default ProfileScreen;
