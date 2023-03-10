import {Text, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'
import { ChevronRight, ChevronDown, ChevronUp } from "react-native-feather";


// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

export default function CustomDiningButton({ label, onPress, arrow, inverse = false }) {
    var chevronArrow = <Text></Text>;
    if (arrow === "down") {
        chevronArrow = <ChevronDown stroke={inverse ? myColors.navy : myColors.white} width={18} height={18} />
    } else if (arrow === "right") {
        chevronArrow = <ChevronRight stroke={inverse ? myColors.navy : myColors.white} width={18} height={18} />
    } else if (arrow === "up") {
        chevronArrow = <ChevronUp stroke={inverse ? myColors.navy : myColors.white} width={18} height={18} />
    }

    return (

        <TouchableOpacity 
            onPress={ onPress }
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: inverse ? myColors.offWhite : myColors.navy, 
                borderColor: inverse ? myColors.navy : null,
                borderWidth: inverse ? 1 : null,
                padding: 20,
                width: windowWidth*.75,
                borderRadius: 22,
                marginTop:8,
                marginBottom:8,
            }}>
            <Text 
                style= {{
                    textAllign: 'center', 
                    fontWeight: '500', 
                    fontSize: 16,
                    color: inverse ? myColors.navy : myColors.white,
            }}>
            {label}
            </Text>
            {chevronArrow}
        </TouchableOpacity>

    )
}
