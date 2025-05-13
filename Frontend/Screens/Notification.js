import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Shared/Header1';

const notifications = [
  { id: '1', title: 'Issue Solved', description: 'Your issue has been solved', date: 'Today' },
  { id: '2', title: 'Issue in Progress', description: 'We are working on your issue', date: 'Today' },
  { id: '3', title: 'Delay in Service', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', date: 'Tuesday' },
  { id: '4', title: 'Issue Solved', description: 'Your issue has been solved', date: 'Tuesday' },
  { id: '5', title: 'Issue Solved', description: 'Your issue has been solved', date: '24/02/2024' },
  { id: '6', title: 'Issue Solved', description: 'Your issue has been solved', date: '24/02/2024' },
];

const NotificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Header navigation={navigation} />
      </View>

      {/* Notification Box List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
        renderItem={({ item, index }) => (
          <View style={styles.notificationBox}>  {/* Wrap each notification in a box */}
            {(index === 0 || notifications[index - 1].date !== item.date) && (
              <Text style={styles.dateHeader}>{item.date}</Text>
            )}
            <View style={styles.notificationContent}>
              <Ionicons name="person-circle" size={40} color="green" style={styles.icon} />
              <View>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDescription}>{item.description}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    zIndex: 10, // Ensure header stays on top
  },
  notificationList: {
    marginTop: 100, // Add margin to push the list below the header
    paddingBottom: 20,
  },
  notificationBox: {
    marginBottom: 15,
    paddingVertical: 10, // Keep vertical padding
    paddingHorizontal: 40, // Reduced horizontal padding for smaller box
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EFEFEF', // Border color for the notification box
    shadowColor: '#EFEFEF', // Shadow for some depth effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E67E00',
    marginBottom: 5,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationDescription: {
    color: '#555',
  },
});

export default NotificationScreen;
