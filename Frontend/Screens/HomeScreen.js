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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require("../assets/Images/Homepage.png")}
      >
      
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
            <Icon
              name="user-circle"
              size={wp(8)}
              color="#E3963E"
              style={[styles.profilePic, { backgroundColor: "transparent" }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.logoutContainer}
          >
            <Text style={styles.logoutText}>Logout</Text>
            <Icon
              name="power-off"
              size={wp(7)}
              color="#E3963E"
              style={{ marginLeft: wp(1) }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.overlay}>
          <Text style={styles.title}>
            <Text style={styles.titleWhite}>Estate</Text>
            {"\n"}
            <Text style={styles.titleOrange}>Help Desk</Text>
          </Text>
          <Text style={styles.subtitle}>
            We're here to assist you with quick solutions{"\n"}and reliable
            assistance!
          </Text>
        </View>
      </ImageBackground>

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
              <Icon name="bell" size={wp(7)} color="#E3963E" />
              <Text style={styles.actionText}>Notification</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => navigation.navigate("IssueReport")}
            >
              <Icon name="file-text" size={wp(7)} color="#E3963E" />
              <Text style={styles.actionText}>ReportIssue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => navigation.navigate("Feedback")}
            >
              <Icon name="thumbs-up" size={wp(7)} color="#E3963E" />
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
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  profilePic: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: "transparent",
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "#E3963E",
    fontSize: wp(4.5),
    fontWeight: "600",
  },
  overlay: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: hp(25),
    paddingBottom: hp(4),
  },
  title: {
    fontSize: wp(12),
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    marginBottom: hp(2),
  },
  titleWhite: {
    color: "#FFFFFF",
  },
  titleOrange: {
    color: "#E3963E",
  },
  subtitle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: wp(5),
    marginBottom: hp(8),
  },
  content: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: wp(6),
    paddingVertical: hp(3),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    minHeight: hp(35),
  },
  contentInner: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: hp(-2)
  },
  description: {
    textAlign: "center",
    color: "#808080",
    fontSize: wp(5),
    marginBottom: hp(2),
  
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: hp(7), 
    width: "100%",
  },
  actionItem: {
    alignItems: "center",
    alignSelf: "center",
    padding: wp(5),
    borderWidth: 1,
    borderColor: "#EFEFEF",
    borderRadius: wp(2),
    backgroundColor: "#EFEFEF",
    width: wp(28),
    height: wp(25),
  },
  actionText: {
    color: "#4b5563",
    marginTop: hp(1),
    fontSize: hp(1.4),
  },
 contactButton: {
  backgroundColor: "#E3963E",
  padding: wp(3),
  borderRadius: wp(2),
  alignItems: "center",
  width: "50%",
  alignSelf: "center",
  marginBottom: hp(7), 
  paddingVertical: hp(2),
  
},

  contactText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
