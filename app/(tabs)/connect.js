import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const connect = () => {
  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require("../../assets/icons/teacherDashboard.png")}
        style={{marginBottom: 30}}
      />
    </SafeAreaView>
  )
}

export default connect

const styles = StyleSheet.create({})