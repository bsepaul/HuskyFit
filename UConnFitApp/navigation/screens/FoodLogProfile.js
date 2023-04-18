import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import { ProgressChart } from 'react-native-chart-kit';
import React, { useState } from "react";
import fetch from 'node-fetch';
import CustomFoodLogButton from '../../assets/Components/CustomFoodLogButton';
import { Circle, ChevronLeft, ChevronRight } from "react-native-feather";

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const iPad = windowWidth > 500;

export default function FoodLogProfile({navigation}) {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  const [data, setData] = useState([]);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [showFood, setShowFood] = useState(false);
  const [weight, setWeight] = useState(150);

  // Get today's date for the API call
  let today = new Date();
  today = today.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
  today = today.slice(3, 5) + '/' + today.slice(0, 2) + today.slice(5, 10)

  const setFood = (foodData) => {
    var id = 0
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0
    for (let i = 0; i < foodData.length; i++) {
      foodData[i].id = id;
      id += 1;
      totalCarbs += parseFloat(foodData[i]['Carbs']);
      totalProtein += parseFloat(foodData[i]['Protein']);
      totalFat += parseFloat(foodData[i]['Total fat']);
    }
    setCarbs(totalCarbs);
    setProtein(totalProtein);
    setFat(totalFat);
    setData(foodData);
  }

  const fetchFood = async () => {

    // Fetch the food items in user's food log for today's date
    var raw = JSON.stringify({
      "Date": today // mm/dd/yyyy
    });

    var requestOptions = {
      method: 'POST',
      headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
            "Authorization": token},
      body: raw,
      redirect: 'follow'
    };


    fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/food-log", requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result != '') {
          let json = JSON.parse(result);
          let foodData = json["Food_Log"];
          setFood(foodData);
          setShowFood(true);
        } else {
          setShowFood(false);
        }
      })
      .catch(error => console.log('FoodLogProfile food-log error', error));
    
    // Fetch the user's weight for macro calculations
    raw = '';
    
    var requestOptions = {
      method: 'GET',
      headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
            "Authorization": token},
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/user-info", requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result != '') {
          let json = JSON.parse(result);
          if (json.Weight != undefined) {
            setWeight(json.Weight);
          } else {
            setWeight(150); // set weight to average weight of college student if weight was not entered during personal survey
          }
        } else {
          setWeight(150); // set weight to average weight of college student if personal survey was not completed
        }
      })
      .catch(error => console.log('FoodLogProfile user-info error', error));
    
  };

  const handlefood = async () => {
    await fetchFood();
  }

  // Automatically get food log for today from API on screen load
  React.useEffect(() => {
    const getFood = navigation.addListener('focus', () => {
      handlefood();
    });
    return getFood;
  }, [navigation]);

  const Macro = ({ label, color, macroGrams, coefficient }) => {
    var percent = (macroGrams / (weight * coefficient)) * 100;
    var totalIntake = weight * coefficient;
    percent = percent.toFixed(2);
    macroGrams = macroGrams.toFixed(1);
    totalIntake = totalIntake.toFixed(1);
    return (
      <View style={{ flexDirection:'row', padding: 8, alignItems:'center' }}>
        <Circle stroke={color} fill={color} width={26} height={26} />
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={styles.text}>{label}</Text>
          <Text style={{fontFamily:'System', color:myColors.darkGrey, fontSize:11 }}>{macroGrams} / {totalIntake}g</Text>
          <Text style={{fontFamily:'System', color:myColors.darkGrey, fontSize:11 }}>{percent}%</Text>
        </View>
      </View>
    );
  }


  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Food Log</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Macronutrient Targets</Text>           
          </View>
          <View style={styles.chartContainer}>
            <ProgressChart        // ring chart
              data={{
                labels: ['Fats', 'Protein', 'Carbs'],
                data: [Math.min(1, (fat / (weight * 0.4))), Math.min(1, (protein / (weight * 1.0))), Math.min(1, (carbs / (weight*1.4)))]
              }}
              width={iPad ? 300 : windowWidth * .45}
              height={200}
              strokeWidth={15}    // ring thickness, should decrease with more rings
              radius={30}         // default 32
              chartConfig={{
                backgroundGradientFrom: myColors.white,
                backgroundGradientTo: myColors.white,
                decimalPlaces: 3,
                color: (opacity = 1) => `rgba(13, 34, 63, ${opacity})`, // can't change individual ring colors
              }}
              hideLegend= {true}
            />
            <View style={{width:windowWidth*0.35}}>
              <Macro label={"Carbs"} color={'#303E55'} macroGrams={carbs} coefficient={1.4} />
              <Macro label={"Protein"} color={'#4E5A6D'} macroGrams={protein} coefficient={1.0} />
              <Macro label={"Fat"} color={'#6C7686'} macroGrams={fat} coefficient={0.4} />
            </View>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Food Logged</Text>           
          </View>
          {showFood ? 
            <View style={{ alignItems: 'center' }}>
              <View style={styles.list}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {data.map((food) => {
                    return (
                      <CustomFoodLogButton
                        key={food.id}
                        label={food["Food item"]}
                        calories={food["Calories"]}
                        carbs={food["Carbs"]}
                        protein={food["Protein"]}
                        fat={food["Total fat"]}
                        meal={food["Meal"]}
                      />);
                    })}
                </ScrollView>
              </View>
            </View>
            :
            <View>
              <Text style={styles.text}>No food logged yet today!</Text>
            </View>
          }
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { token: token })}>
              <View style={{flexDirection:'row', paddingTop:10}}>
                <ChevronLeft stroke={myColors.navy} strokeWidth={2} width={18} height={18} />
                <Text style={styles.text}>Back to Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>     
        <View style={{height:110}}></View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  content: {
    paddingHorizontal: windowWidth*0.05
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "500",
    color: myColors.navy,
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontFamily: 'System',
    color: myColors.navy,
    fontSize: 16,
    fontWeight: '500'
  },
  subtitle: {
    fontWeight: "400",
    color: myColors.white,
    paddingVertical: 8,
    fontSize: 16
  },
  subtitleContainer: {
    backgroundColor: myColors.navy,
    paddingHorizontal: 15,
    marginBottom: 6,
    marginTop:4,
    borderRadius: 18,
  },
  contentContainer: {
    paddingHorizontal: windowWidth*0.05,
    alignItems: 'center'
  },
  chartContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: myColors.white,
    padding: 12,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: myColors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  list: {
    alignItems: 'center',
    minHeight: 0,
    maxHeight: windowHeight*0.3,
    width: iPad ? 500 : windowWidth*0.85,
    marginTop: 5,
    marginBottom: 10,
    paddingTop: 8,
    backgroundColor: myColors.veryLightGrey,
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
})