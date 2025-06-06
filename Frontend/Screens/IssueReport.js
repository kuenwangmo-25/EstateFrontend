import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  Image, StyleSheet, Modal, FlatList,
  KeyboardAvoidingView, Platform, ActivityIndicator
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import Header from '../Shared/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from '../assets/common/baseUrl';

const IssueReport = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${baseURL}/getallcategories`);
        const formattedItems = res.data.data.map((cat) => ({
          label: cat.name,
          value: cat._id,
        }));
        setItems(formattedItems);
      } catch (err) {
        console.error("Failed to load categories:", err.message);
      }
    };
    fetchCategories();
  }, []);

  const pickFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 100} }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImage(manipulatedImage.uri);
    }
    setImagePickerVisible(false);
  };

  const pickFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const manipulatedImage = await ImageManipulator(
        result.assets[0].uri,
        [{ resize: { width: 100, height: 100 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImage(manipulatedImage.uri);
    }
    setImagePickerVisible(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("jwt");
      if (!token) {
        alert("You are not authenticated.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("location", location);
      formData.append("contactNo", contact);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("dateAvail", date.toISOString());

      if (image) {
        const fileName = image.split('/').pop();
        const fileType = fileName.split('.').pop();
        formData.append("photo", {
          uri: image,
          type: `image/${fileType}`,
          name: fileName,
        });
      }

      const response = await axios.post(`${baseURL}/issue`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log('About to show toast');

        Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Issue reported successfully!',
              });  
        navigation.goBack();
      } else {
       Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: 'Something went wrong.',
      });
      }
    } catch (err) {
      console.error(err);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to submit issue.',
          });    } finally {
            
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
    }
  };

  const handleDonePress = () => {
    setShowCalendarModal(false);
  };

  const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={hp('10%')}
    >
      <Header navigation={navigation} />

      <TouchableOpacity
        style={[styles.issueListButton, { zIndex: 10 }]} // Make sure the button is above other elements
        onPress={() => navigation.navigate('IssueList')}
      >
        <Icon name="exclamation-circle" size={25} color="#097969" />
        <Text style={styles.issueListText}>IssueList</Text>
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        data={[1]}
        renderItem={() => (
          <>
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
                <TouchableOpacity
                  onPress={() => {
                    Platform.OS === 'ios' ? setShowCalendarModal(true) : setShowDatePicker(true);
                  }}
                  style={styles.dateBox}
                >
                  <Text style={styles.dateTextDisplay}>{formattedDate}</Text>
                  <Icon name="calendar" size={20} color="#7ac943" />
                </TouchableOpacity>
              </View>

              {Platform.OS === 'android' && showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="calendar"
                  onChange={handleDateChange}
                />
              )}

              <TextInput
                placeholder="Description"
                multiline
                numberOfLines={6}
                style={[styles.input, { height: hp('8%') }]}
                value={description}
                onChangeText={setDescription}
              />

              <Button
                icon="camera"
                mode="outlined"
                onPress={() => setImagePickerVisible(true)}
                style={styles.uploadImageButton}
                disabled={loading}
              >
                Upload Image
              </Button>

              {image && <Image source={{ uri: image }} style={styles.image} />}

              {loading ? (
                <ActivityIndicator size="large" color="#097969" />
              ) : (
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.submitButton}
                >
                  Submit
                </Button>
              )}
            </View>

            {/* Calendar Modal */}
            <Modal
              visible={showCalendarModal}
              transparent
              animationType="slide"
              onRequestClose={() => setShowCalendarModal(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.calendarModalContainer}>
                  <View style={styles.calendarHeader}>
                    <Text style={styles.calendarHeaderText}>
                      {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
                    </Text>
                    <TouchableOpacity onPress={handleDonePress} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="inline"
                    onChange={handleDateChange}
                    style={styles.iosDatePicker}
                    themeVariant="light"
                    textColor="#000000"
                    accentColor="#7ac943"
                  />
                </View>
              </View>
            </Modal>

            {/* Image Picker Modal */}
            <Modal
              visible={imagePickerVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setImagePickerVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Choose Image Source</Text>
                  <TouchableOpacity style={styles.modalButton} onPress={pickFromCamera}>
                    <Text style={styles.modalButtonText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={pickFromGallery}>
                    <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={() => setImagePickerVisible(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        )}
        keyExtractor={(item) => item.toString()}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  borderedContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp('5%'),
    backgroundColor: '#FFFFFF',
    minHeight: hp('100%'),
  },
  scrollContainer: {
    flexGrow: 1,
    padding: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('5%'),
  },
  issueHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  line: {
    width: '20%',
    height: 3,
    backgroundColor: '#097969',
    marginHorizontal: wp('2%'),
  },
  header: {
    fontSize: wp('5.5%'),
    fontWeight: "bold",
    textAlign: "center",
    color: "#E3963E",
    marginHorizontal: wp('2%'),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: wp('3.5%'),
    borderRadius: 8,
    marginBottom: hp('2%'),
    backgroundColor: "#fff",
    color: "#333",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: hp('2%'),
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp('2%'),
  },
  dateText: {
    fontSize: wp('4%'),
    color: "#333",
    flex: 1,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: wp('3.5%'),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: wp('40%'),
    marginLeft: wp('2%'),
  },
  dateTextDisplay: {
    fontSize: wp('3.5%'),
    color: "#333",
    marginRight: wp('2%'),
  },
  image: {
    marginVertical: hp('1.5%'),
    alignSelf: "center",
    width: wp('20%'),
    height: wp('20%'),
  },
 uploadImageButton: {
  marginTop: hp('1%'),
  paddingVertical: hp('1%'),
  width: wp('40%'),
  alignSelf: 'flex-start',
  borderRadius: 8, 
},

  submitButton: {
    backgroundColor: '#E3963E',
    padding: hp('1%'),
    borderRadius: 8,
    alignItems: "center",
    width: wp('50%'),
    alignSelf: "center",
    marginTop: hp('4%'),
  },
  img: {
    width: wp('90%'),
    height: hp('20%'),
    resizeMode: 'contain',
    marginTop: hp('5%'),
    marginBottom: hp('2.5%'),
    alignSelf: 'center',
  },
  issueListButton: {
    position: 'absolute',
    top: hp('6%'),
    right: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('1%'),
  },
  issueListText: {
    marginLeft: wp('2%'),
    fontSize: wp('5%'),
    color: '#097969',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarModalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    maxHeight: '70%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  calendarHeaderText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  iosDatePicker: {
    width: '100%',
    backgroundColor: 'white',
    height: 330,
  },
  modalContainer: {
    width: wp('80%'),
    padding: wp('5%'),
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingBottom:40,
    alignItems: 'center',

  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    width: '100%',
    padding: 12,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#E3963E',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default IssueReport;