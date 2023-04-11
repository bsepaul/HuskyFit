import { useRoute } from '@react-navigation/native';
import WorkoutScreen from './WorkoutScreen';
import WorkoutInfo from './WorkoutInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RecScreen = () => {
  const route = useRoute();
  const token = route.params.token;

  return (
      <Stack.Navigator initialRouteName='WorkoutScreen'>
        <Stack.Screen component = {WorkoutScreen} initialParams={{token:token}} name = "WorkoutScreen" options={{ headerShown:false, params: {token: token} }}/>
        <Stack.Screen component = {WorkoutInfo}   initialParams={{token:token}} name = "WorkoutInfo"   options={{ headerShown:false }}/>
      </Stack.Navigator>
  )
};
export default RecScreen