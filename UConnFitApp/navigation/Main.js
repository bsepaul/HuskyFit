import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DineScreen from './screens/DineScreen';
import RecScreen from './screens/RecScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
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
            <Tab.Screen name = "Rec" component={RecScreen} options={{
                tabBarIcon: ({focused}) => (
                    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', top: 18}}>
                        <Image
                            source={require('../assets/icons/rec.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#0D223F' : '#748c94'
                            }}
                        />
                        <Text style={{
                            color: focused ? '#0D223F' : '#748c94', 
                            fontSize: 11}}>
                            REC
                        </Text>
                    </SafeAreaView>
                )
            }}/>
            <Tab.Screen name = "Home" component={HomeScreen}options={{
                tabBarIcon: ({focused}) => (
                    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', top: 18}}>
                        <Image
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#0D223F' : '#748c94'
                            }}
                        />
                        <Text style={{
                            color: focused ? '#0D223F' : '#748c94', 
                            fontSize: 11}}>
                            HOME
                        </Text>
                    </SafeAreaView>
                )
            }}/>
            <Tab.Screen name = "Dine" component={DineScreen}options={{
                tabBarIcon: ({focused}) => (
                    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center', top: 18}}>
                        <Image
                            source={require('../assets/icons/dine.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#0D223F' : '#748c94'
                            }}
                        />
                        <Text style={{
                            color: focused ? '#0D223F' : '#748c94', 
                            fontSize: 11}}>
                            DINE
                        </Text>
                    </SafeAreaView>
                )
            }}/>
        </Tab.Navigator>
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: '#DEDEDE',
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