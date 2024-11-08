import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// Conditional imports based on the platform or Expo
let ImagePicker;
if (Platform.OS === 'ios' || Platform.OS === 'android') {
  // For non-Expo React Native projects
  ImagePicker = require('react-native-image-picker');
} else {
  // For Expo projects
  ImagePicker = require('expo-image-picker');
}

import TextareaField from '../../components/TextAreaField';
import ToggleSwitch from '../../components/ToggleSwitch';
import CustomButton from '../../components/customButton';

const Create = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const createPost = () => {
    Alert.alert("Posted!")
  }
  const [form, setForm] = useState({
    caption: "",
    image: "",
    sponsor: ""
  });
  const user = FIREBASE_AUTH.currentUser;

  const fetchUserData = async () => {
    if (user) {
      const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log('No such document!');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleImageUpload = async () => {
    try {
      // Using Expo Image Picker
      if (Platform.OS === 'web' || Platform.OS === 'ios' || Platform.OS === 'android') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          setForm({ ...form, image: result.assets[0].uri });
        }
      }
      // For Non-Expo (bare React Native projects)
      else {
        const options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const uri = response.assets[0].uri;
            setForm({ ...form, image: uri });
          }
        });
      }
    } catch (error) {
      console.log('Error picking image: ', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
        {userData?.username ? (
          <>
            <View style={styles.header}>
              <Text style={styles.username}>New Post</Text>
            </View>

            <View style={styles.nameContainer}>
              <TextareaField
                title="Caption"
                value={form.caption}
                placeholder="Type your message here..."
                handleTextChange={(e) => setForm({ ...form, caption: e })}
                otherStyles={styles.textareaContainer}
              />

              {/* Image Upload Section */}
              <TouchableOpacity style={styles.imageUploadContainer} onPress={handleImageUpload}>
                <Image source={require('../../assets/icons/upload.png')} style={styles.icon} />
                <Text style={styles.imageUploadText}>Select an image...</Text>
              </TouchableOpacity>

              {/* Display selected image */}
              {form.image ? (
                <Image source={{ uri: form.image }} style={styles.imagePreview} />
              ) : null}

              {/* Toggle switch */}
              <ToggleSwitch />
            </View>
            <View style={{width: 390, paddingTop: 60}}>
                <CustomButton title="Post" onPress={() => { createPost() }} />     
            </View>
            

          </>
        ) : (
          <Text style={styles.username}>User not found</Text>
        )}
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  textareaContainer: {
    marginBottom: 20,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imageUploadText: {
    color: '#a9a9a9',
    fontSize: 16,
    marginLeft: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    resizeMode: 'cover',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});