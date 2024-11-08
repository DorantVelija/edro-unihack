import { View, Text } from 'react-native'
import React from 'react'
import * as Font from 'expo-font'
import { Stack } from 'expo-router'

const _layout = () => {
  const [fontsLoaded] = Font.useFonts({
    'InriaSans-Regular': require('../assets/fonts/InriaSans-Regular.ttf'), 
    'InriaSans-Bold': require('../assets/fonts/InriaSans-Bold.ttf'),
  })
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown: false, gestureEnabled: false,}} />
    </Stack>
  )
}

export default _layout