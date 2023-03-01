import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, Dimensions } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import { ProgressChart, BarChart } from 'react-native-chart-kit';
import React from 'react'

export default function HomeScreen() {

    // Get token from route
    const route = useRoute();
    const token = route.params.token;

    // get the day of the week
    const date = new Date();
    // convert to weekday, month ## format
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const currentWeekDay = String(days[date.getDay()])
    const currentMonth = String(months[date.getMonth()])
    const currentDate = String(date.getDate())
    
    // dummy data
    // for progress ring
    const ringData = {
      labels: ["Bike", "Run", "Lift"],
      data: [0.4, 0.6, 0.8]
    };
    // for calorie bars
    const barData = {
    labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
    datasets: [{
    data: [1750, 1712, 1679, 1712, 1679, 1599, 1650]
    }]
    }
      
  return (
  <SafeAreaView style={styles.container}>
      <View style={styles.greetingsContainer}>
        <Text style={styles.greetingsText}>Hello, Jonathan!</Text>
          <Text style={{fontSize: 18, paddingVertical: 10, paddingHorizontal: 20}}>{currentWeekDay}, {currentMonth} {currentDate}</Text>
      </View>
          <View style={styles.chartContainer}>
          
          <Text style={styles.chartLabel}>Activity This Week</Text>
          
          <ProgressChart        // ring chart
            data={ringData}
            width={Dimensions.get('window').width-50}
            height={220}
            strokeWidth={16}    // ring thickness, should decrease with more rings
            radius={32}         // default 32
            chartConfig={ringConfig}
            hideLegend={false}
          />
          
          <Text style={styles.chartLabel}>Calorie Goals</Text>
          
          <BarChart                       // calorie bar chart
            data={barData}
            width={Dimensions.get('window').width-25}
            height={200}
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
    backgroundColor: myColors.lightGrey,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
greetingsContainer: {
    flex: .1,
    padding: 10,
    borderRadius: 4,
},
greetingsText: {
    width: '100%',
    height: 50,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 25
},
chartContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
},
chartLabel: {
    height: 50,
    paddingVertical: 20,
    paddingHorizontal: 50,
    alignItems: 'center',
    fontSize: 18
}
});

const barChartConfig = {
    backgroundGradientFrom: "#E7E7E7",  // our background color
    backgroundGradientTo: "#E7E7E7",
    color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`,
    strokeWidth: 2,     // optional, default 3
    decimalPlaces: 0,
}
const ringConfig = {
    backgroundGradientFrom: "#E7E7E7",
    backgroundGradientTo: "#E7E7E7",
    color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`, // can't change individual ring colors
}
