import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, buttonStyle, textStyle, disabled }) => {
  return (
    <TouchableOpacity 
      onPress={!disabled ? onPress : null} 
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold'
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  disabledText: {
    color: '#7d7d7d', 
  },
});

export default CustomButton;