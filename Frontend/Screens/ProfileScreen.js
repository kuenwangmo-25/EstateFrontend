import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../Shared/Header";

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

        <ScrollView contentContainerStyle={styles.profileCard}>
          <Text style={styles.profileTitle}>
            <Text style={styles.greenLine}>—</Text> Profile{" "}
            <Text style={styles.greenLine}>—</Text>
          </Text>

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
        </ScrollView>
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
    height: "50%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 3,
    position: "absolute",
    bottom: 0,
  },
  profileTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E67E00",
    marginBottom: 20,
  },
  greenLine: {
    color: "green",
    fontSize: 18,
    width: '100%', // Increased width for longer lines
    marginHorizontal: 50,
  },
  info: {
    fontSize: 20,
    color: "#333",
    marginBottom: 12,
    alignSelf:'flex-start', 
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  resetText: {
    color: "#E67E00",
    marginTop: 15,
    fontWeight: "bold",
  },
  inputSection: {
    marginTop: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  submitBtn: {
    marginTop: 30,
    width: '50%',
    backgroundColor: '#E67E00',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    alignSelf:"center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
