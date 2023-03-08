import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';

const OnboardingScreen = ({navigation}) => {
    return (
        <SafeAreaView
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: myColors.offwhite,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        </View>
        <TouchableOpacity
        style={{backgroundColor: myColors.navy,
        padding: 20,
        width: '90%',
        borderRadius: 10,
        marginBottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }}
    onPress={() => navigation.navigate('Login')}>
    <Text
        style={{
            color: myColors.offwhite,
            fontSize: 18,
            textAllign: 'center',
            fontWeight: 'bold',
            fontFamily: 'System',
        }}>
          Let's Begin  
        </Text>
    </TouchableOpacity>
    </SafeAreaView>
    );
};
export default OnboardingScreen;
