import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView,} from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomRecButtton from '../../assets/Components/CustomRecButton'; 
import WorkoutScreen from './WorkoutScreen';
import WorkoutInfo from './WorkoutInfo';
import WorkoutInfo2 from './WorkoutInfo2';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RecScreen = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen component = {WorkoutScreen} name = "WorkoutScreen" options={{headerShown:false}}/>
        <Stack.Screen component = {WorkoutInfo}  name = "WorkoutInfo" options={{ headerShown: false }}/>
        <Stack.Screen component = {WorkoutInfo2}  name = "WorkoutInfo2" options={{ headerShown: false }}/>
      </Stack.Navigator>
  )
};
export default RecScreen

// const RecScreen = ({navigation}) => {
//   return (
//     <SafeAreaView style={{flex: 1, flexDirection:'center'}}>
//       <View style= {{flexDirection:"row", flexWrap:"wrap", alignContent:"space-around"}}>
//         <CustomRecButtton label={'Walking '}  onPress={() => navigation.navigate('WorkoutScreen2')} /> 
//         <CustomRecButtton label={'Running '} onPress={() => navigation.navigate('WorkoutScreen2')} />
//         <CustomRecButtton label={'Weights '} onPress={() => navigation.navigate('WorkoutScreen2')}/>
//         <CustomRecButtton label={'Yoga    '} onPress={() => navigation.navigate('WorkoutScreen2')}/>
//         <CustomRecButtton label={'Swimming'} onPress={() => navigation.navigate('WorkoutScreen2')}/>
//         <CustomRecButtton label={'Biking  '} onPress={() => navigation.navigate('WorkoutScreen2')}/>   
//       </View>
//       <View>
//         <CustomRecButtton label={'Other Workouts'} onPress={() => navigation.navigate('WorkoutScreen')}/>  
//       </View>
//     </SafeAreaView>
        

// );
// };
// export default RecScreen