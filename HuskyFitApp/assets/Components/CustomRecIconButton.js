import { View, Image, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const iPad = windowWidth > 500;

export default function CustomRecIconButton({ label, icon, onPress, inverse = false }) {

    return (
        <View>
            <TouchableOpacity 
                onPress={ onPress }
                style={{
                    flexDirection: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: iPad ? 240 : windowWidth*0.35,
                    backgroundColor: inverse ? myColors.offWhite : myColors.navy, 
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
                        width: iPad ? 96 : 80,
                        height: iPad ? 72 : 60,
                        tintColor: inverse ? myColors.navy : myColors.white,
                    }}
                />
            </TouchableOpacity>
            {/* <Text 
                style= {{
                    textAlign: 'center', 
                    fontWeight: '700', 
                    fontSize: 15, 
                    color: inverse ? myColors.white : myColors.navy,
            }}>
            {label}
            </Text> */}
        </View>

    )
}