import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text, Dimensions } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomRecButton from '../../assets/Components/CustomRecButton';
import CustomRecIconButton from '../../assets/Components/CustomRecIconButton';
import CustomButton from '../../assets/Components/CustomButton';
import WorkoutInfo2 from './WorkoutInfo2'

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;

const RecScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'center', justifyContent: 'center', alignContent: 'center' }}>
      <Text style= {styles.title}>Workouts</Text>
      <View style= {styles.buttonRow}>
        <CustomRecIconButton label={'Walking '} icon={require('../../assets/icons/rec/walk.png')}   onPress={() => navigation.navigate('WorkoutInfo2')}/> 
        <CustomRecIconButton label={'Running '} icon={require('../../assets/icons/rec/run.png')} onPress={() => navigation.navigate('WorkoutInfo2')} />
      </View>
      <View style= {styles.buttonRow}>
        <CustomRecIconButton label={'Weights '} icon={require('../../assets/icons/rec/weight.png')} onPress={() => navigation.navigate('WorkoutInfo2')}/>
        <CustomRecIconButton label={'Yoga    '} icon={require('../../assets/icons/rec/yoga.png')}   onPress={() => navigation.navigate('WorkoutInfo2')}/>
      </View>
      <View style= {styles.buttonRow}>
        <CustomRecIconButton label={'Swimming'} icon={require('../../assets/icons/rec/swim.png')} onPress={() => navigation.navigate('WorkoutInfo2')} />
        <CustomRecIconButton label={'Biking  '} icon={require('../../assets/icons/rec/biking.png')} onPress={() => navigation.navigate('WorkoutInfo2')}/>   
      </View>
      <View>
        <CustomRecButton label={'Other Workouts'} onPress={() => navigation.navigate('WorkoutInfo')}/>  
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