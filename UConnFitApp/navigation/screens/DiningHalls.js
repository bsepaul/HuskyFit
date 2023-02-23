import { Text, View, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomDiningButton from '../../assets/Components/CustomDiningButton'; 

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DiningHalls = ({ navigation }) => {
  
  const date = new Date();
  const day = date.getDay();
  const isWeekend = day === 6 || day === 0;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{'Dining Halls'}</Text>
        {isWeekend ? <View></View> : <CustomDiningButton label={'Buckley'} arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall: 'buckley' })} />}
        <CustomDiningButton label={'Gelfenbien'} arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall : 'gelfenbien' })}/>
        <CustomDiningButton label={'McMahon'}    arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall : 'mcmahon' })}/>
        <CustomDiningButton label={'North'}      arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall : 'north' })}/>
        <CustomDiningButton label={'Northwest'}  arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall : 'northwest' })}/>
        <CustomDiningButton label={'Putnam'}     arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall : 'putnam' })} />
        <CustomDiningButton label={'South'}      arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall : 'south' })}/>
        <CustomDiningButton label={'Whitney'}    arrow={"right"} onPress={() => navigation.navigate('MealScreen', { dininghall : 'whitney' })}/>
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
  }
});

export default DiningHalls
