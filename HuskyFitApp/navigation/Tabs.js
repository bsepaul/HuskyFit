import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DineScreen from './screens/DineScreen';
import RecScreen from './screens/RecScreen';
import ProfileScreen from './screens/ProfileScreen';
import { myColors } from '../assets/styles/ColorPalette';

const windowWidth = Dimensions.get('window').width;
const iPad = windowWidth > 500;

const Tab = createBottomTabNavigator();

const Tabs = () => {

    // Get token from route
    const route = useRoute();
    const token = route.params.token;

    return(
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    width: iPad ? 650 : windowWidth*0.9,
                    position: 'absolute',
                    bottom: 25,
                    left: iPad ? (windowWidth - 650)/2 : windowWidth * 0.05,
                    right: iPad ? (windowWidth - 650)/2 : windowWidth * 0.05,
                    elevation: 5, 
                    backgroundColor: myColors.white, 
                    borderRadius: 45, 
                    height: 90,
                    ...style.shadow
                }
            }} >
            <Tab.Screen
                name="Rec"
                component={RecScreen}
                initialParams={{token: token}}
                options={{
                    tabBarIcon: ({focused}) => (
                        <SafeAreaView style={{flex:1, alignItems: 'center', justifyContent: 'center', top: iPad ? 5 : 18}}>
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
                }}
            />
            
            <Tab.Screen
                name="Dine"
                component={DineScreen}
                initialParams={{token: token}}
                options={{
                    tabBarIcon: ({focused}) => (
                        <SafeAreaView style={{flex:1, alignItems: 'center', justifyContent: 'center', top: iPad ? 5 : 18}}>
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
                }}
            />
            
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                initialParams={{token: token}}
                options={{
                    tabBarIcon: ({focused}) => (
                        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', top: iPad ? 5 : 18}}>
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
                }}
            />
            
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={{token: token}}
                options={{
                    tabBarIcon: ({focused}) => (
                        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', top: iPad ? 5 : 18}}>
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
                }}
            />
            
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