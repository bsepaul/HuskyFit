import { useRoute } from '@react-navigation/native';
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, FlatList, ScrollView, LogBox } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomDiningButtton from '../../assets/Components/CustomDiningButton'; 

const MealScreen = ({ navigation }) => {

  // Get the day of the week
  const date = new Date();
  const day = date.getDay();

  // Determine if it is a weekend or not
  const isWeekend = day === 6 || day === 0;

  // Get the dining hall name from dining hall page and capitalize the first letter
  const route = useRoute();
  const diningHallName = route.params.dininghall.charAt(0).toUpperCase() + route.params.dininghall.slice(1)

  // Set state variables for condition of showing menus (hide menu if false, show if true)
  const [showBreakfast, setBreakfast] = React.useState(false)
  const [showLunch, setLunch]         = React.useState(false)
  const [showDinner, setDinner] = React.useState(false)
  
  // Set state variables for the list of foods collected from api call
  const [breakfastFoods, setBreakfastFoods] = React.useState([])
  const [lunchFoods, setLunchFoods]         = React.useState([])
  const [dinnerFoods, setDinnerFoods]       = React.useState([])

  // Set the specific list based on the json data from API call and the certain button pressed
  const setFoods = (json, meal) => {

    // Temporary list of foods
    const temp_foods = []

    // Iterate through json data and add all food items onto the temporary list
    json.forEach(element => {
      temp_foods.push(element.Food_Item)
    });

    // Update the correct foods list based on the meal button clicked
    if (meal === "breakfast") {
      setBreakfastFoods(temp_foods);
    } else if (meal === "lunch") {
      setLunchFoods(temp_foods);
    } else if (meal === "dinner") {
      setDinnerFoods(temp_foods);
    }
  }
  
  // Get the meal data from API
  const getMeal = (meal) => {

    // Make API call based on dining hall name and meal selected
    var fetch_str = "https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/" + route.params.dininghall + "/" + meal;
    var requestOptions = {
      method: 'GET',
      headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj"},
      redirect: 'follow'
    };

    // fetch the data
    fetch(fetch_str, requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);
        setFoods(json, meal); // set the food list based on the json data and the meal type
      })
      .catch(error => console.log('error', error));

    // Determine which meal was selected, and set the show condition to the opposite of what it was before
    // If the button was clicked and the menu is currently showing, the variable will be set to false so that the menu goes back to hidden
    if (meal === "breakfast") {
      if (showBreakfast) { setBreakfast(false); } else { setBreakfast(true); }
    } else if (meal === "lunch") {
      if (showLunch) { setLunch(false); } else { setLunch(true); }
    } else if (meal === "dinner") {
      if (showDinner) { setDinner(false); } else { setDinner(true); }
    }

  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{diningHallName}</Text>
      {isWeekend ? <View></View> : <CustomDiningButtton label={'Breakfast'} onPress={() => getMeal('breakfast')} />}
      <View>
        {showBreakfast ?
          <View style={styles.list}>
            <FlatList
              data={breakfastFoods}
              renderItem={({ item }) => (<Text style={styles.item}>{item}</Text>)}
            />
          </View> :
          <Text></Text>
        }
      </View>
  
      <CustomDiningButtton label={isWeekend ? 'Brunch' : 'Lunch'} onPress={() => getMeal('lunch')} />
      <View>
        {showLunch ?
          <View style={styles.list}>
            <FlatList
              data={lunchFoods}
              renderItem={({ item }) => (<Text style={styles.item}>{item}</Text>)}
            />
          </View> :
          <Text></Text>
        }
      </View>
      
      <CustomDiningButtton label={'Dinner'} onPress={() => getMeal('dinner')} />
        <View>
          {showDinner ?
            <View style={styles.list}>
              <FlatList
                data={dinnerFoods}
                renderItem={({ item }) => (<Text style={styles.item}>{item}</Text>)}
              />
            </View> :
            <Text></Text>
          }
        </View>

        <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 30}}>
          <TouchableOpacity onPress={() => navigation.navigate('DiningHalls')}>
            <Text style={{ color:'#AD40F', fontWeight:'700'}}>  Back </Text>
          </TouchableOpacity>
        </View>
          
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 400,
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "600",
    color: myColors.navy,
    marginBottom: 10,
  },
  list: {
    minHeight: 0,
    maxHeight: 200,
    width: 275,
    marginBottom: 15,
    backgroundColor: myColors.lightGrey,
    borderRadius: 10,
  },
  item: {
    fontFamily: "System",
    fontSize: 16,
    color: myColors.navy,
    padding: 5,
  },
});
export default MealScreen
