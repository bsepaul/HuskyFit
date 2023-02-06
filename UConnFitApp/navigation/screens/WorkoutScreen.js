import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView,} from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomRecButtton from '../../assets/Components/CustomRecButton'; 
import WorkoutInfo2 from './WorkoutInfo2'

const RecScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection:'center'}}>
      <View style= {{flexDirection:"row", flexWrap:"wrap", alignContent:"space-around"}}>
        <CustomRecButtton label={'Walking '}  onPress={() => navigation.navigate('WorkoutInfo2')} /> 
        <CustomRecButtton label={'Running '} onPress={() => navigation.navigate('WorkoutInfo2')} />
        <CustomRecButtton label={'Weights '} onPress={() => navigation.navigate('WorkoutInfo2')}/>
        <CustomRecButtton label={'Yoga    '} onPress={() => navigation.navigate('WorkoutInfo2')}/>
        <CustomRecButtton label={'Swimming'} onPress={() => navigation.navigate('WorkoutInfo2')}/>
        <CustomRecButtton label={'Biking  '} onPress={() => navigation.navigate('WorkoutInfo2')}/>   
      </View>
      <View>
        <CustomRecButtton label={'Other Workouts'} onPress={() => navigation.navigate('WorkoutInfo')}/>  
      </View>
    </SafeAreaView>
        

);
};
export default RecScreen