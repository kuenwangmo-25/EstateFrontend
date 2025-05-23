import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import AuthGlobal from "../Context/store/AuthGlobal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';




// Get screen dimensions
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
    const { dispatch } = useContext(AuthGlobal);

  const context = useContext(AuthGlobal);
 
  const [notificationCount, setNotificationCount] = useState(0);
  const userId = context?.stateUser?.user?.id;
console.log("Auth Context State:", context.stateUser);

    useEffect(() => {
       if (!userId) {
    // If no userId (logged out), do not start polling
    setNotificationCount(0); // reset count if needed
    return;
  }
      const fetchUnseenCount = async () => {
        try {
          const response = await axios.get(`${baseURL}/remarks/unseen/${userId}`);
          const unseen = response.data.unseenCount || 0;
          setNotificationCount(unseen);
        } catch (error) {
          error("Error fetching unseen remark count:", error);
          setNotificationCount(0);
        }
      };

      fetchUnseenCount(); // Initial
      const interval = setInterval(fetchUnseenCount, 10000); // Every 10s

      return () => clearInterval(interval); // Cleanup
      }, [userId]);

 const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');

      // Call your logout API endpoint with the Bearer token
      await axios.get(
        `${baseURL}/logout`,
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {}
      
      );

      // Clear JWT from AsyncStorage
      await AsyncStorage.removeItem('jwt');

      // Dispatch logout action
      dispatch({
        type: 'LOGOUT',
      });

      Toast.show({
        type: 'success',
        text1: 'Logout Successful',
      });

      // Redirect to login
      navigation.navigate('Login');

    } catch (error) {
      console.log('Logout error:', error?.response || error.message);
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: error?.response?.data?.message || 'Try again later.',
      });
    }
  };




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
            <Icon
              name="user-circle"
              size={wp(8)} // Responsive size
              color="#E3963E"
              style={[styles.profilePic, { backgroundColor: 'transparent' }]}
            />
          </TouchableOpacity>

         <TouchableOpacity
              onPress={handleLogout}
        style={[styles.logoutContainer,{ zIndex: 10 }]}
>    

            <Text style={styles.logoutText}>Logout</Text>
            <Icon name="power-off" size={wp(7)} color="#E3963E" style={{ marginLeft: wp(1) }} />
          </TouchableOpacity>
        </View>

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
                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    {notificationCount === null ? (
                      <ActivityIndicator size="small" color="#E3963E" />
                    ) : (
                      <Text style={styles.badgeText}>{notificationCount}</Text>
                    )}
                  </View>
                )}

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