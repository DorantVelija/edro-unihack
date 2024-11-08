import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const FormField = ({ title, value, placeholder, type, handleTextChange, otherStyles, ...props }) => {
  const isPhoneNumber = type === 'phone'; // Check if the type is 'phone'
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        secureTextEntry={type === 'password'}
        keyboardType={isPhoneNumber ? 'phone-pad' : (type === 'email' ? 'email-address' : 'default')}
        onChangeText={handleTextChange}
        style={styles.input}
        {...props}
      />
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
  input: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    width: '100%', 
  },
});

export default FormField;