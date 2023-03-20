import {View, Text, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import { myColors } from '../styles/ColorPalette'
import { Info, PlusCircle } from "react-native-feather";

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

export default function CustomRecFoodButton({ label, diningHall, date, calories, carbs, protein, fat, infoOnPress, addOnPress, inverse = false }) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[parseInt(date.split('/')[0]) - 1];
    const day = parseInt(date.split('/')[1]);
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
            width: windowWidth*0.8, // subtracting 16 for the 8 pixels of marginHorizontal on each side
            marginBottom: 8,
        }}>
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
                    <Text style={{color:myColors.darkGrey, fontWeight:'600', fontSize: 11, width: windowWidth*0.16}}>{calories} Kcals</Text>
                    <Text style={{color:myColors.darkGrey, fontSize: 11, width: windowWidth*0.17}}>{carbs} carbs</Text>
                    <Text style={{color:myColors.darkGrey, fontSize: 11, width: windowWidth*0.19}}>{protein} protein</Text>
                    <Text style={{color:myColors.darkGrey, fontSize: 11, width: windowWidth * 0.15 }}>{fat} fat</Text>
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
