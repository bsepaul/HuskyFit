import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'
import { ChevronLeft } from 'react-native-feather'

export default function CustomButton({ label, onPress, inverse = false }) {

    return (
        <TouchableOpacity 
            onPress={ onPress }
            style={{
                backgroundColor: inverse ? null : myColors.navy, 
                paddingVertical: 15,
                paddingHorizontal: 35,
                borderRadius: 15,
                marginVertical:8,
            }}>
            <View style={{ flexDirection: 'row', justifyContent:'center', }}>
                {inverse ? <ChevronLeft stroke={myColors.navy} strokeWidth={2} width={18} height={18} /> : <View></View> }
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: 15, 
                        color: inverse ? myColors.navy : myColors.white,
                    }}>
                    {label}
                </Text>                
            </View>

        </TouchableOpacity>
    )
}