import React, { useState } from 'react';
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

const issues = [
  { id: '1', category: 'Electric', title: 'Switch not working', date: 'Today' },
  { id: '2', category: 'Carpentry', title: 'Door is broken', date: 'Today' },
  { id: '3', category: 'Cleaning', title: 'Request for cleaning the class', date: 'Tuesday' },
  { id: '4', category: 'Plumbing', title: 'Leakage', date: 'Tuesday' },
  { id: '5', category: 'Electric', title: 'Light flickering in corridor', date: 'Today' },
  { id: '6', category: 'Electric', title: 'Short circuit in lab', date: 'Tuesday' },
  { id: '7', category: 'Carpentry', title: 'Chair is broken in room 101', date: 'Tuesday' },
  { id: '8', category: 'Plumbing', title: 'Tap is leaking', date: '24/09/2024' },
  { id: '9', category: 'Cleaning', title: 'Garbage not collected', date: '24/09/2024' },
  { id: '10', category: 'Carpentry', title: 'Desk needs repair', date: '24/09/2024' },
  { id: '11', category: 'Electric', title: 'Fan not working', date: '24/09/2024' },
  { id: '12', category: 'Electric', title: 'No power in socket', date: '24/09/2024' },
  { id: '13', category: 'Cleaning', title: 'Dirty floor in lab 2', date: 'Monday' },
  { id: '14', category: 'Plumbing', title: 'Overflowing sink', date: 'Monday' },
  { id: '15', category: 'Carpentry', title: 'Broken drawer', date: 'Monday' },
  { id: '16', category: 'Electric', title: 'AC not working', date: 'Monday' },
  { id: '17', category: 'Cleaning', title: 'Spider webs on ceiling', date: 'Monday' },
  { id: '18', category: 'Electric', title: 'Power cut in west wing', date: 'Monday' },
  { id: '19', category: 'Plumbing', title: 'Low water pressure', date: 'Monday' },
  { id: '20', category: 'Carpentry', title: 'Shelf falling off wall', date: 'Monday' },
  { id: '21', category: 'Electric', title: 'Wiring exposed near stairs', date: 'Monday' },
  { id: '22', category: 'Cleaning', title: 'Dust on projector', date: 'Monday' },
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

  const renderSection = ({ item: date }) => (
    <View style={styles.sectionWrapper}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <FlatList
        data={groupedIssues[date]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false} // prevent inner scrolling
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header1 navigation={navigation} onSearch={setSearchQuery} />

      {filteredIssues.length === 0 ? (
        <Text style={styles.noResultText}>No issues found.</Text>
      ) : (
        <FlatList
          data={Object.keys(groupedIssues)}
          keyExtractor={(date) => date}
          renderItem={renderSection}
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
