import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import PostList from '../../components/postList';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageSource = require('../../assets/icon.png'); 
  const coverImageSource = require('../../assets/logo.png'); 
  const user = FIREBASE_AUTH.currentUser;
  const schoolIcon = require("../../assets/icons/school.png");

  const calculateAge = (birthday) => {
    if (!birthday) return null;
    const [month, day, year] = birthday.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

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

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const age = calculateAge(userData?.birthday);

  return (
    <SafeAreaView style={styles.container}>
      {user && userData && (
        <>
          <View style={styles.header}>
            {userData.username && <Text style={styles.username}>{userData.username}</Text>}
          </View>

          <View style={styles.coverContainer}>
            <Image source={coverImageSource} style={styles.coverImage} />

            <View style={styles.profileImageContainer}>
              <Image source={imageSource} style={styles.profileImage} />
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{userData.firstName}{" "}{userData.lastName}{", "}{age}</Text>
            </View>
            <View style={styles.schoolContainer}>
              {userData.accountType === 'student' ? (
                <>
                  <Image source={schoolIcon} resizeMode="contain" style={{ width: 20, height: 20 }} />
                  <Text style={styles.schoolText}>{userData.educationInstitution}</Text>
                </>
              ) : null}
            </View>
          </View>

          {/* Wrap PostList in ScrollView to allow scrolling */}
          <View style={{width: "100%", marginTop: 120}}>          
          <ScrollView contentContainerStyle={styles.postListContainer}>
            <PostList />
          </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  coverContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    backgroundColor: "#FF9900",
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: -40,
    left: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  nameContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  nameText: {
    fontFamily: 'InriaSans-Bold',
    fontWeight: "900",
    fontSize: 24,
  },
  schoolText: {
    fontFamily: 'InriaSans-Bold',
    fontWeight: "400",
    fontSize: 16,
    paddingHorizontal: 5,
  },
  schoolContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 4,
  },
  postListContainer: {
    flexGrow: 1, // Ensures content can grow
    width: '100%',
    paddingHorizontal: 20, // Adjust as needed
    paddingBottom: 20, // Add some padding to the bottom
  },
});