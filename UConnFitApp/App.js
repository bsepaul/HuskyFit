import React, {useState, useEffect} from 'react';
import AppNavigator from './Navigation/AppNavigator';
import {EventRegister} from "react-native-event-listeners";
import themeContext from './config/themeContext';
import theme from "./config/theme"
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";



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
      <AppNavigator/>
    </NavigationContainer>
    </themeContext.Provider>

  );
}