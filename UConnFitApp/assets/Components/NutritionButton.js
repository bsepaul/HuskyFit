import {Text, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'
import { ChevronRight, ChevronDown, ChevronUp } from "react-native-feather";


// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

export default function CustomButton({ label, onPress, arrow, inverse = false }) {
    var chevronArrow = <Text></Text>;
    if (arrow === "down") {
        chevronArrow = <ChevronDown stroke={myColors.navy} width={18} height={18} />
    } else if (arrow === "right") {
        chevronArrow = <ChevronRight stroke={myColors.navy} width={18} height={18} />
    } else if (arrow === "up") {
        chevronArrow = <ChevronUp stroke={myColors.navy} width={18} height={18} />
    }

    return (

        <TouchableOpacity 
            onPress={ onPress }
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: inverse ? myColors.navy : myColors.lightGrey, 
                borderColor: inverse ? myColors.navy : null,
                borderWidth: inverse ? 5 : null,
                paddingHorizontal: windowWidth*.075,
                paddingVertical: 20,
                width: windowWidth,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.15,
                shadowRadius: 8,

                elevation: 7,
            }}>
            <Text 
                style= {{
                    textAlign: 'center', 
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
