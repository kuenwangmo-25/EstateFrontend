import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header1 from '../Shared/Header1';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const issues = [
  { id: '1', category: 'Electric', title: 'Switch not working', date: 'Today' },
  { id: '2', category: 'Carpentry', title: 'Door is broken', date: 'Today' },
  { id: '3', category: 'Cleaning', title: 'Request for cleaning the class', date: 'Tuesday' },
  { id: '4', category: 'Plumbing', title: 'Leakage', date: 'Tuesday' },
  { id: '5', category: 'Electric', title: 'Switch not working', date: '24/09/2024' },
];

const groupByDate = (data) => {
  return data.reduce((groups, item) => {
    const { date } = item;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
};

export default function IssueListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

 
  const filteredIssues = issues.filter((issue) => {
    const query = searchQuery.toLowerCase();
    return (
      issue.title.toLowerCase().includes(query) ||
      issue.category.toLowerCase().includes(query) ||
      issue.date.toLowerCase().includes(query)
    );
  });

  const groupedIssues = groupByDate(filteredIssues);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('IssueDetail', { issue: item })}
    >
      <View style={styles.categoryWrapper}>
        <View style={styles.iconBox}>
          <Ionicons name="alert-circle" size={20} color="white" />
        </View>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header1 navigation={navigation} onSearch={setSearchQuery} />

      {filteredIssues.length === 0 ? (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: wp(4),
    paddingTop: hp(8),  
    backgroundColor: '#f1f2f6',  
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(3),  
    borderRadius: 8,
    elevation: 3,  
    marginBottom: wp(5),  
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
    paddingTop: hp(4),  
  },
  noResultText: {
    textAlign: 'center',
    color: '#999',
    fontSize: wp(4),
    marginTop: hp(2),
  },
});
