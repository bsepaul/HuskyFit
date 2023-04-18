import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, Dimensions, FlatList, TextInput, Modal } from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import { ChevronLeft, Check, PlusCircle } from "react-native-feather";
import CustomButton from '../../assets/Components/CustomButton';

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const iPad = windowWidth > 500;

const NutritionScreen = ({ navigation }) => {

    // Get token from route
    const route = useRoute();
    const token = route.params.token;

    // collect all foods from route
    const breakfastFoods = route.params.breakfastFoods;
    const lunchFoods = route.params.lunchFoods;
    const dinnerFoods = route.params.dinnerFoods;
    const date = route.params.date;

    // get dining hall name from route and format it
    const diningHallName = route.params.dininghall.charAt(0).toUpperCase() + route.params.dininghall.slice(1)

    // Set state variables for condition of showing menus (hide menu if false, show if true)
    const [allFoods, setAllFoods] = React.useState([]);
    const [foods, setFoods] = React.useState([]);
    const [selectedFoodID, setSelectedFoodID] = React.useState(route.params.food.id)
    const [modalVisible, setModalVisible] = React.useState(false);

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
            borderRadius: iPad ? 16 : 13,
            height: iPad ? 30 : 26,
            flexDirection: 'row',
            alignItems:'center',
        }}>
            <Image
                source={getIcon(item.allergen)}
                style={{
                    width: iPad ? 18 : 12,
                    height: iPad ? 18 : 12,
                    tintColor: myColors.white,
                    marginRight: 3,
                }}
            />
            <Text style={{
                color: myColors.white,
                fontFamily: 'System',
                fontSize: iPad ? 16 : 14,
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
        "Date": date,
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
        .catch(error => console.log('HomeScreen food-log error', error));

        setModalVisible(true);

    }

    // formatting the nutrition facts
    const getNutrition = useCallback(({item}) => (
        <View key={item["id"]} style={{ width: iPad ? 500 : windowWidth*0.9, borderBottomWidth:1, borderBottomColor:myColors.veryLightGrey, paddingBottom: 15 }}>
            <View style={{flexDirection:'row', alignItems:'center', paddingTop:12, paddingBottom:5}}>
                <Text style={styles.foodTitle}>{item["Food Item"]}</Text>
                <TouchableOpacity style={{ paddingLeft: 5 }} onPress={() => logFood(item)} ><PlusCircle stroke={myColors.navy} strokeWidth={1.8} width={iPad ? 24 : 20} height={iPad ? 24 : 20}/></TouchableOpacity>                
            </View>
            {(item["Allergens"] === "") ?
                <View></View> :
                <View style={styles.allergens}>
                    <FlatList
                        data={allergens(item["Allergens"], item["id"])}
                        renderItem={allergenRender}
                        keyExtractor={item => item["id"]}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
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

    const backButton = () => {
        return (
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:10, marginBottom: iPad ? 120 : 100}}>
                <CustomButton label={'Back'} inverse={true} onPress={() => navigation.navigate('MealScreen', {token: token, dininghall: route.params.dininghall})} />     
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

    React.useEffect(() => {
        const foods = navigation.addListener('focus', () => {
            getAllFoods();
        });
        return foods;
    }, [navigation]);


    return (
        <SafeAreaView style={styles.screen}>
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
            <View style={{flexDirection:'row', justifyContent: 'flex-start', alignContent:'center', paddingTop: iPad ? 15 : 0, paddingHorizontal: iPad ? ((windowWidth-500)/2) : windowWidth*0.05}}>
                <TouchableOpacity
                    style={{ paddingRight: 5, marginLeft:-10 }}
                    onPress={() => navigation.navigate('MealScreen', { token: token, dininghall: route.params.dininghall })} >
                    <ChevronLeft stroke={myColors.navy} strokeWidth={2} width={36} height={36} />
                </TouchableOpacity>
                <Text style={styles.title}>{diningHallName}</Text>
            </View>
            <View style={styles.filters}>
                <TextInput
                    style={{
                        width: iPad ? 500 : windowWidth * 0.9,
                        padding: 15,
                        marginBottom: 10,
                        borderWidth: 1,
                        borderColor: myColors.navy,
                        borderRadius: 12,
                    }}
                    fontSize={14}
                    placeholderTextColor={myColors.grey}
                    autoCapitalize="none"
                    placeholder='Search Food'
                    onChangeText={(input)=>{searchFood(input)}}
                >
                </TextInput>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
                <FlatList
                    data={foods}
                    renderItem={getNutrition}
                    style={{ flex: 1 }}
                    ListFooterComponent={backButton}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />                
            </View>

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
        fontSize: iPad ? 20 : 16,
        fontWeight: "500",
        color: myColors.navy,
    },
    subTitle: {
        fontFamily: "System",
        fontSize: 14,
        fontWeight: "300",
        color: myColors.navy,
        paddingBottom: 6,
    },
    filters: {
        alignItems:'center',
    },
    nutritionFact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: iPad ? 220 : windowWidth*0.42,
    },
    nutritionText: {
        fontFamily: "System",
        fontSize: iPad ? 16 : 13,
        fontWeight: "300",
        color: myColors.darkGrey,
    },
    allergens: {
        height: iPad ? 34 : 30,
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
export default NutritionScreen
