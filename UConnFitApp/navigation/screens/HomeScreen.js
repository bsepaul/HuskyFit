import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, ScrollView } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';

export default function App() {
    // Get the day of the week
    const date = new Date();
    
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    
    const currentWeekDay = String(days[date.getDay()])
    const currentMonth = String(months[date.getMonth()])
    const currentDate = String(date.getDate())
  return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.greetingsContainer}>
        <Text style={styles.greetingsText}>Hello, Jonathan!</Text>
          <Text style={{fontSize: 18, paddingVertical: 8, paddingHorizontal: 20}}>{currentWeekDay}, {currentMonth} {currentDate}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 25
}
});
