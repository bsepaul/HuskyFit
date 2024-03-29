import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import React, {useState} from 'react'
import { myColors } from '../styles/ColorPalette';

export default function InputField({ label, icon, inputType, keyboardType, fieldButtonLabel, fieldButtonFunction }) {
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
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    style={{flex: 1, paddingVertical: 0}}
                    secureTextEntry={true}
                />
            ) : (
                <TextInput 
                    placeholder = {label}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    secureTextEntry={false}
                />
            )}

            <TouchableOpacity onPress={({fieldButtonFunction}) => {}}>
                <Text style = {{color: myColors.navy, fontWeight: '700'}}> {fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
    )
}
