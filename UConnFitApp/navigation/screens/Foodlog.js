import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, Dimensions, ScrollView } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomButton from "../../assets/Components/CustomButton";
import { ThumbsUp, ThumbsDown} from "react-native-feather";
import React, { useState } from "react";
import fetch from 'node-fetch';
import CustomFoodLogButton from '../../assets/Components/CustomFoodLogButton';
// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Foodlog({navigation, label, inverse=false}) {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  const [data, setData] = useState([]);
  //const [visible, setVisible] = useState(true);

  const setFood = (foodData) => {
    var i = 0
    foodData.forEach(food => {
      food.id = i;
      i += 1;
    });
    // console.log("IN SET FOOD");
    // console.log(foodData);
    setData(foodData);
  }

  const fetchFood = async () => {
      var raw = JSON.stringify({
        "Date": "03/03/2023" // mm/dd/yyyy
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

  // Automatically get all meals for today from API on screen load
  React.useEffect(() => {
    handlefood();
  }, [data]);


  return (
    <View style={styles.content}>
      <Text style= {styles.title}>Food Log</Text>
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
    </View>
  )
}
  // return (
  //  <View>
  //     <TouchableOpacity style={{ padding: 2 }} onPress = {()=>{}} ><ThumbsUp stroke={myColors.navy} strokeWidth={1.4} width={24} height={24}/></TouchableOpacity>
  //     <TouchableOpacity style={{ padding: 2 }} onPress = {()=>{}}><ThumbsDown stroke={myColors.navy} strokeWidth={1.4} width={24} height={24}/></TouchableOpacity>
  //  </View>
  // )}


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
    maxHeight: 300,
    width: windowWidth*0.95,
    marginTop: 5,
    paddingTop: 8,
    backgroundColor: myColors.lightGrey,
    borderRadius: 12,
  }
})