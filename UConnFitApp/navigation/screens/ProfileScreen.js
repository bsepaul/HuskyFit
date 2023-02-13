import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import UserProfile from './UserProfile';
import Settings from './Settings'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component = {UserProfile} name = "UserProfile" options={{headerShown:false}}/>
        <Stack.Screen component = {Settings}  name = "Settings" options={{headerShown: false}} />
      </Stack.Navigator>
  )
};
export default ProfileScreen
