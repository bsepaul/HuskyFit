// import React from 'react'
import React, { useState } from 'react'
import fetch from 'node-fetch'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native'
{/*import MaterialIcons from 'react-native-vector-icons/MaterialIcons';*/}
{/*import MaterialIcons from 'react-native-vector-icons/Ionicons'*/}
{/*import GooglePNG from './assets/icons/Google.png'; */}
import InputField from '../../assets/Components/InputField';
import CustomButton from '../../assets/Components/CustomButton';
import { myColors } from '../../assets/colors/ColorPalette';


const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dob, setDob] = useState('')

    const handleRegister = () => {
        (async () => {
            var raw = JSON.stringify({
                // "name": "hello world",
                // "email": "test6@test6.com",
                // "password": "Password!1",
                // "birthdate": "12-12-1971"
                "name": fullName,
                "email": email,
                "password": password,
                "birthdate": dob
              });


            var requestOptions = {
            method: 'POST',
            headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
                      "Content-Type": "application/json"},
            body: raw,
            redirect: 'follow'
            };


            fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/auth/signup", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        })()

        navigation.navigate('Main')
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
                <InputField label ={'Date of Birth'} inputType = 'date' />

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
