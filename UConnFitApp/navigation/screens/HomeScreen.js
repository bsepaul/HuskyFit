import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, ScrollView, Dimensions } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import { LineChart, ContributionGraph, ProgressChart, BarChart } from 'react-native-chart-kit';
//import { MyLineChart } from './HomeScreenChart.js';
import React from 'react'



export default function App() {
    // Get the day of the week
    const date = new Date();
    
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    
    const currentWeekDay = String(days[date.getDay()])
    const currentMonth = String(months[date.getMonth()])
    const currentDate = String(date.getDate())
    
    // dummy data
    const kcalMaintenance = 1700  // remaining = maintenance - eaten + burned
    const kcalEaten = 1250
    const kcalBurned = 230
    const kcalRemaining = kcalMaintenance - kcalEaten + kcalBurned
    
    
    
    
    const kcalProportion = kcalEaten / (kcalMaintenance - kcalBurned)
    // for progress ring
    const ringData = {
      labels: ["Bike", "Run", "Lift"], // optional
      data: [0.4, 0.6, 0.8]
    };
    
    const ringData2 = {
    data: [(kcalEaten - kcalBurned) / kcalMaintenance]

  };
    const barData = {
    labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"], // optional
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

          
          
          <ProgressChart
            data={ringData}
            width={Dimensions.get('window').width-50}
            height={220}
            strokeWidth={16}    // should decrease with more rings
            radius={32}         // default 32
            chartConfig={ringConfig}
            hideLegend={false}
          />
          
          <Text style={styles.chartLabel}>Calorie Goals</Text>
          
          <BarChart
            
            data={barData}
            width={Dimensions.get('window').width-25}
            height={200}
            fromZero={false}
            withHorizontalLabels={false}
            showValuesOnTopOfBars={true}
            chartConfig={barChartConfig}
            withInnerLines={true}
            segments={3}
            style={{
              paddingRight: 0,
              padding: 5,
              
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
      /*alignItems: 'center',*/
    /*justifyContent: 'center',*/
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
greetingsContainer: {
    flex: .1,
    padding: 10,
    borderRadius: 4,
//    backgroundColor: "#cecece"
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
//    backgroundColor: "#cecece"
},
chartLabel: {
    height: 50,
    paddingVertical: 20,
    paddingHorizontal: 50,
    alignItems: 'center',
//    fontWeight: 'bold',
    fontSize: 18
}

});

const chartConfig = {
    backgroundGradientFrom: "#E7E7E7",
//    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#E7E7E7",
//    backgroundGradientToOpacity: 0.5,
    color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`,
    strokeWidth: 2,     // optional, default 3
}
const barChartConfig = {
    backgroundGradientFrom: "#E7E7E7",
//    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#E7E7E7",
//    backgroundGradientToOpacity: 0.5,
    color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`,
    strokeWidth: 2,     // optional, default 3
    barPercentage: 1,  // what does this do?
    decimalPlaces: 0,
//    formatYLabel: {1500, 1600, 1700, 1800},
//    style: {paddingHorizontal: 0}
}
const ringConfig = {
    backgroundGradientFrom: "#E7E7E7",
    backgroundGradientTo: "#E7E7E7",
    color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`, // can't change individual ring colors
}

/* line chart code below
 
 <LineChart
   data={barData}
   width={Dimensions.get('window').width-50}
   height={200}
   chartConfig={ chartConfig }
 />
 
 */

/* progress ring code below
 
 <Text style={styles.chartLabel}>{kcalRemaining} kcal remaining</Text>
 <ProgressChart
   data={ringData2}
   width={Dimensions.get('window').width-50}
   height={180}
   strokeWidth={20}    // should decrease with more rings
   radius={60}         // default 32
   chartConfig={ringConfig}
   hideLegend={true}
 />
 
 */
