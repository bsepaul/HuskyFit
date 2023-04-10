import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import Login from '../screens/LogIn';
import Register from '../screens/Register';
import RegisterSurvey from './RegisterSurvey';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
       <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding" component = {OnboardingScreen} />
            <Stack.Screen name="Login" component = {Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RegisterSurvey" component={RegisterSurvey} />
        </Stack.Navigator>
    );

};
export default AuthStack;
