import {Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'

export default function CustomButton({label, onPress, inverse=false}) {
    return (

        <TouchableOpacity 
            onPress={ onPress }
            style={{
                backgroundColor: inverse ? myColors.offwhite : myColors.navy, 
                borderColor: inverse ? myColors.navy : null,
                borderWidth: inverse ? 1 : null,
                padding: 15,
                borderRadius: 10, 
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