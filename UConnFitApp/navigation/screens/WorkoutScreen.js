import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, SafeAreaView, Text, Dimensions } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import CustomRecButton from '../../assets/Components/CustomRecButton';
import CustomRecIconButton from '../../assets/Components/CustomRecIconButton';
import CustomNavigationButton from '../../assets/Components/CustomNavigationButton';
// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

const RecScreen = ({ navigation }) => {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'center', justifyContent: 'center', alignContent: 'center' }}>
      <Text style= {styles.title}>Workouts</Text>
      <View style= {styles.buttonRow}>
        <CustomRecIconButton label={'Walking '} icon={require('../../assets/icons/rec/walk.png')} onPress={() => navigation.navigate('WorkoutInfo', { token:token, workoutType: 'Walk' })}/> 
        <CustomRecIconButton label={'Running '} icon={require('../../assets/icons/rec/run.png')}  onPress={() => navigation.navigate('WorkoutInfo', { workoutType: 'Run' })} />
      </View>
      <View style= {styles.buttonRow}>
        <CustomRecIconButton label={'Weights '} icon={require('../../assets/icons/rec/weight.png')} onPress={() => navigation.navigate('WorkoutInfo', { workoutType: 'Weights' })}/>
        <CustomRecIconButton label={'Yoga    '} icon={require('../../assets/icons/rec/yoga.png')}   onPress={() => navigation.navigate('WorkoutInfo', { workoutType: 'Yoga' })}/>
      </View>
      <View style= {styles.buttonRow}>
        <CustomRecIconButton label={'Swimming'} icon={require('../../assets/icons/rec/swim.png')}   onPress={() => navigation.navigate('WorkoutInfo', { workoutType: 'Swimming' })} />
        <CustomRecIconButton label={'Biking  '} icon={require('../../assets/icons/rec/biking.png')} onPress={() => navigation.navigate('WorkoutInfo', { workoutType: 'Biking' })}/>   
      </View>
      <View style={{alignItems:'center'}}>
        <CustomNavigationButton label={'Select Other Workout'} arrow={"right"} inverse={true} onPress={() => navigation.navigate('WorkoutInfo', { workoutType: '' })}/>  
        <CustomNavigationButton label={'View Workout Log'} arrow={"right"} onPress={() => navigation.navigate('Tabs', { screen: 'Profile', params: { screen: 'Workoutlog', params: { token: token } } })}/>
      </View>
    </SafeAreaView>
        

);
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth*0.15,
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "500",
    color: myColors.navy,
    paddingHorizontal: windowWidth * 0.15,
    paddingVertical: 15,
  }
});

export default RecScreen