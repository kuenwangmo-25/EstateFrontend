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

  const renderSectionHeader = (date) => (
    <View style={styles.dateHeader}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  const renderSection = ({ date, issues }) => (
    <View style={styles.sectionWrapper}>
      {renderSectionHeader(date)}
      <FlatList
        data={issues}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    padding: 16, 
    backgroundColor: '#f1f2f6',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E3963E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  title: {
    fontSize: 16,
    color: '#555',
  },
  separator: {
    height: 12,
  },
  dateHeader: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 5,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E3963E',
  },
  sectionWrapper: {
    marginBottom: 20,
  },
  listContent: {
    marginTop: 80,
  },
});
