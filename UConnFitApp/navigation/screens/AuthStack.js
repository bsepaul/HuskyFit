import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import LogIn from '../screens/LogIn';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
       <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding" component = {OnboardingScreen} />
            <Stack.Screen name="Login" component = {LogIn} />
            <Stack.Screen name="Register" component = {Register} />
        </Stack.Navigator>
    );

};
export default AuthStack;
