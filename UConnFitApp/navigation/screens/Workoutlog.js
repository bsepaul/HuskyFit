import { useRoute } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import { Clock, BarChart2, Zap, PlusCircle } from "react-native-feather";
// import themeContext from '../../config/themeContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WorkoutLog = ({ navigation }) => {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  const [workouts, setWorkouts] = useState([]);

  const Stats = ({ workout, min, intensity, calories, date, color }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = months[parseInt((date.slice(0, 2)) - 1)];
    const day = date.slice(3, 5);
    if ((typeof calories) === 'undefined') { calories = 0; }
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{
          backgroundColor: color,
          marginVertical: 10,
          marginRight: 10,
          width: 65,
          height: 80,
          paddingVertical: 15,
          borderRadius: 15,
          alignItems: 'center', }}>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.day}>{day}</Text>
        </View>
        <View style={styles.workout}>
          <Text style={styles.subtitle}>{ workout }</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.stat}>
              <Clock stroke={myColors.darkGrey} strokeWidth={1.5} width={16} height={16} />
              <Text style={styles.statText}>{min} min</Text>
            </View>
            <View style={styles.stat}>
              <BarChart2 stroke={myColors.darkGrey} strokeWidth={1.5} width={16} height={16} />
              <Text style={styles.statText}>{intensity}</Text>
            </View>
            <View style={styles.stat}>
              <Zap stroke={myColors.darkGrey} strokeWidth={1.5} width={16} height={16} />
              <Text style={styles.statText}>{calories} Kcal</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Convert the date format from dd/mm/yyyy --> mm/dd/yyyy for the API call to work
  const convertDate = (date) => {
    let convertedDate = date.slice(3, 5) + '/' + date.slice(0, 2) + date.slice(5, 10)
    return convertedDate
  }

  // Get the list of dates of the week from Sunday to the current day
  const getWeekDays = async () => {
    let date = new Date();
    let dayNum = date.getDay();
    let dateStr = date.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
    const daysWeek = [];
    daysWeek.push(convertDate(dateStr));
    while (dayNum >= 1) {
      date.setDate(date.getDate() - 1);
      let dateStr = date.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
      daysWeek.push(convertDate(dateStr));
      dayNum -= 1;
    }
    return daysWeek;
  }

  const fetchWorkouts = async (week) => {
    const allWorkouts = [];
    var id = 0;
    for (let i = 0; i < week.length; i++) {
      const day = week[i];
      var raw = JSON.stringify({
          "Date": day // mm/dd/yyyy
      });

      var requestOptions = {
        method: 'POST',
        headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
                  "Authorization": token},
        body: raw,
        redirect: 'follow'
      };
      await fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/workout", requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result != '') {
            let json = JSON.parse(result);
            const workoutData = json.Workouts;
            for (let j = 0; j < workoutData.length; j++){
              const workout = workoutData[j];
              workout.date = json.Date
              workout.id = id;
              workout.color = myColors.gradient[i];
              allWorkouts.push(workout);
              id += 1;
            }
          }
        })
        .catch(error => console.log('error', error));
    }
    setWorkouts(allWorkouts);
  };

  const handleWorkouts = async () => {
    let week = await getWeekDays();
    await fetchWorkouts(week);
  }

  // Automatically get food log for today from API on screen load
  React.useEffect(() => {
    const getWorkouts = navigation.addListener('focus', () => {
      handleWorkouts();
    });
    return getWorkouts;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Workouts</Text>
        <ScrollView style={styles.scroll}>
          {workouts.map((workout) => {
            return (
              <Stats
                key={workout.id}
                workout={workout.WorkoutType}
                min={workout.TimeElapsed}
                intensity={workout.WorkoutIntensity}
                calories={workout.CaloriesBurned}
                date={workout.date}
                color={workout.color}
              />); 
          })}
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent:'center',}}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs', { screen: 'Rec', params: { screen: 'WorkoutScreen', params: { token: token } } })}>
            <PlusCircle fill={myColors.navy} stroke={myColors.offWhite} strokeWidth={1.2} width={55} height={55}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View> 
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: myColors.offWhite,
    paddingBottom: 50,
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "600",
    color: myColors.navy,
    marginBottom: 15,
    marginTop: 20,
  },
  statText: {
    marginHorizontal: 4,
    fontFamily: 'System',
    color: myColors.darkGrey,
    fontSize: 14,
    fontWeight: '500'
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 20,
    fontWeight: "500",
    color: myColors.navy,
    marginBottom: 5,
  },
	month: {
		fontFamily: 'System',
		fontSize: 16,
		color: myColors.white,
	},
	day: {
		fontFamily: 'System',
		fontSize: 28,
		color: myColors.white,
		fontWeight: "600",
	},
  workout: {
    backgroundColor: myColors.white,
    padding: 15,
    width: windowWidth * 0.66,
    height: 80,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: myColors.grey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.20,
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
  scroll: {
    maxHeight: 600,
  },
  list: {
    minHeight: 0,
    maxHeight: windowHeight*0.26,
    width: windowWidth*0.9,
    marginTop: 5,
    marginBottom: 10,
    paddingTop: 8,
    backgroundColor: myColors.lightGrey,
    borderRadius: 12,
    shadowColor: myColors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  }
  });
  
  
  
  

  

export default WorkoutLog;

