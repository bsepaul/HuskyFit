import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, Platform, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import { ProgressChart, BarChart } from 'react-native-chart-kit';
import React from 'react';
import fetch from 'node-fetch';
import { Circle } from "react-native-feather";
import CustomRecommendedFoodButton from '../../assets/Components/CustomRecommendedFoodButton';

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
  const [recommendedFoods, setRecommendedFoods] = React.useState([{"id": 0, "Food Item": "Fetching suggested foods...", "Dining Hall": "North", "Meal": "Dinner", "Date": "03/20/2023", "Calories": "0", "Protein": "0", "Total Carbohydrates": "0", "Total Fat": "0"}]);

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
    data: [Math.min(1, ((userInfo.high)/75)), Math.min(1, ((userInfo.mid)/115)), Math.min(1, ((userInfo.low)/210))]             // can set default goal calories to 100 per exercise?
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

  const alertSuccess = () => {
    const title = 'Success';
    const message = 'Food successfully added to log.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };

  const ExerciseLevel = ({ label, color, percent, minutes, minutesTotal }) => {
    return (
      <View style={{ flexDirection:'row', padding: 10, alignItems:'center' }}>
        <Circle stroke={color} fill={color} width={22} height={22} />
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={styles.text}>{label} - {percent}%</Text>
          <Text style={{fontFamily:'System', color:myColors.darkGrey, fontSize:11 }}>{minutes} / {minutesTotal} min</Text>
        </View>
      </View>
    );
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
    var tempCaloriesBurned = 0.0;
    for (let index = 0; index < workouts.length; index++) {
      const workout = workouts[index];
      let numCalories = parseFloat(workout.CaloriesBurned);
      tempCaloriesBurned += (isNaN(numCalories)) ? 0 : numCalories;
      let intensity = workout.WorkoutIntensity;
      if (intensity === 'Low') {
        low_intensity += parseFloat(workout.TimeElapsed)
      } else if (intensity === 'Mid') {
        mid_intensity += parseFloat(workout.TimeElapsed)
      } else if (intensity === 'High') {
        high_intensity += parseFloat(workout.TimeElapsed)
      }
    }
    return [tempCaloriesBurned, low_intensity, mid_intensity, high_intensity];
  }

  const getUserWorkoutInfo = async (week) => {
    const tempUserInfo = { "Calories": Array(week.length).fill(0), "low": 0, "mid": 0, "high": 0 };
    let index = 0;
    for (index = 0; index < week.length; index++) {
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
            tempUserInfo.Calories[index] = userInfoArr[0];
            tempUserInfo.low += userInfoArr[1];
            tempUserInfo.mid += userInfoArr[2];
            tempUserInfo.high += userInfoArr[3];
          }
        })
        .catch(error => console.log('error', error));
    }
    setUserInfo(tempUserInfo);
  }

  const logFood = (food) => { 
    // Add as many or as little attributes as you want!
    var raw = JSON.stringify({
      "Food item": food["Food Item"],
      "Calories": food["Calories"],
      "Carbs": food["Total Carbohydrates"],
      "Protein": food["Protein"],
      "Total fat": food["Total Fat"],
      "Dining hall": food["Dining Hall"],
      "Date": convertDate(date.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0]),
    });

    var requestOptions = {
      method: 'PUT',
      headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
                "Authorization": token},
      body: raw,
      redirect: 'follow'
    };

    fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/food-log", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      alertSuccess(); 

  }

  const getRecommendations = async () => {
    var raw = ""
    var requestOptions = {
      method: 'GET',
      headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
                "Authorization": token},
      body: raw,
      redirect: 'follow'
    };


    await fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/recommendation", requestOptions)
    .then(response => response.text())
    .then((result) => {
      if (result != '') {
        const json = JSON.parse(result);
        for (let i = 0; i < json.length; i++) {
          json[i].id = i;
        }
        setRecommendedFoods(json);
      }
    })
    .catch(error => console.log('error', error));
  }

  const getAllUserInfo = async () => {
    await getUserInfo();
    let week = await getWeekDays();
    await getUserWorkoutInfo(week);
    await getRecommendations();
  }
  
  // Automatically get user's info on screen load
  React.useEffect(() => {
    const userInfo = navigation.addListener('focus', () => {
      getAllUserInfo();
    });
    return userInfo;
  }, [navigation]);
      
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.greetingsContainer}>
          <View>
            <Text style={styles.title}>Hello, {name}</Text>
            <Text style={{ fontSize: 20, paddingVertical: 0, color: myColors.navy }}>{currentWeekDay}, {currentMonth} {currentDate}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs', { screen: 'Profile', params: { token: token } })}>
            <Image
              source={require('../../assets/img/husky.png')}
              resizeMode='contain'
              style={{
                width: 75,
                height: 75,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.chartLabel}>Activity This Week</Text>
          <View style={styles.chartContainer}>
            <ProgressChart        // ring chart
              data={ringData}
              width={windowWidth*.45}
              height={170}
              strokeWidth={12}    // ring thickness, should decrease with more rings
              radius={32}         // default 32
              chartConfig={ringConfig}
              hideLegend={true}
            />
            <View style={{width: windowWidth*.35}}>
              <ExerciseLevel label={"Low"} color={'#303E55'} percent={(100 * ringData.data[2]).toFixed(2)} minutes={userInfo.low} minutesTotal={210} />
              <ExerciseLevel label={"Mid"}  color={'#4E5A6D'} percent={(100*ringData.data[1]).toFixed(2)}  minutes={userInfo.mid} minutesTotal={115} />
              <ExerciseLevel label={"High"} color={'#6C7686'} percent={(100*ringData.data[0]).toFixed(2)}  minutes={userInfo.high} minutesTotal={75} />            
            </View>
          </View>
          <Text style={styles.chartLabel}>Burned Calories</Text>
          <View style={styles.chartContainer}>
            <BarChart             // calorie bar chart
              data={barData}
              width={windowWidth*.8}
              height={160}
              fromZero={true}               // let 0 always be bottom of chart
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
          <Text style={styles.chartLabel}>Suggested Foods</Text>
          <View style={styles.scrollContainer}>
            <ScrollView>
              {recommendedFoods.map((food) => {
                return (
                  <CustomRecommendedFoodButton
                    key={food.id}
                    label={food["Food Item"]}
                    diningHall={food["Dining Hall"]}
                    date={food["Date"]}
                    calories={food["Calories"]}
                    carbs={food["Total Carbohydrates"]}
                    protein={food["Protein"]}
                    fat={food["Total Fat"]}
                    meal={food["Meal"]}
                    infoOnPress={() => { }}
                    addOnPress={() => logFood(food)}
                  />);
                })}
            </ScrollView>
          </View>
        </View>        
      </ScrollView>

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.05,
  },
  greetingsContainer: {
    width: windowWidth*0.9,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "500",
    color: myColors.navy,
    paddingVertical: 10,
  },
  text: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "400",
    color: myColors.navy,
  },
  contentContainer: {
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: myColors.white,
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: myColors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  scrollContainer: {
    minHeight: 0,
    maxHeight: 400,
    backgroundColor: myColors.white,
    width: windowWidth*0.8 + 24,
    padding: 12,
    marginBottom: 100,
    borderRadius: 10,
    shadowColor: myColors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  chartLabel: {
      fontWeight: "500",
      color: myColors.navy,
      paddingVertical: 8,
      fontSize: 18
  }
});

const barChartConfig = {
  backgroundGradientFrom: myColors.white,  // our background color
  backgroundGradientTo: myColors.white,
  barPercentage: 1,
  color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`,
  strokeWidth: 2,     // optional, default 3
  decimalPlaces: 0,
}
const ringConfig = {
    backgroundGradientFrom: myColors.white,
    backgroundGradientTo: myColors.white,
    color: (opacity = 3) => `rgba(13, 34, 63, ${opacity})`, // can't change individual ring colors
}
