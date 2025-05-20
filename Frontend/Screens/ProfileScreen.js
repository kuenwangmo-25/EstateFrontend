import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import Toast from 'react-native-toast-message';
import Feather from "react-native-vector-icons/Feather";
import Header from "../Shared/Header";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthGlobal from "../Context/store/AuthGlobal";
import baseURL from "../assets/common/baseUrl";

const ProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [showResetFields, setShowResetFields] = useState(false);
  const [passwordCurrent, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  
  const context = useContext(AuthGlobal);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        if (context?.stateUser?.user?.id) {
          axios.get(`${baseURL}/me`, {
            headers: { Authorization: `Bearer ${res}` },
          })
            .then((user) => {
              setUserProfile(user.data.data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => console.log(error));
  }, [context?.stateUser?.isAuthenticated]);

  const handleResetClick = () => {
    setShowResetFields(true);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async () => {
    if (!passwordCurrent || !password || !passwordConfirm) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all password fields.',
      });
      return;
    }

    if (password !== passwordConfirm) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'New passwords do not match.',
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("jwt");

      await axios.patch(`${baseURL}/updatePassword`, {
        passwordCurrent,
        password,
        passwordConfirm
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Toast.show({
        type: 'success',
        text1: 'Password Changed',
        text2: 'Your password has been updated successfully.',
      });

      setShowResetFields(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: error.response?.data?.message || 'Something went wrong.',
      });
    }
  };

  const handleCancel = () => {
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

          <Text style={styles.info}><Text style={styles.label}>Name: </Text>{userProfile?.name}</Text>
          <Text style={styles.info}><Text style={styles.label}>Email: </Text>{userProfile?.email}</Text>
          <Text style={styles.info}><Text style={styles.label}>Member Type: </Text>{userProfile?.role}</Text>

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
                  value={passwordCurrent}
                  onChangeText={setOldPassword}
                  style={styles.input}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowOld(!showOld)}>
                  <Feather name={showOld ? "eye" : "eye-off"} size={20} color="#888" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="New Password"
                  secureTextEntry={!showNew}
                  value={password}
                  onChangeText={setNewPassword}
                  style={styles.input}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNew(!showNew)}>
                  <Feather name={showNew ? "eye" : "eye-off"} size={20} color="#888" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirm}
                  value={passwordConfirm}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirm(!showConfirm)}>
                  <Feather name={showConfirm ? "eye" : "eye-off"} size={20} color="#888" />
                </TouchableOpacity>
              </View>

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
});

export default ProfileScreen;
