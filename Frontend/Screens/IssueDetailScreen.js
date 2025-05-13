import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../Shared/Header';

export default function IssueDetailScreen({ route, navigation }) {
  const { issue } = route.params || {};
  const category = issue?.category || 'Plumbing';

  return (
    <View style={styles.screen}>
      <Header 
        navigation={navigation}  // Pass navigation prop for the back button functionality
      />
      
      <Image
        source={require('../assets/Images/issuedetail.png')} // replace with your illustration path
        style={styles.image}
        resizeMode="contain"
      />

      {/* Content Box */}
      <View style={styles.card}>
        {/* Category Text Container with lines */}
        <View style={styles.categoryContainer}>
          <View style={styles.line}></View>
          <Text style={styles.categoryText}>{category}</Text>
          <View style={styles.line}></View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>Leakage</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date to avail service:</Text>
          <Text style={styles.value}>20/05/2025</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>Block Dragon</Text>
        </View>

        {/* Container for Location and Attachment Box to control spacing */}
        <View style={styles.locationAttachmentContainer}>
          {/* Attachment Box Positioned Here */}
          <View style={styles.attachmentBox}>
            <Icon name="file-image-o" size={18} color="#28a745" />
            <Text style={styles.attachmentText}> leakage.png</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>seen</Text>
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
  topBar: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,  // Increased height for the image
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',  // White background for the card
    width: '100%',  // Full width
    height: "60%",  // Increased height of the card
    borderRadius: 10,  // Rounded corners
    padding: 25,  // Increased padding
    alignItems: "flex-start",  // Centered content
    elevation: 3,  // Shadow for elevation
    position: 'absolute',  // Position the card at the bottom
    bottom: 0,  // Align it at the bottom of the screen
  },

  // Category Text Container with lines
  categoryContainer: {
    width: '100%',  // Ensure it takes the full width
    flexDirection: 'row',  // Arrange the text and lines in a row
    alignItems: 'center',  // Vertically center the text and lines
    justifyContent: 'center',  // Center the content horizontally
    marginBottom: 16,  // Optional: Adds space below the category text
  },
  line: {
    width: '20%',  // Shortened line width (adjusted)
    height: 1,  // Thickness of the line
    backgroundColor: '#579A4E',  // Color of the line
    marginHorizontal: 10,  // Space between the line and the category text
  },
  categoryText: {
    color: '#E67E00',
    fontWeight: 'bold',  // Bold text
    fontSize: 28,  // Adjusted size for a bolder effect
  },
  detailRow: {
    flexDirection: 'row',  // Ensure label and value are in the same row
    justifyContent: 'space-between',  // Space between label and value
    marginBottom: 12,
    alignItems: 'center',  // Align items vertically in the center
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 18,
    marginBottom: 4,
    width: '40%',  // Ensuring that label and value stay aligned
  },
  value: {
    fontSize: 15,
    color: '#333',
    width: '60%',  // Taking remaining width for the value
  },
  locationAttachmentContainer: {
    flexDirection: 'row',  // Align the Location and Attachment Box horizontally
    justifyContent: 'space-between',  // Space them equally
    alignItems: 'center',  // Center the items vertically
    marginBottom: 12,  // Equal space between the elements
  },
  attachmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,  // Adjust space between the attachment box and the other rows
    backgroundColor: '#f1f1f1',  // Light background for the box
    padding: 8,  // Padding around the icon and text
    borderRadius: 5,  // Rounded corners for the box
    width: '40%',  // Adjust width of the box
    alignSelf: 'center',  // Center the attachment box between location and status
  },
  attachmentText: {
    fontSize: 15,
    color: '#28a745',
    marginLeft: 8,  // Space between icon and text
    alignSelf: 'center',
  },
});
