import {Text, TouchableOpacity} from 'react-native'
import React from 'react'

export default function CustomButtton({label, onPress}) {
    return (

            <TouchableOpacity 
                onPress={ onPress}
                style={{backgroundColor: '#0D223F', 
                padding:20, boarderRadius:10, 
                marginBottom:30,
                }}>
                    <Text 
                    style= {{
                        textAllign: 'center', 
                        fontWeight: '700', 
                        fontSize: 16, 
                        color: '#fff',
                }}> 
                {label}
                </Text>
                </TouchableOpacity>

    )
}