import {View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'
import { Info, PlusCircle } from "react-native-feather";

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const iPad = windowWidth > 500;

export default function CustomFoodLogButton({ label, calories, carbs, protein, fat, meal, infoOnPress, addOnPress, inverse = false }) {
    let icon = '';
    if (meal === 'Breakfast') { icon = require('../icons/food/breakfast.png') }
    else if (meal === 'Lunch') { icon = require('../icons/food/lunch.png') }
    else if (meal === 'Dinner') { icon = require('../icons/food/dinner.png') }
    else { icon = require('../icons/food/breakfast.png')}
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius:10,
            backgroundColor: myColors.offWhite,
            paddingHorizontal: 8,
            width: iPad ? 500-16 : (windowWidth*0.85)-16, // subtracting 16 for the 8 pixels of marginHorizontal on each side
            marginBottom: 8,
        }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width: iPad ? 30 : 24,
                        height: iPad ? 30 : 24,
                        tintColor: inverse ? myColors.navy : myColors.navy,
                        marginRight: 8,
                    }}
                />  
                <View>
                    <Text style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: iPad ? 16 : 14,
                        color: inverse ? myColors.white : myColors.navy,
                        paddingBottom: iPad ? 4 : 3,
                    }}>{label}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color:myColors.darkGrey, fontWeight:'600', fontSize: iPad ? 14 : 12, width: iPad ? 105 : windowWidth*0.17}}>{calories} Kcals</Text>
                        <Text style={{color:myColors.darkGrey, fontSize: iPad ? 14 : 12, width: iPad ? 105 : windowWidth*0.18}}>{carbs} carbs</Text>
                        <Text style={{color:myColors.darkGrey, fontSize: iPad ? 14 : 12, width: iPad ? 105 : windowWidth*0.20}}>{protein} protein</Text>
                        <Text style={{color:myColors.darkGrey, fontSize: iPad ? 14 : 12, width: iPad ? 105 : windowWidth * 0.15 }}>{fat} fat</Text>
                    </View>
                </View>                
            </View>
        </View>

    )
}
