import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView,} from 'react-native';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomDiningButtton from '../../assets/Components/CustomDiningButton'; 

const DiningHalls = ({ navigation }) => {
  
  const date = new Date();
  const day = date.getDay();
  // const day = 3;
  const isWeekend = day === 6 || day === 0;
  console.log(isWeekend)

  return (
    <SafeAreaView style={{flex:.88, justifyContent:'center',alignItems:'center'}}>
      <View style= {{paddingHorizontal:25}}>
        <View style = {{alignItems:'center'}}></View>

        {isWeekend ? <View></View> : <CustomDiningButtton label={'Buckley'} onPress={() => navigation.navigate('MealScreen', { dininghall: 'buckley' })} />}
        <CustomDiningButtton label={'Gelfenbien'} onPress={() => navigation.navigate('MealScreen', { dininghall : 'gelfenbien' })}/>
        <CustomDiningButtton label={'McMahon'}    onPress={() => navigation.navigate('MealScreen', { dininghall : 'mcmahon' })}/>
        <CustomDiningButtton label={'North'}      onPress={() => navigation.navigate('MealScreen', { dininghall : 'north' })}/>
        <CustomDiningButtton label={'Northwest'}  onPress={() => navigation.navigate('MealScreen', { dininghall : 'northwest' })}/>
        <CustomDiningButtton label={'Putnam'}     onPress={() => navigation.navigate('MealScreen', { dininghall : 'putnam' })} />
        <CustomDiningButtton label={'South'}      onPress={() => navigation.navigate('MealScreen', { dininghall : 'south' })}/>
        <CustomDiningButtton label={'Whitney'}    onPress={() => navigation.navigate('MealScreen', { dininghall : 'whitney' })}/>
        
      </View>
    </SafeAreaView>       
);
};
export default DiningHalls
