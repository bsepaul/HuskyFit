import { useRoute } from '@react-navigation/native';
import InputField from '../../assets/Components/InputField';
import { myColors } from '../../assets/styles/ColorPalette';
import React, { useState } from 'react';
import CustomRecButton from '../../assets/Components/CustomRecButton';
import fetch from 'node-fetch'
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const allWorkoutTypeData = [
  { label: 'High Intensity Interval Training', value: '1' },
  { label: 'Stair Stepper', value: '2' },
  { label: 'Jump Rope', value: '3' },
  { label: 'Core Training', value: '4' },
  { label: 'Dance', value: '5' },
  { label: 'Elliptical', value: '6' },
  { label: 'Rower', value: '7' },
  { label: 'Pilates', value: '8' },
  { label: 'Basketball', value: '9' },
  { label: 'Volleyball', value: '10' },
  { label: 'Soccer', value: '11' },
  { label: 'Badmitten', value: '12' },
  { label: 'Raquetball', value: '13' },
];

const allTimeElapsedData = [
  { label: '0-10 minutes', value: '1' },
  { label: '10-20 minutes', value: '2' },
  { label: '20-30 minutes', value: '3' },
  { label: '30-40 minutes', value: '4' },
  { label: '40-50 minutes', value: '5' },
  { label: '50-60 minutes', value: '6' },
  { label: '60-70 minutes', value: '7' },
  { label: '70-80 minutes', value: '8' },
  { label: '80-90 minutes', value: '9' },
  { label: '90-100 minutes', value: '10' },
  { label: '100-110 minutes', value: '11' },
  { label: '110-120 minutes', value: '12' },
];

const allWorkoutIntensityData = [
  { label: 'Low', value: '1' },
  { label: 'Mid', value: '2' },
  { label: 'High', value: '3' },
];

const WorkoutInfo = ({ navigation }) => {

  // Get token and workoutType from route
  const route = useRoute();
  const token = route.params.token;
  const workoutType = route.params.workoutType;

  // If user selected other workout on previous page, set otherWorkout to true
  // using this boolean to hide/show other workout dropdown
  var otherWorkout = (workoutType === '') ? true : false;

  const [WorkoutType, setWorkoutType] = useState(workoutType);
  const [TimeElapsed, setTimeElapsed] = useState('');
  const [WorkoutIntensity, setWorkoutIntensity] = useState('');
  const [CaloriesBurned, setCaloriesBurned] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  
  
  const handleCaloriesBurned = (text) => {
    setCaloriesBurned(text);
  };

  // Alert code - workout successfully added to log
  const alertSuccess = () => {
    const title = 'Success';
    const message = 'Exercise successfully added to log.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };
  
  // Alert code - error adding workout to log
  const alertFailure = () => {
    const title = 'Error';
    const message = 'Please make sure you enter information for all specified fields.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };

  const addWorkout = () => {
    (async () => {
      // Add as many or as little attributes as you want!
      var raw = JSON.stringify({
              "WorkoutType": WorkoutType,
              "TimeElapsed": TimeElapsed,
              "CaloriesBurned": ((CaloriesBurned === '') ? handleCaloriesBurned() : CaloriesBurned),
              "WorkoutIntensity": WorkoutIntensity
          });
      // Make sure user isn't leaving any required fields empty
      if( !WorkoutType || !TimeElapsed || !WorkoutIntensity ) { 
        alertFailure();
        console.log("fail");
        return; // Don't do API call if invalid data
      }

      var requestOptions = {
        method: 'PUT',
        headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
                  "Authorization": token},
        body: raw,
        redirect: 'follow'
      };

      fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/workout", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      alertSuccess();
      navigation.navigate('WorkoutScreen', {token: token});
  })()
  // alertSuccess();
  // navigation.navigate('WorkoutScreen', {token: token});
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Enter {otherWorkout ? 'other' : workoutType.toLowerCase()} workout</Text>
        <View style={{padding: 20, borderRadius: 15}}>
          { otherWorkout ? <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: myColors.navy }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={allWorkoutTypeData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Workout Type'}
            searchPlaceholder="Select One"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setWorkoutType(item.label);
              setIsFocus(false);
            }}
          /> : <View></View> }
          
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: myColors.navy}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={allWorkoutIntensityData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Workout Intensity'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setWorkoutIntensity(item.label);
              setIsFocus(false);
            }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start', marginBottom:10 }}>
            <View style={styles.inputUnits}>
              <TextInput
                placeholder="Time Elapsed"
                placeholderTextColor={myColors.darkGrey}
                style={styles.input}
                keyboardType='number-pad'
                onChangeText={(time) => setTimeElapsed(time)}
              />
              <Text style={styles.units}>mins</Text>
            </View>
            <View style={styles.inputUnits}>
              <TextInput
                placeholder="Calories (Optional)"
                placeholderTextColor={myColors.darkGrey}
                style={styles.input}
                keyboardType='number-pad'
                onChangeText={(calories) => setCaloriesBurned(calories)}>
              </TextInput>
              <Text style={styles.units}>Kcals</Text>
            </View>
          </View>
          <CustomRecButton label={'Submit'} onPress={addWorkout} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WorkoutInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
    scroll: true,
  },
  dropdown: {
    height: 50,
    borderColor: myColors.grey,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    scroll: true,
  },
  icon: {
    marginRight: 5,
  },
  title: {
    paddingHorizontal: 20,
    fontFamily: 'System',
    fontSize: 30,
    fontWeight: '600',
    color: myColors.navy,
  },
  input: {
    height: 34,
    borderColor: myColors.grey,
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 6,
    fontSize:12,
  },
  inputUnits: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    borderColor: myColors.grey,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 6,
    paddingRight:6,
    marginBottom: 10,
    marginRight: 10,
  },
  units: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight:'300',
    color: myColors.black,
    paddingRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color:myColors.darkGrey,
    fontSize: 16,
  },
  selectedTextStyle: {
    color:myColors.black,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});