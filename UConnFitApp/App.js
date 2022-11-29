import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Main';
import OnboardingScreen from './navigation/screens/OnboardingScreen';
import Login from './navigation/screens/LogIn';
import Register from './navigation/screens/Register';

const Stack = createNativeStackNavigator(); 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component ={OnboardingScreen} name = "Begin" options={{headerShown:false}}/>
        <Stack.Screen component={Login} name="Login" options={{ headerShown: false }} />
        <Stack.Screen component={Register} name="Register" options={{headerShown: false}}/>
        <Stack.Screen component ={Tabs} name = "Main" options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
