import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, Dimensions } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import { ProgressChart, BarChart } from 'react-native-chart-kit';
import React from 'react';
import fetch from 'node-fetch';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen() {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;
  
  // Set variable to store the user's name once fetched from API
  const [name, setName] = React.useState('');

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
    labels: ["Bike", "Run", "Lift"],
    data: [0.4, 0.6, 0.8]             // can set default goal calories to 100 per exercise?
  };
  // for calorie bars
  // only show data for days we've already seen this week
  const barLabels = []
  for (let i=0; i <= date.getDay(); i++) {
    barLabels.push(String(daysAbbrev[i]))
  }
    // dummy data
  const calData = [1750, 1712, 1679, 1712, 1679, 1599, 1650] // change to user data set, exclude 0's for days with no data

  const barData = {
    labels: barLabels,
    datasets: [{
      data: calData.slice(0, date.getDay()+1)  // only show cal data since last Sunday
    }]
  }
  
  const getUserInfo = () => {
    (async () => {
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
    })()
  }

  // Automatically get all meals for today from API on screen load
  React.useEffect(() => {
    getUserInfo();
  }, []);
      
  return (
  <SafeAreaView style={styles.container}>
      <View style={styles.greetingsContainer}>
        <Text style={styles.title}>Hello, {name}</Text>
          <Text style={{fontSize: 20, paddingVertical: 0, paddingHorizontal: 20, color: myColors.navy}}>{currentWeekDay}, {currentMonth} {currentDate}</Text>
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
          
          <BarChart                       // calorie bar chart
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
