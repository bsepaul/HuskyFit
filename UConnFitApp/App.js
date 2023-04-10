import React, {useState, useEffect} from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Tabs';
import OnboardingScreen from './navigation/screens/OnboardingScreen';
import Login from './navigation/screens/LogIn';
import Register from './navigation/screens/Register';
import RegisterSurvey from './navigation/screens/RegisterSurvey';
import themeContext from './navigation/config/themeContext';
import theme from './navigation/config/theme';
import { EventRegister } from 'react-native-event-listeners';

const Stack = createNativeStackNavigator(); 
export default function App() {
    const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
    }

    );
    return () => {
      EventRegister.addEventListener(eventListener);
    };
  });
  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
    <NavigationContainer theme = {mode === true ? DarkTheme: DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen component = {OnboardingScreen} name = "Begin" options={{headerShown:false}}/>
        <Stack.Screen component = {Login}            name = "Login" options={{ headerShown: false }} />
        <Stack.Screen component = {Register}         name = "Register" options={{headerShown: false}}/>
        <Stack.Screen component = {RegisterSurvey}   name = "RegisterSurvey" options={{headerShown: false}}/>
        <Stack.Screen component = {Tabs}             name = "Tabs" options={{headerShown:false}}/>
      </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>

  )
}
