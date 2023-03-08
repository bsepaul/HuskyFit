import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

export default function CustomRecButton({ label, onPress, inverse = false }) {

    return (
        <View>
            <TouchableOpacity 
                onPress={ onPress }
                style={{
                    flexDirection: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: inverse ? myColors.offwhite : myColors.navy, 
                    borderColor: inverse ? myColors.navy : null,
                    borderWidth: inverse ? 1 : null,
                    padding: 20,
                    borderRadius: 25,
                    marginHorizontal: windowWidth*0.15,
                }}>
                <Text 
                    style= {{
                        textAllign: 'center', 
                        fontWeight: '500', 
                        fontSize: 15, 
                        color: inverse ? myColors.navy : myColors.white,
                    }}>
                    {label}
                </Text>
            </TouchableOpacity>
        </View>

    )
}