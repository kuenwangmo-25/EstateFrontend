import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header1 from '../Shared/Header1';
import baseURL from '../assets/common/baseUrl';
import axios from 'axios';
import AuthGlobal from '../Context/store/AuthGlobal';

const NotificationScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const context = useContext(AuthGlobal);
  const userId = context?.stateUser?.user?.id;

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${baseURL}/remarks/${userId}`);
        if (response.data.status === 'success') {
          setNotifications(response.data.data); // Set the notifications data in state
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        Alert.alert('Error', 'Something went wrong');
      }
    };
    const markRemarksAsSeen = async () => {
    try {
      await axios.put(`${baseURL}/remarks/mark-seen/${userId}`);
    } catch (error) {
      console.error('Failed to mark remarks as seen:', error);
    }
  };

    fetchNotifications();
      markRemarksAsSeen();


    // Set polling interval to check for new remarks every 30 seconds
    const interval = setInterval(fetchNotifications, 30000); // 30 seconds polling

    // Cleanup polling on component unmount
    return () => clearInterval(interval);
  }, [userId]); // Re-run when userId changes

  // Filter notifications by location and description based on the search query
  const filteredNotifications = notifications.filter((notification) => {
    const query = searchQuery.toLowerCase();
    return (
      (notification.location && notification.location.toLowerCase().includes(query)) ||
      (notification.description && notification.description.toLowerCase().includes(query))
    );
  });

  return (
    <View style={styles.container}>
      <View>
        <Header1 navigation={navigation} onSearch={setSearchQuery} />
      </View>

      <ScrollView
        contentContainerStyle={styles.notificationList}
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
      >
        {filteredNotifications.length === 0 ? (
          <Text style={styles.noResultText}>No notifications found.</Text>
        ) : (
          filteredNotifications.map((item, index) => {
            // Only show notifications with a remark
            if (item.latestRemark) {
              return (
                <View style={styles.notificationBox} key={item.issueId}>
                  {(index === 0 || filteredNotifications[index - 1].date !== item.date) && (
                    <Text style={styles.dateHeader}>{item.date}</Text>
                  )}
                  <View style={styles.notificationContent}>
                    <Ionicons name="person-circle" size={40} color="#097969" style={styles.icon} />
                    <View style={styles.textContainer}>
                      <Text style={styles.notificationTitle}>{item.category}</Text>
                      <Text style={styles.notificationDescription}>{item.latestRemark.message}</Text>
                    </View>
                  </View>
                </View>
              );
            }
            return null; // Skip rendering if no remark
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    paddingHorizontal: wp(5),
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: hp(15),
  },
  notificationList: {
    paddingBottom: hp(3),
  },
  notificationBox: {
    marginBottom: hp(2),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EFEFEF',
    shadowColor: '#EFEFEF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
  },
  dateHeader: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#E3963E',
    marginBottom: hp(1),
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: wp(4),
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: wp(4.2),
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    color: '#555',
    fontSize: wp(3.5),
  },
  noResultText: {
    textAlign: 'center',
    color: '#999',
    fontSize: wp(4),
    marginTop: hp(2),
  },
});

export default NotificationScreen;
