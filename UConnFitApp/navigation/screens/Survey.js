import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import fetch from "node-fetch";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  Dimensions
} from "react-native";
import CustomButton from "../../assets/Components/CustomButton";
import { myColors } from "../../assets/styles/ColorPalette";
// import {Dropdown} from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// all data for dropdown selections
const allDietaryRestrictionsData = [
    { label: 'Vegetarian', value: '1' },
    { label: 'Vegan', value: '2' },
    { label: 'Gluten Free', value: '3' },
    { label: 'Smart Check', value: '4' },
    { label: 'Contains Nuts', value: '5' },
    { label: 'Less Sodium', value: '6' },
  ];
const allAllergensData = [
    { label: 'Fish', value: '1' },
    { label: 'Soybeans', value: '2' },
    { label: 'Wheat', value: '3' },
    { label: 'Gluten', value: '4' },
    { label: 'Milk', value: '5' },
    { label: 'Tree Nuts', value: '6' },
    { label: 'Eggs', value: '7' },
    { label: 'Sesame', value: '8' },
    { label: 'Crustacean Shellfish', value: '9' },
  ];
const allDiningHallPreferenceData = [
    { label: 'Buckley', value: '1' },
    { label: 'Gelfenbien', value: '2' },
    { label: 'McMahon', value: '3' },
    { label: 'North', value: '4' },
    { label: 'Northwest', value: '5' },
    { label: 'Putnam', value: '6' },
    { label: 'South', value: '7' },
    { label: 'Whitney', value: '8' },
  ]

// alert code
const alertSuccess = () => {
    const title = 'Success';
    const message = 'Response successfully logged.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };
const alertFailure = () => {
    const title = 'Error';
    const message = 'Please make sure you enter your height and weight.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };

// main code
const Survey = ({ navigation }) => {
  // initialize values to be sent to API

  // height - string
  const [Height, setHeight] = useState("");
  // height (helper variables)
  const [heightFt, setHeightFt] = useState(0);  
  const [heightIn, setHeightIn] = useState(0);
  // weight - string
  const [Weight, setWeight] = useState("");
  // allergens - string array
  const [Allergens, setAllergens] = useState('');
  const [selectedAllergens, setSelectedAllergens] = React.useState([]);     // dropdown array
  // dietary restrictions - string array
  const [DietaryRestrictions, setDietaryRestrictions] = useState('');
  const [selectedDietary, setSelectedDietary] = React.useState([]);         // dropdown array
  // dining hall preferences - string array
  const [DiningHallPreferences, setDiningHallPreferences] = useState('');
  const [selectedDiningHalls, setSelectedDiningHalls] = React.useState([]); // dropdown array

  [allergensLabels] = React.useState([]);
  [dietaryLabels] = React.useState([]);
  [diningHallsLabels] = React.useState([]);

  // get token from route
  const route = useRoute();
  const token = route.params.token;

  // code to render text for dropdown selection
  const renderDataItem = (item) => {
    return (
        <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.label}</Text>
        </View>
    );
  };

  // handler functions (not needed?)
  const handleHeight = (text) => {
    setHeight(text);
};
  const handleHeightFt = (text) => {
    setHeightFt(text);
  };
  const handleHeightIn = (text) => {
    setHeightIn(text);
  };
  const handleWeight = (text) => {
    setWeight(text);
  };
  const handleAllergies = (text) => {
    setAllergies(text);
  };
  const handleDietaryRestrictions = (text) => {
    setDietaryRestrictions(text);
  };
  const [isFocus, setIsFocus] = useState(false); 

  // survey handler function
  const handleSurvey = () => {
    (async () => {

      // convert data into compatible formats
      // convert all allergens to string arrays
      for (var x = 0; x < selectedAllergens.length; x++) {
        allergensLabels.push(allAllergensData[selectedAllergens[x]-1].label)
      }
      // convert all dietary restrictions to string arrays
      for (var x = 0; x < selectedDietary.length; x++) {
        dietaryLabels.push(allDietaryRestrictionsData[selectedDietary[x]-1].label)
      }
      // convert all dining halls to string arrays
      for (var x = 0; x < selectedDiningHalls.length; x++) {
        diningHallsLabels.push(allDiningHallPreferenceData[selectedDiningHalls[x]-1].label)
      }
      // data to be passed to API
      var raw = JSON.stringify({
        "Height": Height,
        "Weight": Weight,
        "Allergens" : allergensLabels,
        "Dietary_Restrictions": dietaryLabels,
        "Dining_Hall_Preferences": diningHallsLabels
      });

      // Make sure user isn't leaving any required fields empty
      if( !Height || !Weight) { 
        alertFailure();
        console.log("fail");
        return; // Don't do API call if invalid data
      }

      var requestOptions = {
        method: 'PUT',
        headers: {
          "x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
          "Authorization": token},
        body: raw,
        redirect: 'follow',
      };

      fetch(
        "https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/user-info",
        requestOptions
      )
      .then(response => response.text())
      .then((result) => console.log(result))
      .catch(error => console.log('error', error));
      
      // console.log("Allergens set: ", allergensLabels)
      // console.log("Restrictions set: ", dietaryLabels)
      // console.log("Dining halls set: ", diningHallsLabels)
      alertSuccess();

      navigation.goBack()
    })();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <Text
          style={styles.title}>
          Personal Survey
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 25,
          }}
        ></View>

        <View style={styles.textFieldSmall}>
          <View style={styles.textFieldFt}>
            <TextInput
              placeholder="Height (ft)"
              placeholderTextColor={myColors.navy}
              autoCapitalize="none"
              // onChangeText={(Height) => setHeight(Height)}
              onChangeText={(heightFt) => {
                setHeightFt(heightFt);
                setHeight((heightFt*12) + heightIn);
                // console.log(heightFt, "ft");
              }}
            />
          </View>
          
          <View style={styles.textFieldIn}>
            <TextInput
              marginLeft= {10}
              placeholder="(in)"
              placeholderTextColor={myColors.navy}
              autoCapitalize="none"
              // onChangeText={(Height) => setHeight(Height)}
              onChangeText={(heightIn) => {
                setHeightIn(heightIn);
                setHeight(parseFloat((heightFt*12)) + parseFloat(heightIn));
              }}
              />
          </View>
        </View>

        <View style={styles.textField}>
          <TextInput
            placeholder="Weight (lbs)"
            placeholderTextColor={myColors.navy}
            autoCapitalize="none"
            onChangeText={(Weight) => setWeight(Weight)}
          />
        </View>

        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={allAllergensData}
                labelField="label"
                valueField="value"
                placeholder="Allergens"
                value={selectedAllergens}
                search
                maxHeight={250}
                searchPlaceholder="Search..."
                onChange={selected => {
                  setSelectedAllergens(selected);
                  // setAllergens(selected);
                  // setallergensLabels(selected.label)
                  // console.log(selectedAllergens)

                  // deubugging
                  // allergensLabels = []
                  // // console.log("data check: ", allAllergensData[1])
                  // for (var x = 0; x < selectedAllergens.length; x++) {
                  //   // console.log(selectedAllergens[x])
                  //   // setAllergensLabels(allAllergensData[item].label)
                  //   allergensLabels.push(allAllergensData[selectedAllergens[x]-1].label)
                  //   // console.log("- ", allergensLabels)
                  // }
                  // console.log(allergensLabels)
                  // console.log(selectedAllergens[0])
                  // console.log(allAllergensData[selectedAllergens[0]].label)
                }}
                
                renderItem={renderDataItem}
                renderSelectedItem={(selected, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(selected)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.selectedTextList}>{selected.label}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={allDietaryRestrictionsData}
                labelField="label"
                valueField="value"
                placeholder="Dietary Restrictions"
                value={selectedDietary}
                search
                maxHeight={250}
                searchPlaceholder="Search..."
                onChange={item2 => {
                    setSelectedDietary(item2)
                    // setDietaryLabels(item2.label)
                    // setDietaryRestrictions(item2.label);
                }}
                
                renderItem={renderDataItem}
                renderSelectedItem={(item2, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item2)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.selectedTextList}>{item2.label} </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <StatusBar />
        </View>

        {/* <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: myColors.navy}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={allDiningHallPreferenceData}
            search
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder={'Preferred Dining Hall'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setDiningHallPreferences(item.label);
              setIsFocus(false);
            }}
          /> */}
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={allDiningHallPreferenceData}
                labelField="label"
                valueField="value"
                placeholder="Preferred Dining Halls"
                value={selectedDiningHalls}
                search
                maxHeight={250}
                searchPlaceholder="Search..."
                onChange={hall => {
                    // setSelected(item);
                    setSelectedDiningHalls(hall)
                    // setDiningHallsLabels(hall.label)
                    // setDiningHallPreferences(hall.label);
                }}
                
                renderItem={renderDataItem}
                renderSelectedItem={(hall, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(hall)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.selectedTextList}>{hall.label} </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />


        <CustomButton label={"Submit"} onPress={handleSurvey} style={{width:windowWidth*.45}}/>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: myColors.navy, fontWeight: "700" }}>
              {" "}
              Back{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textField: {
    flexDirection: "row",
    borderBottomColor: myColors.grey,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 25,
    width: windowWidth * .45,
  },
  textFieldSmall: {
    flexDirection: "row",
    // borderBottomColor: myColors.grey,
    // borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 8,
    width: windowWidth * .2,
  },
  textFieldFt: {
    // flexDirection: "row",
    borderBottomColor: myColors.grey,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginLeft: 0,
    // marginTop: 0,
    // marginBottom: 25,
    width: windowWidth * .2,
  },
  textFieldIn: {
    // flexDirection: "row",
    borderBottomColor: myColors.grey,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginLeft: 30,
    // marginTop: 0,
    // marginBottom: 25,
    width: windowWidth * .2,
  },
  title: {
    fontFamily: "System",
    fontSize: 28,
    fontWeight: "500",
    color: myColors.navy,
    marginTop: 100,
    marginBottom: 1
  },
  dropdown: {
    height: 50,
    borderColor: myColors.grey,
    borderWidth: 0.5,
    width: windowWidth * .45,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
    scroll: true,
    // subItemBackground: myColors.darkGrey,
  },
  placeholderStyle: {
    fontSize: 16,
    color: myColors.navy,
  },
  selectedTextStyle: {
    fontFamily: "System",
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  selectedTextList: {
    fontFamily: "System",
    fontSize: 14,
    paddingVertical: 3,
    paddingRight: 3,
  },
  selectedStyle: {
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    width: windowWidth * .45,
    // scroll: true,
  },
});


export default Survey;