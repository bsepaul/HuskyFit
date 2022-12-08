import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView,} from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomDiningButtton from '../../assets/Components/CustomDiningButton'; 

const DineScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
    <View style= {{paddingHorizontal:25}}>
    <View style = {{alignItems:'center'}}>
    </View>

<CustomDiningButtton label={'Putnam'} onPress={() => navigation.navigate('MealScreen')} />
<CustomDiningButtton label={'Whitney'} onPress={() => navigation.navigate('MealScreen')}/>
<CustomDiningButtton label={'Gelfenbien'} onPress={() => navigation.navigate('MealScreen')}/>
<CustomDiningButtton label={'McMahon'} onPress={() => navigation.navigate('MealScreen')}/>
<CustomDiningButtton label={'North'} onPress={() => navigation.navigate('MealScreen')}/>
<CustomDiningButtton label={'Northwest'} onPress={() => navigation.navigate('MealScreen')}/>
<CustomDiningButtton label={'South'} onPress={() => navigation.navigate('MealScreen')}/>
           
                </View>
        </SafeAreaView>       
);
};
export default DineScreen

//const styles = StyleSheet.create({
  //container: {
    //flex: 1,
    //backgroundColor: myColors.lightGrey,
    //alignItems: 'center',
    //justifyContent: 'center',
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  //},
  //top: {

  //}

//});
