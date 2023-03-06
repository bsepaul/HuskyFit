import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, Dimensions } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import { ProgressChart, BarChart } from 'react-native-chart-kit';
import React from 'react';
import fetch from 'node-fetch';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({navigation}) {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;
  
  // Set variable to store the user's name once fetched from API
  const [name, setName] = React.useState('');
  const [weekDays, setWeekDays] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({"Calories": [], "low": 0, "mid": 0, "high": 0 });

  // get the day of the week
  const date = new Date();
  // convert to weekday, month ## format
  const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
  const daysAbbrev = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
  const currentWeekDay = String(days[date.getDay()])
  const currentMonth = String(months[date.getMonth()])
  const currentDate = String(date.getDate())
  
  // data
  // for progress ring
  const ringData = {                  // take from user data, last 3 workouts performed?
    labels: ["High", "Mid", "Low"],
    data: [Math.min(1, ((userInfo.high)/75)), Math.min(1, ((userInfo.mid)/115)), Math.min(1, ((userInfo.low)/200))]             // can set default goal calories to 100 per exercise?
  };

  const barData = {
    labels: weekDays,
    datasets: [
      {data: userInfo.Calories}
    ]
  }
  // for calorie bars
  // only show data for days we've already seen this week
  const barLabels = []
  for (let i=0; i <= date.getDay(); i++) {
    barLabels.push(String(daysAbbrev[i]))
  }

  // Convert the date format from dd/mm/yyyy --> mm/dd/yyyy for the API call to work
  const convertDate = (date) => {
    let convertedDate = date.slice(3, 5) + '/' + date.slice(0, 2) + date.slice(5, 10)
    return convertedDate
  }

  const getUserInfo = async () => {
    var raw = ""
    var requestOptions = {
      method: 'GET',
      headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
                "Authorization": token},
      body: raw,
      redirect: 'follow'
    };
    fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/profile", requestOptions)
      .then(response => response.text())
      .then((result) => {
        var json = JSON.parse(result);
        setName(json.Name.split(' ')[0])
      })
      .catch(error => console.log('error', error));
  }

  // Get the list of dates of the week from Sunday to the current day
  const getWeekDays = async () => {
    let date = new Date();
    let dayNum = date.getDay();
    setWeekDays(daysAbbrev.slice(0,(dayNum+1)));
    let dateStr = date.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
    const daysWeek = [];
    daysWeek.push(convertDate(dateStr));
    while (dayNum >= 1) {
      date.setDate(date.getDate() - 1);
      let dateStr = date.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
      daysWeek.unshift(convertDate(dateStr));
      dayNum -= 1;
    }
    return daysWeek;
  }

  const extractUserWorkoutInfo = (workouts) => {
    var low_intensity = 0;
    var mid_intensity = 0;
    var high_intensity = 0;
    var tempCaloriesBurned = 0;
    workouts.forEach(workout => {
      tempCaloriesBurned += (parseFloat(workout.CaloriesBurned));
      let intensity = workout.WorkoutIntensity;
      if (intensity === 'Low') {
        low_intensity += parseFloat(workout.TimeElapsed)
      } else if (intensity === 'Medium') {
        mid_intensity += parseFloat(workout.TimeElapsed)
      } else if (intensity === 'High') {
        high_intensity += parseFloat(workout.TimeElapsed)
      }
    })
    return [tempCaloriesBurned, low_intensity, mid_intensity, high_intensity];
  }

  const getUserWorkoutInfo = async (week) => {
    const tempUserInfo = { "Calories": [], "low": 0, "mid": 0, "high": 0 };
    for (let index = 0; index < week.length; index++) {
      const day = week[index];
      var raw = JSON.stringify({
        "Date": day // mm/dd/yyyy
      });
      var requestOptions = {
        method: 'POST',
        headers: {
          "x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
          "Authorization": token
        },
        body: raw,
        redirect: 'follow'
      };
      await fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/workout", requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result != '') {
            const json = JSON.parse(result);
            let userInfoArr = extractUserWorkoutInfo(json.Workouts);
            tempUserInfo.Calories.push(userInfoArr[0]);
            tempUserInfo.low += userInfoArr[1];
            tempUserInfo.mid += userInfoArr[2];
            tempUserInfo.high += userInfoArr[3];
          }
        })
        .catch(error => console.log('error', error));
    }
    setUserInfo(tempUserInfo);
  }

  const getAllUserInfo = async () => {
    await getUserInfo();
    let week = await getWeekDays();
    await getUserWorkoutInfo(week);
  }
  
  // Automatically get user's info on screen load
  React.useEffect(() => {
    const userInfo = navigation.addListener('focus', () => {
      getAllUserInfo();
    });
    return userInfo;
  }, [navigation]);
      
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingsContainer}>
        <Text style={styles.title}>Hello, {name}</Text>
        <Text style={{ fontSize: 20, paddingVertical: 0, paddingHorizontal: 20, color: myColors.navy }}>{currentWeekDay}, {currentMonth} {currentDate}</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>Activity This Week</Text>
        <ProgressChart        // ring chart
          data={ringData}
          width={Dimensions.get('window').width*.80}
          height={220}
          strokeWidth={16}    // ring thickness, should decrease with more rings
          radius={32}         // default 32
          chartConfig={ringConfig}
          hideLegend={false}
        />
        <Text style={styles.chartLabel}>Calorie Goals</Text>
        <BarChart             // calorie bar chart
          data={barData}
          width={Dimensions.get('window').width*.95}
          height={250}
          fromZero={false}              // let 0 always be bottom of chart
          withHorizontalLabels={false}  // show calorie labels on left side of chart
          showValuesOnTopOfBars={true}  // show calories above bars
          chartConfig={barChartConfig}
          withInnerLines={true}         // show dotted/segmented lines
          segments={3}                  // number of dotted/segmented lines
          style={{
            paddingRight: 0,
            padding: 5
        }}
        />
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 60,
  },
greetingsContainer: {
    flex: .12,
    padding: 10,
    borderRadius: 4,
},
title: {
  fontFamily: "System",
  fontSize: 30,
  fontWeight: "500",
  color: myColors.navy,
  paddingHorizontal: windowWidth * 0.05,
  paddingVertical: 10,
},
chartContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
},
chartLabel: {
    height: 50,
    fontWeight: "500",
    color: myColors.navy,
    paddingVertical: 25,
    paddingHorizontal: 50,
    alignItems: 'center',
    fontSize: 18
}
});

const barChartConfig = {
    backgroundGradientFrom: myColors.white,  // our background color
    backgroundGradientTo: myColors.white,
    color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`,
    strokeWidth: 2,     // optional, default 3
    decimalPlaces: 0,
}
const ringConfig = {
    backgroundGradientFrom: myColors.white,
    backgroundGradientTo: myColors.white,
    color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`, // can't change individual ring colors
}
