import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileCard from '../../components/profileCard';

const Home = () => {
  const users = [
    { pfpUri: "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwYm95fGVufDB8fDB8fHww", fullname: "Shawn Marius", schoolName: "School A" },
    { pfpUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjt_rgIyq-vlv7WKrzOuVmzZhW228wNjr4w&usqp=CAU", fullname: "Jordan Andreea", schoolName: "School B" },
    { pfpUri: "https://img.freepik.com/free-photo/girl-student-kid-smiling-silly-laughing-posing-delighted-cheering-turn-camera-playful-upbeat-expression_176420-44774.jpg", fullname: "Pop Ioana", schoolName: "School C" },
    { pfpUri: "https://www.kidsopia.com/wp-content/uploads/2019/12/Copil-nervos-poza-1.jpg", fullname: "Bob Brown", schoolName: "School D" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.trendingText}>Find people to sponsor...</Text>

      <ScrollView 
        horizontal 
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {users.map((user, index) => (
          <ProfileCard 
            key={index}
            pfpUri={user.pfpUri} 
            fullname={user.fullname} 
            schoolName={user.schoolName} 
            onPress={() => alert(`${user.fullname}'s profile pressed!`)} 
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  trendingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 20,
    marginLeft: 20,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    
  },
});
