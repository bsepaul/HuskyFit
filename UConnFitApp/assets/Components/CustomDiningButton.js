import {Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { myColors } from '../colors/ColorPalette'

export default function CustomButton({label, onPress, inverse=false}) {
    return (

        <TouchableOpacity 
            onPress={ onPress }
            style={{
                backgroundColor: inverse ? myColors.white : myColors.navy, 
                borderColor: inverse ? myColors.navy : null,
                borderWidth: inverse ? 5 : null,
                padding: 25,
                borderRadius: 20, 
                marginBottom:20,
            }}>
            <Text 
                style= {{
                    textAllign: 'center', 
                    fontWeight: '700', 
                    fontSize: 16, 
                    color: inverse ? myColors.navy : myColors.white,
            }}>
            {label}
            </Text>
        </TouchableOpacity>

    )
}