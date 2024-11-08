import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';

const Post = ({ imageUri, name, caption, date, sponsored }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Function to handle toggling the caption display
  const toggleCaption = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setIsExpanded(false);
  }, [])

  const router = useRouter;
  

  const displayedCaption = isExpanded || caption.length <= 20 
    ? caption 
    : caption.substring(0, 20) + '...';

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />

      <View style={{ alignItems: "flex-start", justifyContent: "space-between" }}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.row}>
        <Text style={styles.caption}>
          {displayedCaption}
          {!isExpanded && caption.length > 20 && (
            <TouchableOpacity onPress={() => toggleCaption()}>
              <Text style={styles.sponsoredText}>...</Text>
            </TouchableOpacity>
          )}
        </Text>

        {sponsored && (
            
                <Link style={styles.sponsoredText} href="/pay">Sponsor</Link>
        )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 0,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  date: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
  sponsoredText: {
    color: '#5EC3DB',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 5,
  },
  caption: {
    fontSize: 18,
    textAlign: 'left',
    marginTop: 10,
    width: "75%",
  },
});

export default Post;