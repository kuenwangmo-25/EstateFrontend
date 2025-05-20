import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Shared/Header1';
import baseURL from '../assets/common/baseUrl';
import axios from 'axios';
import AuthGlobal from '../Context/store/AuthGlobal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const groupByDate = (issues) => {
  return issues.reduce((groups, issue) => {
    const date = new Date(issue.dateReported).toISOString().split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(issue);
    return groups;
  }, {});
};

export default function IssueListScreen({ navigation }) {
  const context = useContext(AuthGlobal);
  const userId = context?.stateUser?.user?.id;

  const [groupedIssues, setGroupedIssues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${baseURL}/issues/${userId}`);
        const data = response.data.data;

        if (Array.isArray(data)) {
          const sortedIssues = data.sort(
            (a, b) => new Date(b.dateReported) - new Date(a.dateReported)
          );
          const grouped = groupByDate(sortedIssues);
          setGroupedIssues(grouped);
        } else {
          console.log('No issues array in response.');
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

  const renderSection = ({ date, issues }) => (
    <View style={styles.sectionWrapper}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <FlatList
        data={issues}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
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
      {Object.keys(groupedIssues).length === 0 ? (
        <Text style={styles.noResultText}>No issues found.</Text>
      ) : (
        <FlatList
          data={Object.keys(groupedIssues)}
          keyExtractor={(date) => date}
          renderItem={({ item: date }) =>
            renderSection({ date, issues: groupedIssues[date] })
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),
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
    paddingBottom: hp(3),
    paddingTop: hp(10),
  },
  noResultText: {
    textAlign: 'center',
    color: '#999',
    fontSize: wp(4),
    marginTop: 80,
  },
});
