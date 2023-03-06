import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { myColors } from '../../assets/colors/ColorPalette';
// import themeContext from '../../config/themeContext';

const WorkoutLog = ({ navigation, route }) => {
  const { weight, time, WorkoutIntensity, caloriesBurned } = route.params;
  const [workouts, setWorkouts] = useState([{ weight, time, WorkoutIntensity, caloriesBurned }]);

  const addWorkout = () => {
    setWorkouts(prevWorkouts => [
      ...prevWorkouts,
      { weight, time, WorkoutIntensity, caloriesBurned }
    ]);
    navigation.navigate('WorkoutScreen');
  };

  // const theme = useContext(themeContext);

  return (
    // <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
    <View style={[styles.container, { backgroundColor: myColors.white }]}>
      
      {workouts.map((workout, index) => (
        <View key={index} style={styles.workoutContainer}>
          <View style={styles.dateContainer}>
            {/* <Text style={[styles.month, { color: theme.color }]}>Feb</Text> */}
            <Text style={[styles.month, { color: myColors.navy }]}>Feb</Text>
            {/* <Text style={[styles.day, { color: theme.color }]}>28</Text> */}
            <Text style={[styles.day, { color: myColors.navy }]}>28</Text>
          </View>
          <View style={styles.bubble}>
            <Feather name="bar-chart-2" size={24} color="white" style={{ marginTop: 10, marginRight: 10 }} />
            <Text style={styles.bubbleText}>{`WorkoutIntensity: ${workout.WorkoutIntensity}`}</Text>
            <Feather name="clock" size={24} color="white" style={{ marginTop: 10, marginRight: 10 }} />
            <Text style={styles.bubbleText}>{`Time: ${workout.time}`}</Text>
            <Feather name="target" size={24} color="white" style={{ marginTop: 10, marginRight: 10 }} />
            <Text style={styles.bubbleText}>{`Weight: ${workout.weight}`}</Text>
            <Feather name="zap" size={24} color="white" style={{ marginTop: 10, marginRight: 10 }} />
            <Text style={styles.bubbleText}>{`Calories Burned: ${workout.caloriesBurned}`}</Text>
          </View>
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Add Another Workout" onPress={addWorkout} />
      </View>
      <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: myColors.navy, fontWeight: "700" }}>
              {" "}
              Back{" "}
            </Text>
          </TouchableOpacity>
        </View>
    </View>
    
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    dateContainer: {
      backgroundColor: '#3b5998',
      marginLeft: 10,
      marginTop: 10,
      width: 65,
      height: 65,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    month: {
      fontFamily: 'System',
      fontSize: 16,
      color: 'white',
    },
    day: {
      fontFamily: 'System',
      fontSize: 28,
      color: 'white',
      fontWeight: '600',
    },
    workoutContainer: {
      backgroundColor: '#3b5998',
      padding: 10,
      marginTop: 10,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    intensityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    workoutText: {
      color: 'white',
      fontSize: 16,
      marginLeft: 5,
    },
    bubble: {
      backgroundColor: '#3b5998',
      padding: 15,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bubbleText: {
      color: 'white',
      fontSize: 16,
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    featherIcon: {
      fontSize: 16,
      marginLeft: 5,
    },
  });
  
  
  
  

  

export default WorkoutLog;

