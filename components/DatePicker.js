import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ title, onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onDateChange(currentDate); 
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <Text style={{ fontSize: 16, marginBottom: 4, fontWeight: "600" }}>{title}</Text>

      {show && (
         <View style={styles.pickerContainer}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange} 
            style={styles.datePicker}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    fontFamily: 'InriaSans-Bold',
  },
  datePicker: {
    width: '100%',
    height: 45,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
  },
  dateText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  pickerContainer: {
    borderRadius: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    width: '43%', 
  }
});


export default DatePicker;