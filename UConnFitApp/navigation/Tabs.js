import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DineScreen from './screens/DineScreen';
import RecScreen from './screens/RecScreen';
import ProfileScreen from './screens/ProfileScreen';
import { myColors } from '../assets/colors/ColorPalette';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20, 
                    right: 20, 
                    elevation: 5, 
                    backgroundColor: myColors.white, 
                    borderRadius: 40, 
                    height: 90,
                    ...style.shadow
                }
            }} >
            <Tab.Screen name = "Rec" component={RecScreen} options={{
                tabBarIcon: ({focused}) => (
                    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', top: 18}}>
                        <Image
                            source={require('../assets/icons/rec.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? myColors.navy : myColors.grey
                            }}
                        />
                        <Text style={{
                            color: focused ? myColors.navy : myColors.grey, 
                            fontSize: 11}}>
                            Rec
                        </Text>
                    </SafeAreaView>
                )
            }} />
            
            <Tab.Screen name = "Dine" component={DineScreen}options={{
                tabBarIcon: ({focused}) => (
                    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', top: 18}}>
                        <Image
                            source={require('../assets/icons/dine.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? myColors.navy : myColors.grey
                            }}
                        />
                        <Text style={{
                            color: focused ? myColors.navy : myColors.grey, 
                            fontSize: 11}}>
                            Dine
                        </Text>
                    </SafeAreaView>
                )
            }} />
            
            <Tab.Screen name = "Home" component={HomeScreen}options={{
                tabBarIcon: ({focused}) => (
                    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', top: 18}}>
                        <Image
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? myColors.navy : myColors.grey
                            }}
                        />
                        <Text style={{
                            color: focused ? myColors.navy : myColors.grey, 
                            fontSize: 11}}>
                            Home
                        </Text>
                    </SafeAreaView>
                )
            }} />
            
            <Tab.Screen name = "Profile" component={ProfileScreen}options={{
                tabBarIcon: ({focused}) => (
                    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', top: 18}}>
                        <Image
                            source={require('../assets/icons/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? myColors.navy : myColors.grey
                            }}
                        />
                        <Text style={{
                            color: focused ? myColors.navy : myColors.grey, 
                            fontSize: 11}}>
                            Profile
                        </Text>
                    </SafeAreaView>
                )
            }} />
            
        </Tab.Navigator>
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: myColors.grey,
        shadowOffset: { 
            width: 0, 
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
});

export default Tabs;