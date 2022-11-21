import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image} from 'react-native';
import CustomButton from '../../assets/Components/CustomButton';

import InputField from '../../assets/Components/InputField';
import { myColors } from '../../assets/colors/ColorPalette';

const Login = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <View style= {{paddingHorizontal:25}}>
                <Text style = {{fontFamily: 'System', fontSize:28, 
                    fontWeight: '500', color: myColors.navy, marginBottom:30}}> 
                    Login
                </Text>

                <InputField label ={'Email Address'} keyboardType = 'email-address' />
                <InputField label ={'Password'} inputType = 'password' 
                fieldButtonLabel = {'Forgot?'}
                fieldButtonFunction = {() => {}}
                />

                <CustomButton label={'Login'} onPress={() => { navigation.navigate('Main') }} />
                <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 30}}>
                    <Text style={{ color:myColors.navy}}> New to the App? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color:myColors.navy, fontWeight:'700'}}>  Register </Text>
                    </TouchableOpacity>
                </View>
{/* 
                <Text style = {{textAllign: 'center', color: myColors.darkGrey, marginbottom: 30 }}> 
                Or, Login with ... 
                </Text>
                <View>
                    <TouchableOpacity onPress={() => {}} 
                        style={{
                            borderColor: myColors.grey, 
                            borderWidth:2, 
                            borderRadius:10, 
                            paddingHorizontal:10, 
                            paddingVertical: 10,
                        }}> 
                        <Image
                            source={require('../../assets/icons/Google.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25
                            }} />
                    </TouchableOpacity>
                </View>  */}
            </View>
        </SafeAreaView>
    );
};

export default Login