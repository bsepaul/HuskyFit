import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView,} from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomDiningButtton from '../../assets/Components/CustomDiningButton'; 
import DiningHalls from './DiningHalls';
import MealScreen from './MealScreen';

const Stack = createNativeStackNavigator();

const DineScreen = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen component = {DiningHalls} name = "DiningHalls" options={{headerShown:false}}/>
        <Stack.Screen component = {MealScreen}  name = "MealScreen" options={{headerShown: false}} />
      </Stack.Navigator>
  )
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
