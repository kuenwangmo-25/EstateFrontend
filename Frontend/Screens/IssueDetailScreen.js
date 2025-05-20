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
    flexGrow: 1,              // <-- Changed from flex: 1 to flexGrow: 1
    backgroundColor: '#F5F5F5',
    paddingBottom: hp(3),
    paddingTop: hp(2),        // optional padding for spacing at top
  },
  image: {
    width: '100%',
    height: hp(35), 
    marginBottom: hp(2), 
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(3),  
    borderRadius: 8,
    elevation: 3,  
    marginBottom: wp(1),
  },
  categoryContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(7), 
  },
  line: {
    width: '20%',
    height: 3,
    backgroundColor: '#097969',
    marginHorizontal: wp(2),
  },
  categoryText: {
    color: '#E3963E	rgb(227, 150, 62)E',
    fontWeight: 'bold',
    fontSize: wp(7),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2), 
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: wp(4.5), 
    marginBottom: hp(0.5),
    width: '40%',
  },
  value: {
    fontSize: wp(4),
    color: '#333',
    width: '60%',
  },
  imagePreviewContainer: {
    width: '100%',
    height: hp(20), 
    marginVertical: hp(2), 
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
