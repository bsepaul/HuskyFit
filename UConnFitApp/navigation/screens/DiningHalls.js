import { useRoute } from '@react-navigation/native';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomDiningButton from '../../assets/Components/CustomDiningButton'; 
import React from 'react'

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DiningHalls = ({ navigation }) => {
  
  // get current day of the week (buckley is closed on weekends, and only brunch is served on weekends - no breakfast)
  var today = new Date();
  const day = today.getDay();
  const isWeekend = day === 6 || day === 0;

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{'Dining Halls'}</Text>
        {isWeekend ? <View></View> : <CustomDiningButton label={'Buckley'} arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall: 'buckley' })} />}
        <CustomDiningButton label={'Gelfenbien'} arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'gelfenbien' })}/>
        <CustomDiningButton label={'McMahon'}    arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'mcmahon' })}/>
        <CustomDiningButton label={'North'}      arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'north' })}/>
        <CustomDiningButton label={'Northwest'}  arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'northwest' })}/>
        <CustomDiningButton label={'Putnam'}     arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'putnam' })} />
        <CustomDiningButton label={'South'}      arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'south' })}/>
        <CustomDiningButton label={'Whitney'}    arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'whitney' })}/>
        <CustomDiningButton label={'View Food Log'} arrow={"right"} inverse={true} onPress={() => navigation.navigate('Tabs', { screen: 'Profile', params: { screen: 'Foodlog', params: { token: token } } })}/>
      </ScrollView>
    </SafeAreaView>       
);
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginHorizontal: windowWidth * 0.125,
    paddingTop: windowHeight * 0.04,
    paddingBottom: windowHeight * 0.05
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "500",
    color: myColors.navy,
    marginBottom:10,
  },
});

export default DiningHalls
