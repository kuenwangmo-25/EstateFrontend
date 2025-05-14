import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header1 from '../Shared/Header1';

const notifications = [
  { id: '1', title: 'Issue Solved', description: 'Your issue has been solved', date: 'Today' },
  { id: '2', title: 'Issue in Progress', description: 'We are working on your issue', date: 'Today' },
  { id: '3', title: 'Delay in Service', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', date: 'Tuesday' },
  { id: '4', title: 'Issue Solved', description: 'Your issue has been solved', date: 'Tuesday' },
  { id: '5', title: 'Issue Solved', description: 'Your issue has been solved', date: '24/02/2024' },
  { id: '6', title: 'Issue Solved', description: 'Your issue has been solved', date: '24/02/2024' },
  { id: '7', title: 'New Issue Reported', description: 'A new issue has been reported.', date: '24/02/2024' },
  { id: '8', title: 'Issue Closed', description: 'Your issue has been successfully closed.', date: '25/02/2024' },
  { id: '9', title: 'Maintenance Update', description: 'Scheduled maintenance will occur on the weekend.', date: '25/02/2024' },
];

const NotificationScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  
  const filteredNotifications = notifications.filter((notification) => {
    const query = searchQuery.toLowerCase();
    return (
      notification.title.toLowerCase().includes(query) ||
      notification.date.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.container}>
      <View >
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
          filteredNotifications.map((item, index) => (
            <View style={styles.notificationBox} key={item.id}>
              {(index === 0 || filteredNotifications[index - 1].date !== item.date) && (
                <Text style={styles.dateHeader}>{item.date}</Text>
              )}
              <View style={styles.notificationContent}>
                <Ionicons name="person-circle" size={40} color="#097969" style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationDescription}>{item.description}</Text>
                </View>
              </View>
            </View>
          ))
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
