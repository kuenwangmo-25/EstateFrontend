import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Shared/Header1'; // Import your Header component

const issues = [
  { id: '1', category: 'Electric', title: 'Switch not working', date: 'Today' },
  { id: '2', category: 'Carpentry', title: 'Door is broken', date: 'Today' },
  { id: '3', category: 'Cleaning', title: 'Request for cleaning the class', date: 'Tuesday' },
  { id: '4', category: 'Plumbing', title: 'Leakage', date: 'Tuesday' },
  { id: '5', category: 'Electric', title: 'Switch not working', date: '24/09/2024' },
];

const groupByDate = (issues) => {
  return issues.reduce((groups, issue) => {
    const { date } = issue;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(issue);
    return groups;
  }, {});
};

const groupedIssues = groupByDate(issues);

export default function IssueListScreen({ navigation }) {
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
      <Text>{item.title}</Text>
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
    <View style={styles.container}>
      {/* Direct Header Component with original styles */}
      <Header navigation={navigation} />

      {/* Grouped Issue List */}
      <FlatList
        data={Object.keys(groupedIssues)}
        keyExtractor={(date) => date}
        renderItem={({ item: date }) => renderSection({ date, issues: groupedIssues[date] })}
        contentContainerStyle={styles.listContent}  // Add space between header and content
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  iconWrapper: {
    padding: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  categoryWrapper: {
    flexDirection: 'row',  // Aligns icon and category horizontally
    alignItems: 'center',  // Vertically aligns the icon with the category text
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E67E00', // Changed to orange
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,  // Space between the icon and the category text
  },
  category: {
    fontWeight: 'bold',  // Makes the category bold
    fontSize: 20,  // Increased font size
  },
  separator: {
    height: 12,
  },
  dateHeader: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E67E00',
  },
  sectionWrapper: {
    marginBottom: 20,
  },
  listContent: {
    marginTop: 120, // Adjust space between header and list content (may need fine-tuning)
  },
});
