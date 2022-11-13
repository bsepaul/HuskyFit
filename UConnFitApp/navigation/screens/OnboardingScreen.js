import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

{/*import MaterialIcons from 'react-native-vector-icons/MatterialIcons'; */}

const OnboardingScreen = ({navigation}) => {
    return (
        <SafeAreaView
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
        {/*<View style={{marginTop: 20}}>
            <Text
            style = {{ marginTop: 20}} >
                <Text 
                style={{
                    fontFamily: 'Inter-Bold',
                    fontWeight:'bold',
                    fontSize: 30,
                    color: '#20315f',
                }}>
                GAMEON
            </Text> 
            </View> */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        </View>
        <TouchableOpacity
        style={{backgroundColor: '#AD40AF',
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
            color: 'white',
            fontSize: 18,
            textAllign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
        }}>
          Let's Begin  
        </Text>
    </TouchableOpacity>
    </SafeAreaView>
    );
};
export default OnboardingScreen;