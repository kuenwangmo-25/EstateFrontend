import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../Shared/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function IssueDetailScreen({ route, navigation }) {
  const { issue } = route.params || {};
  const category = issue?.category || 'Plumbing';
  const description = issue?.description || 'Water leakage detected in the ceiling of the room.';
  const date = issue?.date || '20/05/2025';
  const location = issue?.location || 'Block P';
  const status = issue?.status || 'Pending';
  const image = issue?.image || require('../assets/Images/leakage.png');

  return (
    <ScrollView contentContainerStyle={styles.screen}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: hp(3),
  },
  image: {
    width: '100%',
    height: hp(40), 
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
    color: '#E3963E',
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
