// components/AccountTypeDropdown.js

import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';

const AccountTypeDropdown = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Student', value: 'student' },
    { label: 'Teacher', value: 'teacher' },
    { label: 'Sponsor', value: 'sponsor' },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Select account type"
      style={[
        styles.dropdown,
        open ? styles.dropdownOpen : styles.dropdownClosed
      ]}
      dropDownContainerStyle={styles.dropdownContainer}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "#FFE8CD",
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
  },
  dropdownOpen: {
    marginBottom: 110,
    borderRadius: 10,
  },
  dropdownClosed: {
    marginBottom: 4,
  },
  dropdownContainer: {
    height: 110,
    backgroundColor: "#FFE8CD",
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
  },
});

export default AccountTypeDropdown;