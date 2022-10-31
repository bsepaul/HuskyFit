import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DineScreen from './screens/DineScreen';
import RecScreen from './screens/RecScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                // tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20, 
                    right: 20, 
                    elevation: 5, 
                    backgroundColor: '#ffffff', 
                    borderRadius: 40, 
                    height: 90,
                    ...style.shadow
                }
            }}
        >
            <Tab.Screen name = "Home" component={HomeScreen}/>
            <Tab.Screen name = "Dine" component={DineScreen}/>
            <Tab.Screen name = "Rec" component={RecScreen}/>
        </Tab.Navigator>
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: '#8A8A8A',
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