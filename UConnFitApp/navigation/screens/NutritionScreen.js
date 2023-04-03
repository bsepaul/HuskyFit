import { useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, Dimensions, FlatList, TextInput } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import { ChevronLeft, Check, X } from "react-native-feather";

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

    // get dining hall name from route and format it
    const diningHallName = route.params.dininghall.charAt(0).toUpperCase() + route.params.dininghall.slice(1)

    // Set state variables for condition of showing menus (hide menu if false, show if true)
    const [allFoods, setAllFoods] = React.useState([]);
    const [foods, setFoods] = React.useState([]);
    const [selectedFoodID, setSelectedFoodID] = React.useState(route.params.food.id)
    // make a set height for nutrition facts
    const factHeight = 200;

    const allergens = (allergenString, index) => {
        const allergenList = allergenString.split(", ")
        const allergenMap = [];
        for (let i = 0; i < allergenList.length; i++) {
            let newIndex = index + ((i+1) / 10);
            allergenMap.push({id:newIndex, allergen:allergenList[i]})
        }
        return allergenMap;
    }

    const allergenRender = useCallback(({ item }) => (
        <View style={{
            backgroundColor: myColors.navy,
            marginRight: 5,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 13,
            height: 26,
            flexDirection: 'row',
            alignItems:'center',
        }}>
            <Image
                source={getIcon(item.allergen)}
                style={{
                    width: 12,
                    height: 12,
                    tintColor: myColors.white,
                    marginRight: 3,
                }}
            />
            <Text style={{
                color: myColors.white,
                fontFamily: 'System',
                fontSize: 14,
            }}>{item.allergen}</Text>
        </View>
    ), []);

    const getIcon = (allergen) => {
        let icon = '';
        if (allergen === 'Fish') {
            icon = require('../../assets/icons/food/Allergens/fish.png');
        } else if (allergen === 'Soybeans') {
            icon = require('../../assets/icons/food/Allergens/soy.png');
        } else if (allergen === 'Wheat') {
            icon = require('../../assets/icons/food/Allergens/wheat.png');
        } else if (allergen === 'Gluten') {
            icon = require('../../assets/icons/food/Allergens/gluten.png');
        } else if (allergen === 'Milk') {
            icon = require('../../assets/icons/food/Allergens/milk.png');
        } else if (allergen === 'Tree Nuts') {
            icon = require('../../assets/icons/food/Allergens/nut.png');
        } else if (allergen === 'Eggs') {
            icon = require('../../assets/icons/food/Allergens/eggs.png');
        } else if (allergen === 'Sesame') {
            icon = require('../../assets/icons/food/Allergens/sesame.png');
        } else if (allergen === 'Crustacean Shellfish') {
            icon = require('../../assets/icons/food/Allergens/crustacean.png');
        } else if (allergen === 'Coconut') {
            icon = require('../../assets/icons/food/Allergens/coconut.png');
        } else {
            icon = require('../../assets/icons/food/Allergens/allergen.png');
        }
        return icon;
    }

    // formatting the nutrition facts
    const getNutrition = useCallback(({item}) => (
        <View key={item["id"]} style={{ width:windowWidth, height:factHeight, borderBottomWidth:1, borderBottomColor:myColors.veryLightGrey, paddingHorizontal:windowWidth*0.05, paddingBottom: 15, backgroundColor:(item["id"] === selectedFoodID ? myColors.veryLightGrey : null)}}>
            <Text style={styles.foodTitle}>{item["Food Item"]}</Text>
            {(item["Allergens"] === "") ?
                <View>
                    <Text style={styles.subTitle}>Allergen Free</Text>
                </View> :
                <View style={styles.allergens}>
                    <FlatList
                        data={allergens(item["Allergens"], item["id"])}
                        renderItem={allergenRender}
                        keyExtractor={item => item["id"]}
                        horizontal={true}
                    />                    
                </View>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Serving Size: </Text><Text style={styles.nutritionText}>{item["Serving Size"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Calories: </Text><Text style={styles.nutritionText}>{item["Calories"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Fat: </Text><Text style={styles.nutritionText}>{item["Total Fat"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Saturated Fat: </Text><Text style={styles.nutritionText}>{item["Saturated Fat"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Trans Fat: </Text><Text style={styles.nutritionText}>{item["Trans Fat"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Cholesterol: </Text><Text style={styles.nutritionText}>{item["Cholesterol"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Sodium: </Text><Text style={styles.nutritionText}>{item["Sodium"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Carbohydrates: </Text><Text style={styles.nutritionText}>{item["Total Carbohydrates"]}</Text></View>
                </View>
                <View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Dietary Fiber: </Text><Text style={styles.nutritionText}>{item["Dietary Fiber"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Total Sugars: </Text><Text style={styles.nutritionText}>{item["Total Sugars"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Added Sugars: </Text><Text style={styles.nutritionText}>{item["Added Sugars"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Protein: </Text><Text style={styles.nutritionText}>{item["Protein"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Vitamin D: </Text><Text style={styles.nutritionText}>{item["Vitamin D"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Calcium: </Text><Text style={styles.nutritionText}>{item["Calcium"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Iron: </Text><Text style={styles.nutritionText}>{item["Iron"]}</Text></View>
                    <View style={styles.nutritionFact}><Text style={styles.nutritionText}>Potassium: </Text><Text style={styles.nutritionText}>{item["Potassium"]}</Text></View>
                </View>
            </View>
        </View>
    ), []);
    
    // On screen load, combine all foods into one list and get the index of the food that the user selected
    const getFoods = async () => {
        // set first index of food to 0
        var i = 0;
        // create empty list to temporarily store all foods
        const allTempFoods = [];
        // push all breakfast foods onto a temporary list
        for (let index = 0; index < breakfastFoods.length; index++) {
            if (breakfastFoods[index]["id"] === selectedFoodID) {
                setSelectedFoodID(i);
            }
            breakfastFoods[index]["id"] = i;
            allTempFoods.push(breakfastFoods[index]);
            i += 1;
        }

        // push all lunch foods onto a temporary list
        for (let index = 0; index < lunchFoods.length; index++) {
            if (lunchFoods[index]["id"] === selectedFoodID) {
                setSelectedFoodID(i);
            }
            lunchFoods[index]["id"] = i;
            allTempFoods.push(lunchFoods[index]);
            i += 1;
        }
        // push all dinner foods onto a temporary list
        for (let index = 0; index < dinnerFoods.length; index++) {
            if (dinnerFoods[index]["id"] === selectedFoodID) {
                setSelectedFoodID(i);
            }
            dinnerFoods[index]["id"] = i;
            allTempFoods.push(dinnerFoods[index]);
            i += 1;
        }
        setAllFoods(allTempFoods);
        setFoods(allTempFoods);
    }

    const getAllFoods = async () => {
        await getFoods();
    }

    React.useEffect(() => {
        const foods = navigation.addListener('focus', () => {
            getAllFoods();
        });
        return foods;
    }, [navigation]);

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

    const searchFood = (input) => {
        let data = allFoods;
        let searchData = data.filter((item) => {
            return item["Food Item"].toLowerCase().includes(input.toLowerCase())
        });
        setFoods(searchData);
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
            <View style={styles.filters}>
                <TextInput
                    style={{
                        paddingVertical: 5,
                    }}
                    fontSize={14}
                    placeholderTextColor={myColors.grey}
                    autoCapitalize="none"
                    placeholder='Search Food'
                    onChangeText={(input)=>{searchFood(input)}}
                >
                </TextInput>
            </View>
            <FlatList
                data={foods}
                renderItem={getNutrition}
                style={{ flex: 1 }}
                ListFooterComponent={backButton}
                keyExtractor={item => item.id}
                extraData={selectedFoodID}
                getItemLayout={getItemLayout}
                // initialScrollIndex={selectedFoodID}
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
    subTitle: {
        fontFamily: "System",
        fontSize: 14,
        fontWeight: "300",
        color: myColors.navy,
        paddingBottom: 6,
    },
    filters: {
        marginHorizontal: windowWidth * 0.05,
        padding: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: myColors.navy,
        borderRadius: 12,
    },
    nutritionFact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth*0.42,
    },
    nutritionText: {
        fontFamily: "System",
        fontSize: 13,
        fontWeight: "300",
        color: myColors.darkGrey,
    },
    allergens: {
        height: 30,
    },
});
export default NutritionScreen
