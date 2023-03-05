import {View, Text, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import { myColors } from '../colors/ColorPalette'
import { ThumbsUp, ThumbsDown } from "react-native-feather";

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

export default function CustomFoodLogButton({ label, infoOnPress, addOnPress, inverse = false }) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: inverse ? myColors.navy : myColors.white, 
            borderColor: inverse ? myColors.navy : null,
            borderWidth: inverse ? 5 : null,
            paddingVertical: 5,
            paddingHorizontal: 8,
            width: windowWidth*0.9-16, // subtracting 16 for the 8 pixels of marginHorizontal on each side
            borderRadius: 10,
            marginBottom: 8,
            marginHorizontal: 8,
        }}>
            <Text style={{
                flex: 1,
                flexWrap: 'wrap',
                textAlign: 'left',
                fontWeight: '350',
                fontSize: 15,
                color: inverse ? myColors.white : myColors.navy, 
            }}>{label}</Text>
            <View style={{
                flexDirection: 'row',
            }}>
                 <TouchableOpacity style={{ padding: 4 }} onPress = {()=>{}} ><ThumbsUp stroke={myColors.navy} strokeWidth={1.4} width={22} height={22}/></TouchableOpacity>
                 <TouchableOpacity style={{ padding: 4 }} onPress = {()=>{}}><ThumbsDown stroke={myColors.navy} strokeWidth={1.4} width={22} height={22}/></TouchableOpacity>
            </View>
        </View>

    )
}
