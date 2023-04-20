import { useRoute } from '@react-navigation/native';
import UserProfile from './UserProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodLogProfile from './FoodLogProfile';
import WorkoutLogProfile from './WorkoutLogProfile';
import Survey from './Survey';
import BmiCalculator from './BmiScreen';
const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  const route = useRoute();
  const token = route.params.token;

  return (
    <Stack.Navigator initialRouteName='UserProfile' screenOptions={{headerShown: false}}>
        <Stack.Screen component = {UserProfile} initialParams={{token:token}} name = "UserProfile" options={{headerShown:false, params: {token: token}}}/>
        <Stack.Screen component = {FoodLogProfile}    initialParams={{token:token}} name = "FoodLogProfile" options={{headerShown: false}} />
        <Stack.Screen component = {WorkoutLogProfile}    initialParams={{token:token}} name = "WorkoutLogProfile" options={{headerShown: false}} />
        <Stack.Screen component = {Survey}    initialParams={{token:token}} name = "Survey" options={{headerShown: false}} />
        <Stack.Screen component = {BmiCalculator}    initialParams={{token:token}} name = "BmiCalculator" options={{headerShown: false}} />
      </Stack.Navigator>
  )
};
export default ProfileScreen
