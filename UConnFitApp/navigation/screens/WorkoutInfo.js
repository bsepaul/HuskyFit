import { useRoute } from '@react-navigation/native';
import InputField from '../../assets/Components/InputField';
import { myColors } from '../../assets/colors/ColorPalette';
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
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';


const allWorkoutTypeData = [
  { label: 'High Intensity Interval Training', value: '1' },
  { label: 'Stair Stepper', value: '2' },
  { label: 'Jump Rope', value: '3' },
  { label: 'Core Training', value: '4' },
  { label: 'Dance', value: '5' },
  { label: 'Eliptical', value: '6' },
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
  { label: 'Medium', value: '2' },
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

  // const [WorkoutTypeData, setWorkoutTypeData] = useState('');
  // const [TimeElapsedData, setTimeElapsedData] = useState('');
  // const [WorkoutIntensityData, setWorkoutIntensityData] = useState('');
  // const [CalorieData, setSetCalorieData] = useState(null);
  // const [Calories, setCalorie] = useState(null);
  const [CaloriesBurned, setCaloriesBurned] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const handleCaloriesBurned = (text) => {
    setCaloriesBurned(text);
  };

  const addWorkout = () => {
    (async () => {
      // Add as many or as little attributes as you want!
      var raw = JSON.stringify({
              "WorkoutType": WorkoutType,
              "TimeElapsed": TimeElapsed,
              "CaloriesBurned": CaloriesBurned,
              "WorkoutIntensity": WorkoutIntensity
          });


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


  })()
  navigation.navigate('WorkoutScreen', {token: token})
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
            //scroll = {true}
            labelField="label"
            valueField="value"
            placeholder={'Select Workout Type'}
            searchPlaceholder="Select One"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              // setWorkoutTypeData(item.value);
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
            data={allTimeElapsedData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Time Elapsed'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              // setTimeElapsedData(item.value);
              setTimeElapsed(item.label);
              setIsFocus(false);
            }}
          />
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
              // setWorkoutIntensityData(item.value);
              setWorkoutIntensity(item.label);
              setIsFocus(false);
            }}
          />
          <TextInput
            placeholder="Calories Burned (Optional)"
            placeholderTextColor={myColors.darkGrey}
            style={styles.calorieInput}
            keyboardType='number-pad'
            onChangeText={(calories) => setCaloriesBurned(calories)}
          />
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
  calorieInput: {
    borderBottomWidth: 1,
    borderBottomColor: myColors.lightGrey,
    paddingBottom: 5,
    marginBottom: 10,
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
    fontSize: 16,
  },
  selectedTextStyle: {
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