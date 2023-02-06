import {Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { myColors } from '../colors/ColorPalette'

export default function CustomRecButton({label, onPress, inverse=false}) {
    return (

        <TouchableOpacity 
            onPress={ onPress }
            style={{
                
                flexDirection: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: inverse ? myColors.white : myColors.navy, 
                borderColor: inverse ? myColors.navy : null,
                borderWidth: inverse ? 1 : null,
                padding: 20,
                borderRadius: 25, 
                marginBottom:25,
                marginHorizontal:15,
            }}>
            <Text 
                style= {{
                    textAllign: 'center', 
                    fontWeight: '700', 
                    fontSize: 15, 
                    color: inverse ? myColors.navy : myColors.white,
            }}>
            {label}
            </Text>
        </TouchableOpacity>

    )
}