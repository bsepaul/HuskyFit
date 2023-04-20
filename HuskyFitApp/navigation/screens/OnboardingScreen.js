import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import CustomButtonArrow from '../../assets/Components/CustomButtonArrow';

const OnboardingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', }}>
            <CustomButtonArrow label={'Let\'s Begin'} arrow={"right"} large={true} onPress={() => navigation.navigate('Login')} />
            <View style={{height:30}} />
        </SafeAreaView>
    );
};
export default OnboardingScreen;
