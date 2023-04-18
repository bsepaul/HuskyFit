import {View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'
import { Info, PlusCircle } from "react-native-feather";

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const iPad = windowWidth > 500;

export default function CustomRecommendedFoodButton({ label, diningHall, month, day, calories, carbs, protein, fat, meal, infoOnPress, addOnPress, inverse = false }) {
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
            borderBottomColor: myColors.grey,
            borderBottomWidth: 0.7,
            paddingBottom: 10,
            paddingTop: 4,
            paddingHorizontal: 8,
            width: iPad ? 580 : windowWidth*0.8, // subtracting 16 for the 8 pixels of marginHorizontal on each side
            marginBottom: 8,
        }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
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
                        fontSize: 14,
                        color: inverse ? myColors.white : myColors.navy,
                        paddingBottom: 3,
                    }}>{label}</Text>       
                    <Text style={{ color: myColors.navy, fontSize: 12, fontWeight:'500', paddingBottom: 2}}>
                        {diningHall} Dining Hall - {month} {day}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color:myColors.darkGrey, fontWeight:'600', fontSize: 10, width: iPad ? 120 : windowWidth*0.15}}>{calories} Kcals</Text>
                        <Text style={{color:myColors.darkGrey, fontSize: 10, width: iPad ? 120 : windowWidth*0.16}}>{carbs} carbs</Text>
                        <Text style={{color:myColors.darkGrey, fontSize: 10, width: iPad ? 120 : windowWidth*0.18}}>{protein} protein</Text>
                        <Text style={{color:myColors.darkGrey, fontSize: 10, width: iPad ? 120 : windowWidth * 0.13 }}>{fat} fat</Text>
                    </View>
                </View>                
            </View>


            <View style={{
                flexDirection: 'row',
            }}>
                <TouchableOpacity style={{ padding: 2 }} onPress = {addOnPress} ><PlusCircle stroke={myColors.navy} strokeWidth={1.4} width={24} height={24}/></TouchableOpacity>
                {/* <TouchableOpacity style={{ padding: 2 }} onPress = {infoOnPress}><Info stroke={myColors.navy} strokeWidth={1.4} width={24} height={24}/></TouchableOpacity> */}
            </View>
        </View>

    )
}
