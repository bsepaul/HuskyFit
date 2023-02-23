import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiningHalls from './DiningHalls';
import MealScreen from './MealScreen';
import NutritionScreen from './NutritionScreen';

const Stack = createNativeStackNavigator();

const DineScreen = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component = {DiningHalls} name = "DiningHalls" options={{headerShown:false}}/>
        <Stack.Screen component = {MealScreen}  name = "MealScreen" options={{headerShown: false}} />
        <Stack.Screen component = {NutritionScreen}  name = "NutritionScreen" options={{headerShown: false}} />
      </Stack.Navigator>
  )
};
export default DineScreen
