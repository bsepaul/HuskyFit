import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, TextInput, Dimensions, FlatList } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import { ChevronLeft } from "react-native-feather";
import NutritionButton from '../../assets/Components/NutritionButton';

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NutritionScreen = ({ navigation }) => {

    // Get token from route
    const route = useRoute();
    const token = route.params.token

    // collect all foods from route
    const breakfastFoods = route.params.breakfastFoods;
    const lunchFoods = route.params.lunchFoods;
    const dinnerFoods = route.params.dinnerFoods;

    // set variable for the selected food id
    var selectedFoodID = route.params.food.id;

    // get dining hall name from route and format it
    const diningHallName = route.params.dininghall.charAt(0).toUpperCase() + route.params.dininghall.slice(1)

    // Set state variables for condition of showing menus (hide menu if false, show if true)
    const [allFoods, setAllFoods] = React.useState([]);
    // make a set height for nutrition facts
    const factHeight = 180;

    // formatting the nutrition facts
    const getNutrition = (food) => {
        const backgroundColor = food.index === selectedFoodID ? myColors.lightGrey : null;
        const foodItem = food.item
        return (
            <View style={{ width:windowWidth, height:factHeight, borderBottomWidth:1, borderBottomColor:myColors.lightGrey, paddingHorizontal:windowWidth*0.05, paddingBottom: 15, backgroundColor:backgroundColor}}>
                <Text style={styles.foodTitle}>{foodItem["Food Item"]}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Serving Size: </Text><Text style={styles.nutritionText}>{foodItem["Serving Size"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Calories: </Text><Text style={styles.nutritionText}>{foodItem["Calories"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Fat: </Text><Text style={styles.nutritionText}>{foodItem["Total Fat"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Saturated Fat: </Text><Text style={styles.nutritionText}>{foodItem["Saturated Fat"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Trans Fat: </Text><Text style={styles.nutritionText}>{foodItem["Trans Fat"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Cholesterol: </Text><Text style={styles.nutritionText}>{foodItem["Cholesterol"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Sodium: </Text><Text style={styles.nutritionText}>{foodItem["Sodium"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Carbohydrates: </Text><Text style={styles.nutritionText}>{foodItem["Total Carbohydrates"]}</Text></View>
                    </View>
                    <View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Dietary Fiber: </Text><Text style={styles.nutritionText}>{foodItem["Dietary Fiber"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Sugars: </Text><Text style={styles.nutritionText}>{foodItem["Total Sugars"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Added Sugars: </Text><Text style={styles.nutritionText}>{foodItem["Added Sugars"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Protein: </Text><Text style={styles.nutritionText}>{foodItem["Protein"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Vitamin D: </Text><Text style={styles.nutritionText}>{foodItem["Vitamin D"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Calcium: </Text><Text style={styles.nutritionText}>{foodItem["Calcium"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Iron: </Text><Text style={styles.nutritionText}>{foodItem["Iron"]}</Text></View>
                        <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Potassium: </Text><Text style={styles.nutritionText}>{foodItem["Potassium"]}</Text></View>
                    </View>
                </View>
            </View>
        );
    }
    
    // On screen load, combine all foods into one list and get the index of the food that the user selected
    React.useEffect(() => {
        // set first index of food to 0
        var i = 0;
        // create empty list to temporarily store all foods
        const allTempFoods = [];
        // push all breakfast foods onto a temporary list
        breakfastFoods.forEach(food => {
            if (food.id === selectedFoodID) {
                selectedFoodID = i;
            }
            food.id = i;
            allTempFoods.push(food);
            i += 1;
        });
        // push all lunch foods onto a temporary list
        lunchFoods.forEach(food => {
            if (food.id === selectedFoodID) {
                selectedFoodID = i;
            }
            food.id = i;
            allTempFoods.push(food);
            i += 1;
        });
        // push all dinner foods onto a temporary list
        dinnerFoods.forEach(food => {
            if (food.id === selectedFoodID) {
                selectedFoodID = i;
            }
            food.id = i;
            allTempFoods.push(food);
            i += 1;
        });
        setAllFoods(allTempFoods);
    }, []);

    const getItemLayout = (data, index) => (
        { length: factHeight, offset: factHeight*index, index }
    )

    const backButton = () => {
        return (
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:10, marginBottom: 100}}>
                <TouchableOpacity onPress={() => navigation.navigate('MealScreen', {token: token, dininghall: route.params.dininghall})}>
                <Text style={{ color:myColors.navy, fontWeight:'700'}}>Back</Text>
                </TouchableOpacity>
            </View >
        )
    }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={{flexDirection:'row', justifyContent: 'flex-start', alignContent:'center', paddingHorizontal:windowWidth*0.05}}>
                <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    onPress={() => navigation.navigate('MealScreen', { token: token, dininghall: route.params.dininghall })} >
                    <ChevronLeft stroke={myColors.navy} strokeWidth={2} width={36} height={36} />
                </TouchableOpacity>
                <Text style={styles.title}>{diningHallName}</Text>
            </View>
            <FlatList
                data={allFoods}
                renderItem={getNutrition}
                style={{ flex: 1 }}
                ListFooterComponent={backButton}
                keyExtractor={food => food.id}
                extraData={selectedFoodID}
                getItemLayout={getItemLayout}
                initialScrollIndex={selectedFoodID}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        paddingBottom: windowHeight * 0.1,
    },
    title: {
        fontFamily: "System",
        fontSize: 30,
        fontWeight: "600",
        color: myColors.navy,
        marginBottom: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: myColors.offWhite,
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
        width: windowWidth*0.42,
    },
    nutritionText: {
        fontFamily: "System",
        fontSize: 13,
        fontWeight: "350",
        color: myColors.darkGrey,
    },
});
export default NutritionScreen
