import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Modal, SafeAreaView, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import { ChevronLeft, Check } from "react-native-feather";
import CustomButtonArrow from '../../assets/Components/CustomButtonArrow'; 
import CustomFoodItemButton from '../../assets/Components/CustomFoodItemButton';

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MealScreen = ({ navigation }) => {

  // Get the token and dining hall name from dining hall page and capitalize the first letter
  const route = useRoute();
  const token = route.params.token;
  const diningHallName = route.params.dininghall.charAt(0).toUpperCase() + route.params.dininghall.slice(1)
  
  // Set state variables for condition of showing menus (hide menu if false, show if true)
  const [showBreakfast, setBreakfast] = React.useState(false)
  const [showLunch, setLunch]         = React.useState(false)
  const [showDinner, setDinner] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false);
  
  // get dates of yesterday, today and tomorrow
  var yesterday = new Date();
  var today = new Date();
  var tomorrow = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isYesterdayWeekend = yesterday.getDay() === 6 || yesterday.getDay() === 0;
  const isTodayWeekend = today.getDay() === 6 || today.getDay() === 0;
  const isTomorrowWeekend = tomorrow.getDay() === 6 || tomorrow.getDay() === 0;

  // convert dates into eastern time zone
  const yesterdayEST = yesterday.toLocaleString('en-US', { timeZone: 'America/New_York' }).split("/");
  const todayEST     = today.toLocaleString('en-US', { timeZone: 'America/New_York' }).split("/");
  const tomorrowEST = tomorrow.toLocaleString('en-US', { timeZone: 'America/New_York' }).split("/");
  
  var yesterdayDate = yesterday.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
  var todayDate = today.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
  var tomorrowDate = tomorrow.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];

  yesterdayDate = yesterdayDate.slice(3, 5) + '/' + yesterdayDate.slice(0, 2) + yesterdayDate.slice(5, 10)
  todayDate     = todayDate.slice(3, 5) + '/' + todayDate.slice(0, 2) + todayDate.slice(5, 10)
  tomorrowDate  = tomorrowDate.slice(3, 5) + '/' + tomorrowDate.slice(0, 2) + tomorrowDate.slice(5, 10)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // get month string for yesterday, today and tomorrow
  const yesterdayMonth = months[parseInt(yesterdayEST[0]) - 1];
  const todayMonth = months[parseInt(todayEST[0]) - 1];
  const tomorrowMonth = months[parseInt(tomorrowEST[0]) - 1];

  // get day string of yesterday, today and tomorrow
  const yesterdayDay = yesterdayEST[1];
  const todayDay = todayEST[1];
  const tomorrowDay = tomorrowEST[1];
  
  // Set state variables for the list of foods collected from api call
  const [breakfastFoods, setBreakfastFoods] = React.useState([])
  const [lunchFoods, setLunchFoods]         = React.useState([])
  const [dinnerFoods, setDinnerFoods]       = React.useState([])
  
  // make state variables so we can check the current selected button and pass it onto MealScreen
  const [isYesterday, setIsYesterday] = React.useState(false);
  const [isToday, setIsToday] = React.useState(true);
  const [isTomorrow, setIsTomorrow] = React.useState(false);
  const [isWeekend, setIsWeekend] = React.useState(isTodayWeekend);
  const [selectedDate, setSelectedDate] = React.useState();

  var i = 0

  // Set the specific list based on the json data from API call and the certain button pressed
  const setFoods = (json, meal) => {
    
    // Temporary list of foods
    const temp_foods = []
    // Iterate through json data and add all food items onto the temporary list
    json.forEach(element => {
      element["id"] = i;
      i += 1;
      temp_foods.push(element);
    });

    if (meal === "breakfast") {
      setBreakfastFoods(temp_foods);
    } else if (meal === "lunch") {
      setLunchFoods(temp_foods);
    } else if (meal === "dinner") {
      setDinnerFoods(temp_foods);
    }
  }

  const getMeal = async (meal, date) => {
    // Make API call based on dining hall name and meal selected
    var fetch_str = "https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/" + route.params.dininghall + "/" + meal;
    
    var raw = JSON.stringify({
      "Date": date // mm/dd/yyyy
    });

    var requestOptions = {
      method: 'POST',
      headers: { "x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj" },
      body: raw,
      redirect: 'follow'
    };

    // fetch the data
    fetch(fetch_str, requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);
        setFoods(json, meal); // set the food list based on the json data and the meal type
      })
      .catch(error => console.log('MealScreen meal error', error)); 
  };

  const showMeal = (meal) => {
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

  const goToNutrition = (food) => {
    navigation.navigate('NutritionScreen', { token: token, food: food, breakfastFoods: breakfastFoods, lunchFoods: lunchFoods, dinnerFoods: dinnerFoods, dininghall: diningHallName })
  }

  const updateFood = (selection, date) => {
    if (selection === "yesterday") {
      setIsYesterday(true);
      setIsToday(false);
      setIsTomorrow(false);
      setIsWeekend(isYesterdayWeekend);
      setSelectedDate(yesterdayDate);
    } else if (selection === "today") {
      setIsYesterday(false);
      setIsToday(true);
      setIsTomorrow(false);
      setIsWeekend(isTodayWeekend);
      setSelectedDate(todayDate);
    } else if (selection === "tomorrow") {
      setIsYesterday(false);
      setIsToday(false);
      setIsTomorrow(true);
      setIsWeekend(isTomorrowWeekend);
      setSelectedDate(tomorrowDate);

    }
    getMeal('breakfast', date);
    getMeal('lunch', date);
    getMeal('dinner', date);
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
      "Meal": food["Meal"],
      "Date": selectedDate,
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
      .catch(error => console.log('MealScreen food-log error', error));

    setModalVisible(true);

  }

  // Automatically get all meals for today from API on screen load
  React.useEffect(() => {
    updateFood("today", todayDate);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
            onShow={() => {
              setTimeout(() => {  setModalVisible(false); }, 500);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Check stroke={myColors.navy} width={70} height={70} />
              <Text style={styles.modalText}>Food logged!</Text>
            </View>
          </View>
        </Modal>
        <View style={{flexDirection:'row', justifyContent: 'flex-start', alignContent:'center', paddingRight:46}}>
            <TouchableOpacity
                style={{ paddingHorizontal: 5 }}
                onPress={() => navigation.navigate('DiningHalls', { token: token, dininghall: route.params.dininghall })} >
              <ChevronLeft stroke={myColors.navy} strokeWidth={2} width={36} height={36} />
            </TouchableOpacity>
            <Text style={styles.title}>{diningHallName}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom:10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: (isYesterday ? myColors.navy : myColors.lightGrey),
              marginHorizontal: 10,
              marginTop: 10,
              width: 65,
              paddingVertical: 15,
              borderRadius: 15,
              alignItems: 'center',
            }}
            onPress={() => updateFood("yesterday", yesterdayDate)}>
            <Text style={styles.month}>{yesterdayMonth}</Text>
            <Text  style={styles.day}>{yesterdayDay}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: (isToday ? myColors.navy : myColors.lightGrey),
              marginHorizontal: 10,
              marginTop: 10,
              width: 65,
              paddingVertical: 15,
              borderRadius: 15,
              alignItems: 'center',
            }}
            onPress={() => updateFood("today", todayDate)}>
            <Text style={styles.month}>{todayMonth}</Text>
            <Text  style={styles.day}>{todayDay}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: (isTomorrow ? myColors.navy : myColors.lightGrey),
              marginHorizontal: 10,
              marginTop: 10,
              width: 65,
              paddingVertical: 15,
              borderRadius: 15,
              alignItems: 'center',
            }}
            onPress={() => updateFood("tomorrow", tomorrowDate)}>
            <Text style={styles.month}>{tomorrowMonth}</Text>
            <Text  style={styles.day}>{tomorrowDay}</Text>
          </TouchableOpacity>
        </View>

        {isWeekend ? <View></View> : <CustomButtonArrow label={'Breakfast'} arrow={showBreakfast ? "up" : "down"} hasIcon={true} icon={require('../../assets/icons/food/breakfast.png')} onPress={() => showMeal('breakfast')} />}
        <View>
          {showBreakfast && !isWeekend ?
            <View style={styles.list}>
              <ScrollView showsVerticalScrollIndicator={false} >
                {breakfastFoods.map((food) => {
                  return (
                    <CustomFoodItemButton
                      key={food.id}
                      label={food["Food Item"]}
                      infoOnPress={() => goToNutrition(food)}
                      addOnPress={() => logFood(food)}
                    />); 
                })}
              </ScrollView>
            </View> :
            <View></View>
          }
        </View>
    
        <CustomButtonArrow label={isWeekend ? 'Brunch' : 'Lunch'} arrow={showLunch ? "up" : "down"} hasIcon={true} icon={require('../../assets/icons/food/lunch.png')}  onPress={() => showMeal('lunch')} />
        <View>
          {showLunch ?
            <View style={styles.list}>
              <ScrollView showsVerticalScrollIndicator={false} >
                {lunchFoods.map((food) => {
                  return (
                    <CustomFoodItemButton
                      key={food.id}
                      label={food["Food Item"]}
                      infoOnPress={() => goToNutrition(food)}
                      addOnPress={() => logFood(food)}
                    />);
                })}
              </ScrollView>
            </View> :
            <View></View>
          }
        </View>
        
        <CustomButtonArrow label={'Dinner'} arrow={showDinner ? "up" : "down"} hasIcon={true} icon={require('../../assets/icons/food/dinner.png')}  onPress={() => showMeal('dinner')} />
          <View>
            {showDinner ?
              <View style={styles.list}>
                <ScrollView showsVerticalScrollIndicator={false} >
                {dinnerFoods.map((food) => {
                  return (
                    <CustomFoodItemButton
                      key={food.id}
                      label={food["Food Item"]}
                      infoOnPress={() => goToNutrition(food)}
                      addOnPress={() => logFood(food)}
                    />);
                })}
              </ScrollView>
              </View> :
              <View></View>
            }
        </View>
        <CustomButtonArrow label={'View Food Log'} inverse={true} arrow={"right"} hasIcon={true} icon={require('../../assets/icons/dine.png')} onPress={() => navigation.navigate('FoodLogDine', { token: token, dininghall: route.params.dininghall })}/>
        <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 30}}>
          <TouchableOpacity onPress={() => navigation.navigate('DiningHalls', {token: token})}>
            <Text style={{ color:myColors.navy, fontWeight:'500', marginTop: 10}}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    marginHorizontal: windowWidth * 0.125,
    paddingTop: windowHeight * 0.15,
    paddingBottom: windowHeight * 0.1
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
    maxHeight: 250,
    width: windowWidth*0.75,
    marginTop: 5,
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
  },
  item: {
    fontFamily: "System",
    fontSize: 16,
    color: myColors.navy,
    padding: 5,
  },
  month: {
    fontFamily: 'System',
    fontSize: 16,
    color: myColors.white,
  },
  day: {
    fontFamily: 'System',
    fontSize: 28,
    color: myColors.white,
    fontWeight: "600",
  },
  dateButton: {
    marginHorizontal: 10,
    marginTop: 10,
    width: 65,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.92,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "500",
    color: myColors.navy,
    paddingVertical: 8,
    paddingHorizontal:8,
  },
});
export default MealScreen
