import React, { useState, useEffect,useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Shared/Header1';
import baseURL from '../assets/common/baseUrl';
import axios from 'axios';
import AuthGlobal from "../Context/store/AuthGlobal"; // make sure the path is correct


const groupByDate = (issues) => {
  return issues.reduce((groups, issue) => {
    const date = new Date(issue.dateReported).toISOString().split('T')[0]; // YYYY-MM-DD format
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(issue);
    return groups;
  }, {});
};


export default function IssueListScreen({ navigation }) {
  const context = useContext(AuthGlobal);
  const userId  =context?.stateUser?.user?.id;
  console.log(userId)


  const [groupedIssues, setGroupedIssues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${baseURL}/issues/${userId}`);
        console.log('API Raw Response:', response.data);  // Log the full response
    
        // Ensure you're accessing the issues correctly
        const data = response.data.data;  // Correct path to your issues array
    
        if (Array.isArray(data)) {
          // Sort issues by dateReported in descending order (latest first)
          const sortedIssues = data.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
    
          // Group the sorted issues by date
          const grouped = groupByDate(sortedIssues);
          console.log("Grouped Issues:", grouped);  // Check if grouping works
          setGroupedIssues(grouped);
        } else {
          console.log("No issues array in response.");
        }
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      } finally {
        setLoading(false);
      }
    };
    
    

    if (userId) {
      fetchIssues();
    }
  }, [userId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('IssueDetail', { issue: item })}
    >
      <View style={styles.categoryWrapper}>
        <View style={styles.iconBox}>
          <Ionicons name="alert-circle" size={20} color="white" />
        </View>
        <Text style={styles.category}>{item.category?.name || 'Unknown'}</Text>
        </View>
      <Text style={styles.title}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderSection = ({ item: date }) => (
    <View style={styles.sectionWrapper}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <FlatList
        data={issues}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false} // prevent inner scrolling
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <ActivityIndicator size="large" color="#E3963E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={Object.keys(groupedIssues)}
        keyExtractor={(date) => date}
        renderItem={({ item: date }) => renderSection({ date, issues: groupedIssues[date] })}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f1f2f6',
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(3),
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    elevation: 3,
    marginBottom: 12,
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),
    marginBottom: 8,
  },
  iconBox: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E3963E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
    marginRight: 10,
  },
  category: {
    fontWeight: 'bold',
    fontSize: wp(4.5),
    color: '#333',
    fontSize: 18,
    color: '#333',
  },
  title: {
    fontSize: wp(4),
    color: '#555',
    fontSize: 16,
    color: '#555',
  },
  separator: {
    height: wp(3),
    height: 12,
  },
  dateHeader: {
    backgroundColor: '#f2f2f2',
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 5,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: wp(4),
    fontSize: 16,
    color: '#E3963E',
  },
  sectionWrapper: {
    marginBottom: wp(5),
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: hp(3),
    paddingTop: hp(10), // Increased gap between header and list
  },
  noResultText: {
    textAlign: 'center',
    color: '#999',
    fontSize: wp(4),
    marginTop: hp(2),
    marginTop: 80,
  },
});
