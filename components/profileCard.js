import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileCard = ({ pfpUri, fullname, schoolName, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: pfpUri }} style={styles.profileImage} />

      {/* Full Name */}
      <Text style={styles.fullname}>{fullname}</Text>

      {/* School Name */}
      <View style={styles.schoolRow}>
        <Text style={styles.schoolIcon}>🏫</Text>
        <Text style={styles.schoolName}>{schoolName}</Text>
      </View>

      {/* View Profile Button */}
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.viewProfile}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    width: 340,
    margin: 10,
  },
  profileImage: {
    width: "100%",
    height: 500,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  fullname: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  schoolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  schoolIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  viewProfile: {
    fontSize: 18,
    color: '#F78C25',
    fontWeight: 'bold',
  },
});

export default ProfileCard;
