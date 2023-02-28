import { useRoute } from '@react-navigation/native';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomDiningButton from '../../assets/Components/CustomDiningButton'; 
import React from 'react'

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DiningHalls = ({ navigation }) => {
  
  // get dates of yesterday, today and tomorrow
  var yesterday = new Date();
  var today = new Date();
  var tomorrow = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // convert dates into eastern time zone
  const yesterdayEST = yesterday.toLocaleString('en-US', { timeZone: 'America/New_York' }).split("/");
  const todayEST     = today.toLocaleString('en-US', { timeZone: 'America/New_York' }).split("/");
  const tomorrowEST  = tomorrow.toLocaleString('en-US', { timeZone: 'America/New_York' }).split("/");

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // get month string for yesterday, today and tomorrow
  const yesterdayMonth = months[parseInt(yesterdayEST[0]) - 1];
  const todayMonth = months[parseInt(todayEST[0]) - 1];
  const tomorrowMonth = months[parseInt(tomorrowEST[0]) - 1];

  // get day string of yesterday, today and tomorrow
  const yesterdayDate = yesterdayEST[1];
  const todayDate = todayEST[1];
  const tomorrowDate = tomorrowEST[1];
  
  // get current day of the week (buckley is closed on weekends, and only brunch is served on weekends - no breakfast)
  const day = today.getDay();
  const isWeekend = day === 6 || day === 0;

  // make state variables so we can check the current selected button and pass it onto MealScreen
  const [isYesterday, setIsYesterday] = React.useState(false);
  const [isToday, setIsToday] = React.useState(true);
  const [isTomorrow, setIsTomorrow] = React.useState(false);

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{'Dining Halls'}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: (isYesterday ? myColors.navy : myColors.lightGrey),
              marginHorizontal: 10,
              marginTop: 10,
              width: 65,
              paddingVertical: 15,
              borderRadius: 15,
              alignItems: 'center',
            }}
            onPress={() => { setIsYesterday(true); setIsToday(false); setIsTomorrow(false); }}>
            <Text style={styles.month}>{yesterdayMonth}</Text>
            <Text  style={styles.day}>{yesterdayDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: (isToday ? myColors.navy : myColors.lightGrey),
              marginHorizontal: 10,
              marginTop: 10,
              width: 65,
              paddingVertical: 15,
              borderRadius: 15,
              alignItems: 'center',
            }}
            onPress={() => { setIsYesterday(false); setIsToday(true); setIsTomorrow(false); }}>
            <Text style={styles.month}>{todayMonth}</Text>
            <Text  style={styles.day}>{todayDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: (isTomorrow ? myColors.navy : myColors.lightGrey),
              marginHorizontal: 10,
              marginTop: 10,
              width: 65,
              paddingVertical: 15,
              borderRadius: 15,
              alignItems: 'center',
            }}
            onPress={() => { setIsYesterday(false); setIsToday(false); setIsTomorrow(true); }}>
            <Text style={styles.month}>{tomorrowMonth}</Text>
            <Text  style={styles.day}>{tomorrowDate}</Text>
          </TouchableOpacity>
        </View>
        {isWeekend ? <View></View> : <CustomDiningButton label={'Buckley'} arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall: 'buckley' })} />}
        <CustomDiningButton label={'Gelfenbien'} arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'gelfenbien' })}/>
        <CustomDiningButton label={'McMahon'}    arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'mcmahon' })}/>
        <CustomDiningButton label={'North'}      arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'north' })}/>
        <CustomDiningButton label={'Northwest'}  arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'northwest' })}/>
        <CustomDiningButton label={'Putnam'}     arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'putnam' })} />
        <CustomDiningButton label={'South'}      arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'south' })}/>
        <CustomDiningButton label={'Whitney'}    arrow={"right"} onPress={() => navigation.navigate('MealScreen', { token: token, dininghall : 'whitney' })}/>
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
  },
  month: {
    fontFamily: 'System',
    fontSize: 16,
    color: myColors.white,
  },
  day: {
    fontFamily: 'System',
    fontSize: 28,
    color: myColors.white,
    fontWeight: "600",
  },
  dateButton: {
    marginHorizontal: 10,
    marginTop: 10,
    width: 65,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  }
});

export default DiningHalls
