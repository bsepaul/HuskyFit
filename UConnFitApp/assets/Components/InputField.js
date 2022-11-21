import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import React, {useState} from 'react'
import { myColors } from '../colors/ColorPalette';

export default function InputField({ label, icon, inputType, keyboardType, fieldButtonLabel, fieldButtonFunction }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    handleEmail = (text) => {
        setEmail(text)
    }
    handlePassword = (text) => {
        setPassword(text)
    }
    return (
        <View style={{
            flexDirection:'row', 
            borderBottomColor: myColors.grey, 
            borderBottomWidth:1, 
            paddingBottom: 12, 
            marginBottom:25, 
            }}>
        
            {icon}
            {inputType =='password' ? (
                <TextInput
                    placeholder = {label}
                    keyboardType ={keyboardType}
                    style={{flex: 1, paddingVertical: 0}}
                    secureTextEntry={true}
                    onChangeText = {handlePassword}
                />
            ) : (
                <TextInput 
                    placeholder = {label}
                    keyboardType={keyboardType}
                    secureTextEntry={false}
                    onChangeText = {handleEmail}
                />
            )}

            <TouchableOpacity onPress={({fieldButtonFunction}) => {}}>
                <Text style = {{color: myColors.navy, fontWeight: '700'}}> {fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
    )
}