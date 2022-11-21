import React from 'react'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native'
{/*import MaterialIcons from 'react-native-vector-icons/MaterialIcons';*/}
{/*import MaterialIcons from 'react-native-vector-icons/Ionicons'*/}
{/*import GooglePNG from './assets/icons/Google.png'; */}
import InputField from '../../assets/Components/InputField';
import CustomButton from '../../assets/Components/CustomButton';
import { myColors } from '../../assets/colors/ColorPalette';


const Register = ({ navigation }) => {
    const handleRegister = () => {
        navigation.navigate('Main')
        console.log("Email is: ")
    }
    return (
        <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <ScrollView showsVerticalScrollIndicator={false} style= {{paddingHorizontal:25}}>
                <Text
                    style={{
                        fontFamily: 'System',
                        fontSize: 28, 
                        fontWeight: '500',
                        color: myColors.navy,
                        marginTop: 100,
                        marginBottom: 1
                    }}> 
                    Register
                </Text>
                <View
                    style={{
                        flexDirection:'row',
                        marginBottom:25, 
                        }}>
                </View>

                <InputField label ={'Full Name'} />
                <InputField label ={'Email Address'} keyboardType = 'email-address' />
                <InputField label ={'Password'} inputType = 'password' />
                <InputField label ={'Confirm Password'} inputType = 'password' />
                <InputField label ={'Date of Birth'} 
                                inputType = 'password' />

                <CustomButton label={'Register'} onPress={handleRegister} /> 

                <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 30}}>
                    <Text style={{ color:myColors.navy}}> Already Registered? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color:myColors.navy, fontWeight:'700'}}>  Login </Text>
                    </TouchableOpacity>
                </View>

                {/* <Text style = {{textAllign: 'center', color: '#666', marginbottom: 30 }}> 
                    Or, Register with ... 
                </Text>   */}

            </ScrollView>
        </SafeAreaView>
);
};

export default Register