import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs, Redirect } from 'expo-router'

const TabIcon = ({ icon, color, name }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>  
                <Image 
                    source={icon}
                    resizeMode="contain"
                    tintColor={color}
                    style={{ width: 24, height: 24 }}  
                />
             {/*    <Text style={{ color: "#000", marginTop: 4 }}>{name}</Text>   */}
            </View>
        </View>
    )
}

const _layout = () => {
    return (
        <>
            <Tabs 
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FF9900",
                    tabBarInactiveTintColor: "#000",
                    tabBarStyle: {
                        height: 80,  
                        paddingTop: 10,
                    },
                }}
            >
                <Tabs.Screen 
                    name="home"
                    options={{
                        title: "home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={require('../../assets/icons/home.png')}
                                name="Home"
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="profile"
                    options={{
                        title: "profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={require('../../assets/icons/profile.png')}
                                name="Profile"
                                color={color}
                            />
                        ),
                    }}
                />
                
                <Tabs.Screen 
                    name="create"
                    options={{
                        title: "create",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={require('../../assets/icons/create.png')}
                                name="Create"
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="connect"
                    options={{
                        title: "connect",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={require('../../assets/icons/connect.png')}
                                name="Connect"
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="notifications"
                    options={{
                        title: "notifications",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={require('../../assets/icons/notifications.png')}
                                name="Notifications"
                                color={color}
                            />
                        ),
                    }}
                />
                
            </Tabs>
        </>
    )
}

export default _layout

const styles = StyleSheet.create({})