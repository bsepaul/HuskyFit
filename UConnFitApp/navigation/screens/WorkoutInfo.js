import { useRoute } from '@react-navigation/native';
import { myColors } from '../../assets/styles/ColorPalette';
import React, { useState } from 'react';
import { Modal, SafeAreaView } from 'react-native';
import { Check } from "react-native-feather";
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
  Dimensions
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const windowWidth = Dimensions.get('window').width;


const allWorkoutTypesInfo = [
  { label: 'High Intensity Interval Training', value: '8' },
  { label: 'Stair Stepper', value: '9' },
  { label: 'Jump Rope', value: '10' },
  { label: 'Core Training', value: '5.5' },
  { label: 'Dance', value: '5' },
  { label: 'Elliptical', value: '5' },
  { label: 'Rower', value: '7' },
  { label: 'Pilates', value: '3' },
  { label: 'Basketball', value: '8' },
  { label: 'Volleyball', value: '4' },
  { label: 'Soccer', value: '9.5' },
  { label: 'Badmitten', value: '5' },
  { label: 'Raquetball', value: '8.6' },
  { label: 'Walk', value: '4' },
  { label: 'Run', value: '10' },
  { label: 'Weights', value: '7' },
  { label: 'Yoga', value: '3' },
  { label: 'Swimming', value: '5.5' },
  { label: 'Biking', value: '8' },
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
  const [userWeight, setUserWeight] = useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleCaloriesBurned = async () => {

    let calories = 0;

    raw = '';
    var requestOptions = {
      method: 'GET',
      headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
            "Authorization": token},
      body: raw,
      redirect: 'follow'
    };
    
    await fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/user-info", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        let weight = 150;
        // If the user has not filled out the survey, this will return ''
        if (result != '') {
          let json = JSON.parse(result);
          // If the user has filled out the survey but not entered their weight, json.Weight will be undefined
          if (json.Weight != undefined) {
            setUserWeight(true);
            weight = json.Weight; // Set the actual weight of the user
          } else {
            setUserWeight(false);
          }
        }

        // Calculate the calories based on average college student weight or their custom weight
        let metValue = null;
        for (let i = 0; i < allWorkoutTypesInfo.length; i++) {
          if (allWorkoutTypesInfo[i].label === WorkoutType) {
            metValue = parseInt(allWorkoutTypesInfo[i].value);
          }
        }
        if (WorkoutIntensity === 'Low') {
          metValue -= 1;
        } else if (WorkoutIntensity === 'High') {
          metValue += 1;
        }
      
        calories = (metValue * 3.5 * (weight) * 0.45359237 * parseInt(TimeElapsed)) / 200;
        calories = Math.round(calories);
      })
      .catch(error => console.log('error', error));

    return calories;
    
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

  const addWorkout = async () => {
    let calories = CaloriesBurned;
    if (CaloriesBurned === '') {
      console.log("No calories entered... computing them based on input.")
      calories = await handleCaloriesBurned();
    }
    var raw = JSON.stringify({
            "WorkoutType": WorkoutType,
            "TimeElapsed": TimeElapsed,
            "CaloriesBurned": calories,
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
      "Content-Type": "application/json",
      "Authorization": token},
      body: raw,
      redirect: 'follow'
    };

    await fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/workout", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
    setModalVisible(true);
    setTimeout(() => {  navigation.navigate('WorkoutScreen', { token: token }); }, 500);

  }

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              }}
              onShow={() => {
                setTimeout(() => {  setModalVisible(false); }, 500);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Check stroke={myColors.navy} width={70} height={70} />
                <Text style={styles.modalText}>Workout logged!</Text>
              </View>
            </View>
          </Modal>  
        <StatusBar barStyle="light-content" />
        <View style={{width:windowWidth*0.8}}>
          <Text style={styles.title}>Enter {otherWorkout ? 'other' : workoutType.toLowerCase()} workout</Text>          
        </View>
          <View style={{width:windowWidth*0.8}}>
            { otherWorkout ? <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: myColors.navy }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={allWorkoutTypesInfo}
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
              style={[styles.dropdown, isFocus && {borderColor: myColors.navy, backgroundColor:myColors.white}]}
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
            <View style={[styles.inputBox, { width: windowWidth*0.35, marginRight: windowWidth * 0.02 }]}>
                <TextInput
                  placeholder="Time Elapsed"
                  placeholderTextColor={myColors.darkGrey}
                  style={styles.input}
                  keyboardType='number-pad'
                  onChangeText={(time) => {setTimeElapsed(time);}}
                />
                <Text style={styles.units}>mins</Text>
              </View>
              <View style={[styles.inputBox, { width: windowWidth*0.43 }]}>
                <TextInput
                  placeholder="Calories (Optional)"
                  placeholderTextColor={myColors.darkGrey}
                  style={styles.input}
                  keyboardType='number-pad'
                  onChangeText={(value) => {setCaloriesBurned(value);}}
                >
                </TextInput>
                <Text style={styles.units}>Kcals</Text>
              </View>
            </View>
          </View>
          <CustomRecButton label={'Submit'} onPress={() => { addWorkout(); }} />
          <CustomRecButton label={'Back'} inverse={true} onPress={() => navigation.goBack()} />
        </View>
      </TouchableWithoutFeedback>
  );
};

export default WorkoutInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems:'center',
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
    fontFamily: 'System',
    fontSize: 30,
    fontWeight: '600',
    color: myColors.navy,
    paddingBottom:15,
  },
  input: {
    height: 34,
    borderColor: myColors.grey,
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 6,
    fontSize:12,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    borderBottomColor: myColors.grey,
    borderBottomWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 6,
    marginBottom: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.92,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "500",
    color: myColors.navy,
    paddingVertical: 8,
    paddingHorizontal:8,
  },
});