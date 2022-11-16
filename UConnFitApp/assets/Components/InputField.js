import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'

export default function InputField({label, icon, inputType, keyboardType, fieldButtonLabel, fieldButtonFunction}) {
    return (
        <View style={{
            flexDirection:'row', 
            borderBottomColor: '#ccc', 
            borderBottomWidth:1, 
            paddingBottom: 25, 
            marginBottom:25, 
            }}>
        
        {icon}
        {inputType =='password' ? (
            <TextInput
            placeholder = {label}
            keyboardType ={keyboardType}
            style={{flex: 1, paddingVertical: 0}}
            secureTextEntry={true}
            />
        ) : (

            <TextInput 
            placeholder = {label}
            keyboardType={keyboardType}
            secureTextEntry={true} 
            />
        )}

            <TouchableOpacity onPress={({fieldButtonFunction}) => {}}>
                <Text style = {{color: '#0D223F', fontWeight: '700'}}> {fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
    )
}