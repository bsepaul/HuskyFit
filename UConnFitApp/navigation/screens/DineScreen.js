import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiningHalls from './DiningHalls';
import MealScreen from './MealScreen';
import NutritionScreen from './NutritionScreen';

const Stack = createNativeStackNavigator();

const DineScreen = () => {
  const route = useRoute();
  const token = route.params.token;
  return (
      <Stack.Navigator initialRouteName='DiningHalls' screenOptions={{headerShown: false}}>
        <Stack.Screen component = {DiningHalls}     initialParams={{token:token}} name = "DiningHalls" options={{headerShown:false, params: {token: token}}}/>
        <Stack.Screen component = {MealScreen}      initialParams={{token:token}} name = "MealScreen" options={{headerShown: false}} />
        <Stack.Screen component = {NutritionScreen} initialParams={{token:token}} name = "NutritionScreen" options={{headerShown: false}} />
      </Stack.Navigator>
  )
};
export default DineScreen
