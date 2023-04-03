import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

export default function CustomRecButton({ label, onPress, inverse = false }) {

    return (
        <TouchableOpacity 
            onPress={ onPress }
            style={{
                backgroundColor: inverse ? null : myColors.navy, 
                paddingVertical: 15,
                paddingHorizontal: 35,
                borderRadius: 15,
                marginVertical:6,
            }}>
            <Text 
                style= {{
                    textAlign: 'center', 
                    fontWeight: '500', 
                    fontSize: 15, 
                    color: inverse ? myColors.navy : myColors.white,
                }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}