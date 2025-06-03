import React, { useState ,useEffect} from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  Image, StyleSheet, Modal, FlatList,
  KeyboardAvoidingView, Platform, Dimensions,ActivityIndicator
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker"; 
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from '../Shared/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from '../assets/common/baseUrl';



const IssueReport = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [contactValid, setContactValid] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState(null);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);

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

  const [locationError, setLocationError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  

  const validateContact = (text) => {
    if (text.length > 8) return;
    const regex = /^(17|77)\d{6}$/;
    setContactValid(regex.test(text));
    setContact(text);
  };

  const pickImage = async (fromCamera) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission is required!");
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: false, quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: false, quality: 1 });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      Image.getSize(uri, (width, height) => {
        const screenWidth = Dimensions.get('window').width - wp('10%');
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setImageDimensions({ width: screenWidth, height: imageHeight });
        setImage(uri);
      });
    }
    setImagePickerVisible(false);
  };

 
  const handleSubmit = async () => {
    setLocationError(false);
    setCategoryError(false);
    setDescriptionError(false);

    let valid = true;

    if (location.trim() === "") {
      setLocationError(true);
      valid = false;
    }
    if (contact.trim() === "" || !contactValid) {
      valid = false;
    }
    if (!category) {
      setCategoryError(true);
      valid = false;
    }
    if (description.trim() === "") {
      setDescriptionError(true);
      valid = false;
    }

    if (!valid) return;

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
      });
    } finally {
      setLoading(false);
    }
  };  
  const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
    }
  };

  const handleDonePress = () => setShowCalendarModal(false);

  return (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={hp('10%')}
    >
      <Header navigation={navigation} />

      <FlatList
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        data={[1]}
        renderItem={() => (
          <View>
            <Image source={require('../assets/Images/Issue.png')} style={styles.img} />
            <View style={styles.borderedContainer}>
              <View style={styles.issueHeaderContainer}>
                <View style={styles.line} />
                <Text style={styles.header}>Issue Details</Text>
                <View style={styles.line} />
              </View>

              <TextInput 
                placeholder="Location" 
                style={[styles.input, locationError && styles.inputError]} 
                value={location} 
                onChangeText={(text) => {
                  setLocation(text);
                  if (locationError && text.trim() !== "") setLocationError(false);
                }} 
              />
              {locationError && (
                <Text style={styles.errorText}>Location is required</Text>
              )}

              <TextInput
                placeholder="Contact"
                style={[styles.input, { borderColor: contact === "" ? "#ccc" : contactValid ? "green" : "red" }]}
                value={contact}
                keyboardType="phone-pad"
                maxLength={8}
                onChangeText={validateContact}

              />
              {!contactValid && contact !== "" && (
                <Text style={styles.errorText}>
                  Contact must start with 17 or 77 and be 8 digits long
                </Text>
              )}

              <DropDownPicker
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setItems}
                placeholder="Category"
                style={[styles.dropdown, categoryError && styles.inputError]}
                dropDownContainerStyle={styles.dropdownContainer}
                onChangeValue={(value) => {
                  if (categoryError && value) setCategoryError(false);
                }}
              />
              {categoryError && (
                <Text style={styles.errorText}>Category is required</Text>
              )}

              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Date to avail our services:</Text>
                <TouchableOpacity
                  onPress={() => Platform.OS === 'ios' ? setShowCalendarModal(true) : setShowDatePicker(true)}
                  style={styles.dateBox}
                >
                  <Text style={styles.dateTextDisplay}>{formattedDate}</Text>
                  <Icon name="calendar" size={20} color="#E3963E" />
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
                style={[styles.input, { height: hp('8%') }, descriptionError && styles.inputError]}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (descriptionError && text.trim() !== "") setDescriptionError(false);
                }}
              />
              {descriptionError && (
                <Text style={styles.errorText}>Description is required</Text>
              )}

              <Button icon="camera" mode="outlined" onPress={() => setImagePickerVisible(true)} style={[styles.uploadImageButton, { TextColor: "#cc" },{borderColor: "#ccc",
}]}
  textColor="orange">
                Upload Image
              </Button>

              {image && imageDimensions && (
                <Image source={{ uri: image }} style={{ ...styles.image, ...imageDimensions }} resizeMode="contain" />
              )}

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

            {/* Modals */}
            <Modal visible={showCalendarModal} transparent animationType="slide" onRequestClose={() => setShowCalendarModal(false)}>
              <View style={styles.CalendermodalBackground}>
                <View style={styles.calendarModalContainer}>
                  <View style={styles.calendarHeader}>
                    <TouchableOpacity onPress={handleDonePress} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={date}
                    minimumDate={new Date()}
                    mode="date"
                    display="inline"
                    onChange={handleDateChange}
                    style={styles.iosDatePicker}
                  />
                </View>
              </View>
            </Modal>

            <Modal visible={imagePickerVisible} transparent animationType="slide" onRequestClose={() => setImagePickerVisible(false)}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Choose Image Source</Text>
                  <TouchableOpacity style={styles.modalButton} onPress={() => pickImage(true)}>
                    <Text style={styles.modalButtonText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={() => pickImage(false)}>
                    <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={() => setImagePickerVisible(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

          
          </View>
        )}
        keyExtractor={() => "key"}
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp('5%'),
    backgroundColor: '#FFFFFF',
    minHeight: hp('100%'),
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: wp('3%'),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('5%'),
  },
  issueHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    marginVertical: hp('2%'),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    width: '20%',
    // height: 3,
    // backgroundColor: '#097969',
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
    marginVertical: hp('1.5%'),
    fontSize: wp('4%'),
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: hp('1%'),
    marginLeft: wp('2%'),
    fontSize: wp('3.5%'),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: hp('2%'),
    marginVertical: hp('1.5%'),
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp('3%'),
    marginVertical: hp('1.5%'),
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
    color: "black",
    marginRight: wp('2%'),
  },
  image: {
    marginTop: hp('2%'),
    alignSelf: "center",
    borderRadius: 10,
  },
  uploadImageButton: {
    marginTop: hp('1%'),
    width: wp('40%'),
    alignSelf: 'flex-start',
    borderRadius: 8,
    textColor:"#E3963E",
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
  modalBackground: {
    flex: 1,
    padding:35,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  CalendermodalBackground:{
    flex: 1,
    padding:15,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  calendarModalContainer: {
    backgroundColor: '#E3963E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  calendarHeaderText: {
    fontSize: wp('5%'),
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#E3963E",
    borderRadius: 5,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp('4%'),
  },
  iosDatePicker: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: wp('80%'),
    padding: wp('10%'),
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: "bold",
    marginBottom: hp('2%'),
  },
  modalButton: {
    backgroundColor: "#E3963E",
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 6,
    marginVertical: hp('0.8%'),
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: wp('4%'),
    fontWeight: "600",
  },
  successModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  successModalContainer: {
    width: wp('80%'),
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: wp('5%'),
    alignItems: "center",
  },
  successText: {
    fontSize: wp('4.5%'),
    marginBottom: hp('2%'),
    textAlign: "center",
  },
  successButton: {
    backgroundColor: "#7ac943",
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 8,
  },
  successButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp('4.5%'),
  },
});


export default IssueReport;
