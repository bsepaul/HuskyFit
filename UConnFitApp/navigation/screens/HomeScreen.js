import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, ScrollView, Dimensions } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import { LineChart, ContributionGraph, ProgressChart } from 'react-native-chart-kit';
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
    
    // for progress ring
    const ringData = {
      labels: ["Swim", "Bike", "Run"], // optional
      data: [0.4, 0.6, 0.8]
    };
    
    //

  
            //
            
  return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.greetingsContainer}>
        <Text style={styles.greetingsText}>Hello, Jonathan!</Text>
          <Text style={{fontSize: 18, paddingVertical: 8, paddingHorizontal: 20}}>{currentWeekDay}, {currentMonth} {currentDate}</Text>
      </View>
          <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Activity This Week</Text>
              <LineChart
                data={
                    {
                        labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
                        datasets: [
                    {
                        data: [830, 762, 810, 700, 723, 493, 677]
                    },
                ],
              }
                }
                width={Dimensions.get('window').width-50}
                height={200}
                chartConfig={ chartConfig }
              />
          
          <ProgressChart
            data={ringData}
            width={Dimensions.get('window').width-50}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
          
          </View>
      <StatusBar style="auto" />
    </ScrollView>
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
    flex: 1,
    padding: 10
},
greetingsText: {
    width: '100%',
    height: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'left',
    justifyContent: 'left',
    fontWeight: 'bold',
    fontSize: 25
},
chartContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
},
chartLabel: {
    height: 50,
    paddingVertical: 20,
    paddingHorizontal: 50,
    alignItems: 'center',
//    fontWeight: 'bold',
    fontSize: 20
}

});

const chartConfig = {
    backgroundGradientFrom: "#E7E7E7",
//    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#E7E7E7",
//    backgroundGradientToOpacity: 0.5,
    color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,     // optional, default 3
    barPercentage: 0.5,  // what does this do?
}

