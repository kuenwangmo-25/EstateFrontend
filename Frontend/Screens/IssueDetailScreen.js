import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../Shared/Header';
export default function IssueDetailScreen({ route, navigation }) {
  const { issue } = route.params || {};

  // Extract relevant fields from issue
  const description = issue.description;
  const date = issue.dateAvail
    ? new Date(issue.dateAvail).toLocaleDateString()
    : 'Not available';
  const location = issue.location;
  const image = issue.photo
    ? { uri: issue.photo } // If photo is a URL or base64 path
    : require('../assets/Images/leakage.png'); // fallback
  const status = issue.status?.name || 'Pending';
  const category = issue.category?.name || 'Uncategorized';

  return (
    <View style={styles.screen}>
      <Header navigation={navigation} />

      <Image
        source={require('../assets/Images/issuedetail.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <View style={styles.categoryContainer}>
          <View style={styles.line}></View>
          <Text style={styles.categoryText}>{category}</Text>
          <View style={styles.line}></View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{description}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date to avail service:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{location}</Text>
        </View>

        <View style={styles.imagePreviewContainer}>
          <Image
            source={image}
            style={styles.attachmentImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{status}</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '60%',
    borderRadius: 10,
    padding: 25,
    alignItems: 'flex-start',
    elevation: 3,
    position: 'absolute',
    bottom: 0,
  },
  categoryContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  line: {
    width: '20%',
    height: 3,
    backgroundColor: '#097969	rgb(9, 121, 105)',
    marginHorizontal: 10,
  },
  categoryText: {
    color: '#E3963E	rgb(227, 150, 62)E',
    fontWeight: 'bold',
    fontSize: 28,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 18,
    marginBottom: 4,
    width: '40%',
  },
  value: {
    fontSize: 15,
    color: '#333',
    width: '60%',
  },
  imagePreviewContainer: {
    width: '100%',
    height: 150,
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  attachmentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
