import {Text, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'
import { ChevronRight, ChevronDown, ChevronUp } from "react-native-feather";


// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

export default function CustomNavigationButton({ label, onPress, arrow, inverse = false }) {
    var chevronArrow = <Text></Text>;
    if (arrow === "down") {
        chevronArrow = <ChevronDown stroke={inverse ? myColors.white : myColors.navy} width={18} height={18} />
    } else if (arrow === "right") {
        chevronArrow = <ChevronRight stroke={inverse ? myColors.white : myColors.navy} width={18} height={18} />
    } else if (arrow === "up") {
        chevronArrow = <ChevronUp stroke={inverse ? myColors.white : myColors.navy} width={18} height={18} />
    }

    return (

        <TouchableOpacity 
            onPress={ onPress }
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: inverse ? myColors.navy : myColors.offWhite, 
                borderColor: inverse ? null: myColors.navy,
                borderWidth: inverse ? null : 1,
                padding: 14,
                width: windowWidth*.7,
                borderRadius: 18,
                marginTop:8,
                marginBottom:8,
            }}>
            <Text 
                style= {{
                    textAllign: 'center', 
                    fontWeight: '500', 
                    fontSize: 16,
                    color: inverse ? myColors.white : myColors.navy,
            }}>
            {label}
            </Text>
            {chevronArrow}
        </TouchableOpacity>

    )
}
