import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const TextareaField = ({ title, value, placeholder, handleTextChange, otherStyles, ...props }) => {
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.label}>{title}</Text>
      <View style={{width: 350}}>
        <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={handleTextChange}
            style={styles.textarea}
            multiline={true} // Enable multiline
            numberOfLines={4} // Adjust the number of visible lines
            {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
    fontFamily: 'InriaSans-Bold'
  },
  textarea: {
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    width: '100%', // Full width of the container
    height: 100, // Fixed height
    textAlignVertical: 'top', // Align text to the top
  },
});

export default TextareaField;