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
import {Dropdown} from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';

// let styles = {
//   flexDirection: "row",
//   borderBottomColor: myColors.grey,
//   borderBottomWidth: 1,
//   paddingBottom: 12,
//   marginBottom: 25,
// };

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const allDietaryRestrictionsData = [
    { label: 'Vegetarian', value: '1' },
    { label: 'Vegan', value: '2' },
    { label: 'Gluten Free', value: '3' },
    { label: 'Smart Check', value: '4' },
    { label: 'Contains Nuts', value: '5' },
    { label: 'Less Sodium', value: '6' },
  ];


  //Fish, Soybeans, Wheat, Gluten, Milk, Tree Nuts, Eggs, Sesame, Crustacean Shellfish
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

   // Alert code - response successfully added to database
   const alertSuccess = () => {
    const title = 'Success';
    const message = 'Response successfully logged.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };
  
  // Alert code - error adding response to database
  const alertFailure = () => {
    const title = 'Error';
    const message = 'Please make sure you enter your height and weight.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };

const Survey = ({ navigation }) => {
  const [Height, setHeight] = useState("");
  const [heightFt, setHeightFt] = useState(0);
  const [heightIn, setHeightIn] = useState(0);
  const [Weight, setWeight] = useState("");
  const [Allergens, setAllergens] = useState("");
  const [DietaryRestrictions, setDietaryRestrictions] = useState('');

  const [selectedAllergens, setSelectedAllergens] = React.useState([]);
  const [selectedRest, setSelectedRest] = React.useState([]);

    // Get token from route
    const route = useRoute();
    const token = route.params.token;

  const renderDataItem = (item) => {
    return (
        <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.label}</Text>
        </View>
    );
};

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
  // const handleConfirmPassword = (text) => {
  //   setConfirmPassword(text);
  // };
  const [isFocus, setIsFocus] = useState(false); 

  // placeholder variables for calculating user's height in inches, for call to API
  // var heightFt, heightIn;

  const handleSurvey = () => {
    (async () => {
      var raw = JSON.stringify({
        "Height": Height,
        "Weight": Weight,
        "Allergens": Allergens,
        "Dietary_Restrictions": DietaryRestrictions,
      });

      // Make sure user isn't leaving any required fields empty
      if( !Height || !Weight) { 
        alertFailure();
        console.log("fail");
        return; // Don't do API call if invalid data
      }
      console.log("height submitted:", Height, "in");

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
      
      alertSuccess();
      // navigation.navigate('Profile', {token: token});
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
                console.log(heightIn, "in", heightFt, "ft");
                console.log("height:", Height);
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
                value={selectedRest}
                search
                maxHeight={250}
                searchPlaceholder="Search..."
                onChange={item2 => {
                    // setSelected(item);
                    setSelectedRest(item2)
                    setDietaryRestrictions(item2.label);
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
            data={allDietaryRestrictionsData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Dietary Restrictions'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setDietaryRestrictions(item.label);
              setIsFocus(false);
            }}
          /> */}


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