import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';

const Pay = () => {
  const [money, setMoney] = useState('');

  const validateAmount = (value) => {
    const regex = /^[0-9]*$/; // Only digits
    return regex.test(value);
  };

  const handleTextChange = (value) => {
    if (validateAmount(value)) {
      setMoney(value);
    } else {
      Alert.alert('Invalid input', 'Please enter a valid amount (numbers only).');
    }
  };

  const payUser = () => {
    if (money) {
      Alert.alert(`Sent ${money}.00 RON`);
    }
  };

  return (
    <View style={{ paddingHorizontal: 30, paddingVertical: 300 }}>
      <FormField 
        title="Amount to send:"
        type="cell"
        value={money}
        handleTextChange={handleTextChange}
      />
      <CustomButton 
        title="Pay" 
        disabled={!money} 
        onPress={payUser} 
      /> 
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({});