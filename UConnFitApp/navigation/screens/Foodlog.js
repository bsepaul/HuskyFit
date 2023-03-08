import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import { ProgressChart } from 'react-native-chart-kit';
import React, { useState } from "react";
import fetch from 'node-fetch';
import CustomFoodLogButton from '../../assets/Components/CustomFoodLogButton';
import CustomDiningButton from '../../assets/Components/CustomDiningButton';
import { Circle, ChevronLeft } from "react-native-feather";
// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Foodlog({navigation, label, inverse=false}) {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  const [data, setData] = useState([]);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);

  // Get today's date for the API call
  let today = new Date();
  today = today.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
  today = today.slice(3, 5) + '/' + today.slice(0, 2) + today.slice(5, 10)

  // THIS IS A HARDCODED WEIGHT - NEED TO GET FROM API
  const weight = 140;

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
        let json = JSON.parse(result);
        let foodData = json["Food_Log"];
        setFood(foodData);
      })
      .catch(error => console.log('error', error));
  };

  const handlefood = async () => {
    fetchFood();
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
      <View style={{ flexDirection:'row', padding: 10, alignItems:'center' }}>
        <Circle stroke={color} fill={color} width={26} height={26} />
        <View>
          <Text style={styles.text}>{label}</Text>
          <Text style={{ paddingHorizontal: 5, fontFamily:'System', color:myColors.darkGrey, fontSize:12 }}>{macroGrams} / {totalIntake}g</Text>
          <Text style={{ paddingHorizontal: 5, fontFamily:'System', color:myColors.darkGrey, fontSize:12 }}>{percent}%</Text>
        </View>
      </View>
    );
  }


  return (
    <View style={styles.content}>
      <SafeAreaView>
        <Text style={styles.title}>Food Log</Text>
        <Text style={styles.subtitle}>Macronutrient Targets</Text>
        <View style={{alignItems:'center'}}>
          <ProgressChart        // ring chart
            data={{
              labels: ['Fats', 'Protein', 'Carbs'],
              data: [Math.min(1, (fat / (weight * 0.4))), Math.min(1, (protein / (weight * 1.0))), Math.min(1, (carbs / (weight*1.4)))]
            }}
            width={windowWidth * .90}
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
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Macro label={"Carbs"} color={'#303E55'} macroGrams={carbs} coefficient={1.4} />
            <Macro label={"Protein"} color={'#4E5A6D'} macroGrams={protein} coefficient={1.0} />
            <Macro label={"Fat"} color={'#6C7686'} macroGrams={fat} coefficient={0.4} />
          </View>
        </View>
        <Text style={styles.subtitle}>Food Logged</Text>
        <View style={{alignItems:'center'}}>
          <View style={styles.list}>
            <ScrollView>
              {data.map((food) => {
                return (
                  <CustomFoodLogButton
                    key={food.id}
                    label={food["Food item"]}
                    infoOnPress={() => {}}
                    addOnPress={() => {}}
                  />); 
              })}
            </ScrollView>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs', { screen: 'Dine', params: { screen: 'DiningHalls', params: { token: token } } })}>
            <View style={{flexDirection:'row', paddingTop:10}}>
              <ChevronLeft stroke={myColors.navy} strokeWidth={2} width={18} height={18} />
              <Text style={styles.text}>View Menus</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}


const styles = StyleSheet.create({
  content: {
    backgroundColor: myColors.offwhite,
    paddingHorizontal: windowWidth*0.02
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "600",
    color: myColors.navy,
    marginBottom: 15,
    marginTop: 20,
    paddingLeft: windowWidth*0.05,
  },
  text: {
    paddingHorizontal: 5,
    fontFamily: 'System',
    color: myColors.navy,
    fontSize: 16,
    fontWeight: '500'
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 20,
    fontWeight: "500",
    color: myColors.navy,
    marginBottom: 5,
    paddingLeft: windowWidth*0.05,
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
})