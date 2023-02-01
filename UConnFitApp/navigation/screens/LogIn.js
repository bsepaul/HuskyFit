import { useNavigation } from '@react-navigation/native';
// import React from 'react'
import React, { useState } from 'react'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image} from 'react-native';
import CustomButton from '../../assets/Components/CustomButton';
import fetch from 'node-fetch'

import InputField from '../../assets/Components/InputField';
import { myColors } from '../../assets/colors/ColorPalette';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        (async () => {
            var raw = JSON.stringify({

                // "name": "hello world",
                // "email": "test6@test6.com",
                // "password": "Password!1",
                // "birthdate": "12-12-1971"
                "email": "test2@test2.com",
                "password": "Password!1",
                // "email": email,
                // "password": password,
              });


            var requestOptions = {
            method: 'POST',
            headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
                      "Content-Type": "application/json"},
            body: raw,
            redirect: 'follow'
            };
            fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/auth/login", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        })()
        navigation.navigate('Main')
    }
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

                <CustomButton label={'Login'} onPress = {handleLogin}/>
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
