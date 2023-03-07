import { useRoute } from '@react-navigation/native';
import UserProfile from './UserProfile';
import Settings from './Settings'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Foodlog from './Foodlog';
import Workoutlog from './Workoutlog';
import Survey from './Survey';
import BmiCalculator from './BmiScreen';
const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  const route = useRoute();
  const token = route.params.token;
  return (
    <Stack.Navigator initialRouteName='UserProfile' screenOptions={{headerShown: false}}>
        <Stack.Screen component = {UserProfile} initialParams={{token:token}} name = "UserProfile" options={{headerShown:false}}/>
        <Stack.Screen component = {Foodlog}    initialParams={{token:token}} name = "Foodlog" options={{headerShown: false}} />
        <Stack.Screen component = {Workoutlog}    initialParams={{token:token}} name = "Workoutlog" options={{headerShown: false}} />
        <Stack.Screen component = {Survey}    initialParams={{token:token}} name = "Survey" options={{headerShown: false}} />
        <Stack.Screen component = {BmiCalculator}    initialParams={{token:token}} name = "BmiCalculator" options={{headerShown: false}} />
      </Stack.Navigator>
  )
};
export default ProfileScreen
