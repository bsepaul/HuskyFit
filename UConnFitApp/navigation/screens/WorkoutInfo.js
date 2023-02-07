import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../assets/Components/CustomButton';
import InputField from '../../assets/Components/InputField';
import { myColors } from '../../assets/colors/ColorPalette';
import { NavigationHelpersContext } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { TextInput } from 'react-native';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View 
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const WorkoutTypeData = [
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

const TimeElapsedData = [
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

const WorkoutIntensityData = [
  { label: 'Low', value: '1' },
  { label: 'Medium', value: '2' },
  { label: 'High', value: '3' },
];

const App = ({navigation}) => {
  //const [WorkoutTypeData, setWorkoutTypeData] = useState([]);
  const [WorkoutType, setWorkoutType] = useState([]);
  //const [TimeElapsedData, setTimeElapsedData] = useState([]);
  const [TimeElapsed, setTimeElapsed] = useState([]);
  //const [WorkoutIntensityData, setWorkoutIntensityData] = useState([]);
  const [WorkoutIntensity, setWorkoutIntensity] = useState([]);
  const [CalorieData, setSetCalorieData] = useState(null);
  const [Calorie, setSetCalorie] = useState(null);
  const [CaloriesBurned, setCaloriesBurned] = React.useState("");
  const [isFocus, setIsFocus] = useState(false);
  const handleCaloriesBurned = (text) => {
    setCaloriesBurned(text);
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={WorkoutTypeData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Workout Type' : '...'}
          searchPlaceholder="Select One"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setWorkoutTypeData(item.value);
            setWokrkoutType(item.label);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={TimeElapsedData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Time Elapsed' : '...'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTimeElapsedData(item.value);
            setTimeElapsed(item.label);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={WorkoutIntensityData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Workout Intensity' : '...'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setWorkoutIntensityData(item.value);
            setWorkoutIntensity(item.label);
            setIsFocus(false);
          }}
        />
 
 <InputField label ={'Calories Burned (Optional)'} inputType = 'calories-burned' 
                fieldButtonFunction = {() => {}}
                /> 

        <TouchableOpacity
          style={{
            backgroundColor: '#0F3460',
            padding: 20,
            borderRadius: 15,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('WorkoutScreen')}>

          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
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