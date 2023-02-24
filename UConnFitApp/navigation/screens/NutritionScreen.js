import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import NutritionButton from '../../assets/Components/NutritionButton';

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NutritionScreen = ({ navigation }) => {
    // Get the day of the week
    const date = new Date();
    const day = date.getDay();

    // Determine if it is a weekend or not
    const isWeekend = day === 6 || day === 0;

    // Get token from route
    const route = useRoute();
    const token = route.params.token

    const breakfastFoods = route.params.breakfastFoods;
    const lunchFoods = route.params.lunchFoods;
    const dinnerFoods = route.params.dinnerFoods;
    const diningHallName = route.params.dininghall.charAt(0).toUpperCase() + route.params.dininghall.slice(1)
    const meal           = route.params.food.Meal.charAt(0).toUpperCase() + route.params.food.Meal.slice(1)

    // Set state variables for condition of showing menus (hide menu if false, show if true)
    const [showBreakfast, setBreakfast] = React.useState(true)
    const [showLunch, setLunch]         = React.useState(true)
    const [showDinner, setDinner]       = React.useState(true)


    const showNutrition = (meal) => {
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

    const getNutrition = (food) => {
        return (
            <View style={{width:windowWidth*0.85, paddingBottom: 15,}}>
                <Text style={styles.foodTitle}>{food["Food Item"]}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Serving Size: </Text><Text style={styles.nutritionText}>{food["Serving Size"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Calories: </Text><Text style={styles.nutritionText}>{food["Calories"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Fat: </Text><Text style={styles.nutritionText}>{food["Total Fat"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Saturated Fat: </Text><Text style={styles.nutritionText}>{food["Saturated Fat"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Trans Fat: </Text><Text style={styles.nutritionText}>{food["Trans Fat"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Cholesterol: </Text><Text style={styles.nutritionText}>{food["Cholesterol"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Sodium: </Text><Text style={styles.nutritionText}>{food["Sodium"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Carbohydrates: </Text><Text style={styles.nutritionText}>{food["Total Carbohydrates"]}</Text></View>
                    </View>
                    <View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Dietary Fiber: </Text><Text style={styles.nutritionText}>{food["Dietary Fiber"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Sugars: </Text><Text style={styles.nutritionText}>{food["Total Sugars"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Added Sugars: </Text><Text style={styles.nutritionText}>{food["Added Sugars"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Protein: </Text><Text style={styles.nutritionText}>{food["Protein"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Vitamin D: </Text><Text style={styles.nutritionText}>{food["Vitamin D"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Calcium: </Text><Text style={styles.nutritionText}>{food["Calcium"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Iron: </Text><Text style={styles.nutritionText}>{food["Iron"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Potassium: </Text><Text style={styles.nutritionText}>{food["Potassium"]}</Text></View>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>{diningHallName}</Text>
            {isWeekend ? <View></View> : <NutritionButton label={'Breakfast'} arrow={showBreakfast ? "up" : "down"} onPress={() => showNutrition('breakfast')} />}
            <View>
            {showBreakfast ?
                <View>
                    {breakfastFoods.map((food) => { return <View>{getNutrition(food)}</View>; })}
                </View> :
                <Text></Text>
            }
            </View>
        
            <NutritionButton label={isWeekend ? 'Brunch' : 'Lunch'} arrow={showLunch ? "up" : "down"} onPress={() => showNutrition('lunch')} />
            <View>
            {showLunch ?
                <View>
                            {lunchFoods.map((food) => { return <View>{getNutrition(food)}</View>; })}
                </View> :
                <Text></Text>
            }
            </View>
            
            <NutritionButton label={'Dinner'} arrow={showDinner ? "up" : "down"} onPress={() => showNutrition('dinner')} />
            <View>
                {showDinner ?
                <View>
                    {dinnerFoods.map((food) => { return (getNutrition(food)); })}
                </View> :
                <Text></Text>
                }
            </View>

            <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 30}}>
                <TouchableOpacity onPress={() => navigation.navigate('DiningHalls', {token: token})}>
                <Text style={{ color:'#AD40F', fontWeight:'700'}}>  Back </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        paddingBottom: windowHeight * 0.1
    },
    title: {
        fontFamily: "System",
        fontSize: 30,
        fontWeight: "600",
        color: myColors.navy,
        marginBottom: 10,
    },
    foodTitle: {
        fontFamily: "System",
        fontSize: 16,
        fontWeight: "500",
        color: myColors.navy,
        paddingTop: 10,
        paddingBottom: 3,
    },
    nutritionFact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth*0.4,
    },
    nutritionText: {
        fontFamily: "System",
        fontSize: 12,
        fontWeight: "350",
        color: myColors.darkGrey,
    },
});
export default NutritionScreen
