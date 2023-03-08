import { View, Image, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'

export default function CustomRecIconButton({ label, icon, onPress, inverse = false }) {

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
                    marginBottom:25,
                }}>
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width: 80,
                        height: 60,
                        tintColor: inverse ? myColors.navy : myColors.white,
                    }}
                />
            </TouchableOpacity>
            {/* <Text 
                style= {{
                    textAllign: 'center', 
                    fontWeight: '700', 
                    fontSize: 15, 
                    color: inverse ? myColors.white : myColors.navy,
            }}>
            {label}
            </Text> */}
        </View>

    )
}