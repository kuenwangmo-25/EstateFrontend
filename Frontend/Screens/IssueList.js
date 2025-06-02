import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header1 from '../Shared/Header1';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import baseURL from '../assets/common/baseUrl';
import axios from 'axios';
import AuthGlobal from '../Context/store/AuthGlobal';


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
  
  const [searchQuery, setSearchQuery] = useState('');
  const context = useContext(AuthGlobal);
  const userId = context?.stateUser?.user?.id;
  const [issues, setIssues] = useState([]);
  const [groupedIssues, setGroupedIssues] = useState({});

  const [loading, setLoading] = useState(true);

  const filteredIssues = issues.filter((issue) => {
    const query = searchQuery.toLowerCase();
    return (
      issue.description?.toLowerCase().includes(query) ||
      issue.category?.name?.toLowerCase().includes(query) ||
      issue.date?.toLowerCase().includes(query)
    );
  });

    useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${baseURL}/issues/${userId}`);
        const data= response.data.data;
        setIssues(data);

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
  const groupedToRender = groupByDate(filteredIssues);

  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('IssueDetail', { issue: item })}
    >
      <View style={styles.categoryWrapper}>
        <View style={styles.iconBox}>
          <Ionicons name="alert-circle" size={20} color="white" />
        </View>
        <Text style={styles.category}>{item.category?.name}</Text>
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
        data={groupedIssues[date]}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false} // prevent inner scrolling
      />
    </View>
  );

  return (
  <SafeAreaView style={styles.container}>
    <Header1 navigation={navigation} onSearch={setSearchQuery} />

    {Object.keys(groupedToRender).length === 0 ? (
      <Text style={styles.noResultText}>No issues found.</Text>
    ) : (
      <FlatList
        data={Object.keys(groupedToRender)}
        keyExtractor={(date) => date}
        renderItem={({ item: date }) => (
          <View style={styles.sectionWrapper}>
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>{date}</Text>
            </View>
            <FlatList
              data={groupedToRender[date]}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              scrollEnabled={false}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    )}
  </SafeAreaView>
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
    elevation: 2,
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),
  },
  iconBox: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: '#E3963E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  category: {
    fontWeight: 'bold',
    fontSize: wp(4.5),
    color: '#333',
  },
  title: {
    fontSize: wp(4),
    color: '#555',
  },
  separator: {
    height: wp(3),
  },
  dateHeader: {
    backgroundColor: '#f2f2f2',
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: 5,
    marginBottom: wp(2),
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: wp(4),
    color: '#E3963E',
  },
  sectionWrapper: {
    marginBottom: wp(5),
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
  },
});
