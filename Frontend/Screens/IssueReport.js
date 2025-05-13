import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  Image, StyleSheet, Modal
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-date-picker";
import * as ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from '../Shared/Header';

const IssueReport = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([
    { label: "Electrical", value: "Electrical" },
    { label: "Plumbing", value: "Plumbing" },
    { label: "Carpentry", value: "Carpentry" },
    { label: "Cleaning", value: "Cleaning" },
  ]);

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, async (response) => {
      if (response.assets) {
        const imageUri = response.assets[0].uri;
        try {
          const resizedImage = await ImageResizer.createResizedImage(imageUri, 100, 100, 'JPEG', 80);
          setImage(resizedImage.uri);
        } catch (error) {
          console.error("Image resizing failed:", error);
        }
      }
    });
  };

  const handleSubmit = () => {
    console.log("Issue Submitted:", { location, contact, category, date, description, image });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <TouchableOpacity
        style={styles.issueListButton}
        onPress={() => navigation.navigate('IssueList')}
      >
        <Icon name="exclamation-circle" size={20} color="#579A4E" />
        <Text style={styles.issueListText}>Issue List</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/Images/Issue.png')}
        style={styles.img}
      />

      <View style={styles.borderedContainer}>
        <View style={styles.issueHeaderContainer}>
          <View style={styles.line} />
          <Text style={styles.header}>Issue Details</Text>
          <View style={styles.line} />
        </View>

        <TextInput
          placeholder="Location"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          placeholder="Contact"
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />

        <DropDownPicker
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          placeholder="Category"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Date to avail our services:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Icon name="calendar" size={25} color="#7ac943" />
          </TouchableOpacity>
        </View>
        <Text style={{ marginBottom: 10, color: "#333" }}>{date.toDateString()}</Text>

        <Modal visible={showDatePicker} transparent animationType="slide">
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerInner}>
              <DatePicker
                date={date}
                mode="date"
                onDateChange={setDate}
              />
              <Button mode="contained" onPress={() => setShowDatePicker(false)} style={styles.closeBtn}>
                Done
              </Button>
            </View>
          </View>
        </Modal>

        <TextInput
          placeholder="Description"
          multiline
          numberOfLines={4}
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <Button
          icon="camera"
          mode="outlined"
          onPress={handleImagePick}
          style={styles.uploadImageButton}
        >
          Upload Image
        </Button>
        {image && <Image source={{ uri: image }} style={styles.image} />}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  borderedContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  issueHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    width: '20%',  // Set the width of the line to be shorter
    height: 2,  // Thickness of the line
    backgroundColor: '#579A4E',  // Line color
    marginHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E67E00",
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#333",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "flex-start",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: "#333",
  },
  image: {
    marginVertical: 10,
    alignSelf: "center",
    width: 60,
    height: 60,
  },
  uploadImageButton: {
    marginTop: 10,
    paddingVertical: 5,
    width: '40%',
    alignSelf: 'flex-start',
  },
  submitButton: {
    backgroundColor: '#E67E00',
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginTop: 10,
  },
  img: {
    width: 350,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
    alignItems: 'center',
  },
  pickerWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerInner: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: '#579A4E',
  },
  issueListButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  issueListText: {
    marginLeft: 5,
    fontSize: 20,
    color: '#579A4E',
  },
});

export default IssueReport;
