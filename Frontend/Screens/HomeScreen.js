import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require("../assets/Images/Homepage.png")}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
            <Image
              source={require("../assets/Images/logo.png")}
              style={styles.profilePic}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.logoutContainer}
          >
            <Text style={styles.logoutText}>Logout</Text>
            <Icon name="power-off" size={30} color="#E67E00" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* Overlay Title and Subtitle */}
        <View style={styles.overlay}>
          <Text style={styles.title}>
            <Text style={styles.titleWhite}>Estate</Text>{"\n"}
            <Text style={styles.titleOrange}>Help Desk</Text>
          </Text>
          <Text style={styles.subtitle}>
            We're here to assist you with quick solutions{"\n"}and reliable assistance!
          </Text>
        </View>
      </ImageBackground>

      {/* Bottom Content Section */}
      <View style={styles.content}>
        <View style={styles.contentInner}>
          <Text style={styles.description}>
            We're here to assist you with quick solutions and reliable assistance!
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => navigation.navigate("Notification")}
            >
              <Icon name="bell" size={28} color="#E67E00" />
              <Text style={styles.actionText}>Notification</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => navigation.navigate("IssueReport")}
            >
              <Icon name="file-text" size={28} color="#E67E00" />
              <Text style={styles.actionText}>Report issue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => navigation.navigate("Feedback")}
            >
              <Icon name="thumbs-up" size={28} color="#E67E00" />
              <Text style={styles.actionText}>Feedback</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate("ContactUs")}
          >
            <Text style={styles.contactText}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  topBar: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: height * 0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "#E67E00",
    fontSize: 16,
    fontWeight: "600",
  },
  overlay: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: height * 0.22, // shifted the title slightly up
    paddingBottom: 26,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 25, // added space between title and subtitle
  },
  
  titleWhite: {
    color: "#FFFFFF",
  },
  titleOrange: {
    color: "#E67E00",
  },
  subtitle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 80,
  },
  content: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingVertical: 20, // reduced from 30
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    minHeight: height * 0.35, // reduced from 0.4
  },
  contentInner: {
    flex: 1,
    justifyContent: "space-between",
  },
  description: {
    textAlign: "center",
    color: "#808080",
    fontSize: 20,
    marginBottom: 10, // reduced from 20
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10, // reduced from 20
    width: "100%",
  },
  actionItem: {
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    width: 100,
  },
  actionText: {
    color: "#4b5563",
    marginTop: 5,
  },
  contactButton: {
    backgroundColor: '#E67E00',
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginTop: 20, // Add slight bottom margin to shift it up
  },
  contactText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});


export default HomeScreen;
