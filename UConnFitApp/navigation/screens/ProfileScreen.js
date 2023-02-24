import { useRoute } from '@react-navigation/native';
import UserProfile from './UserProfile';
import Settings from './Settings'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  const route = useRoute();
  const token = route.params.token;
  return (
    <Stack.Navigator initialRouteName='UserProfile' screenOptions={{headerShown: false}}>
        <Stack.Screen component = {UserProfile} initialParams={{token:token}} name = "UserProfile" options={{headerShown:false}}/>
        <Stack.Screen component = {Settings}    initialParams={{token:token}} name = "Settings" options={{headerShown: false}} />
      </Stack.Navigator>
  )
};
export default ProfileScreen
