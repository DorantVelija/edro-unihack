import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const ToggleSwitch = (label) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sponsored post? </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default ToggleSwitch;