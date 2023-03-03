import React, { useState } from "react";
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
  StyleSheet
} from "react-native";
import CustomButton from "../../assets/Components/CustomButton";
import { myColors } from "../../assets/colors/ColorPalette";
import {Dropdown} from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';

// let styles = {
//   flexDirection: "row",
//   borderBottomColor: myColors.grey,
//   borderBottomWidth: 1,
//   paddingBottom: 12,
//   marginBottom: 25,
// };

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


const Survey = ({ navigation }) => {
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [Allergies, setAllergies] = useState("");
  const [DietaryRestrictions, setDietaryRestrictions] = useState('');

  const [selectedAllergens, setSelectedAllergens] = React.useState([]);
  const [selectedRest, setSelectedRest] = React.useState([]);

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


  const handleRegister = () => {
    (async () => {
      var raw = JSON.stringify({
        Height: Height,
        Weight: Weight,
        Allergies: Allergies,
        birthdate: dob,
      });

      var requestOptions = {
        method: "POST",
        headers: {
          "x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
          "Content-Type": "application/json",
        },
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/auth/signup",
        requestOptions
      )
      .then(response => response.text())
      .then((result) => {
        // Do stuff here
        var json = JSON.parse(result);
        var message = json.message
        console.log(message) // "User registration succesful"
        
        navigation.navigate("Login");
      })
      .catch(error => console.log('error', error));
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

        <View style={styles.textField}>
          <TextInput
            placeholder="Height (in)"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(Height) => setHeight(Height)}
          />
        </View>

        <View style={styles.textField}>
          <TextInput
            placeholder="Weight (lbs)"
            placeholderTextColor="#003f5c"
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
                searchPlaceholder="Search..."
                onChange={selected => {
                  setSelectedAllergens(selected);
                }}
                
                renderItem={renderDataItem}
                renderSelectedItem={(selected, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(selected)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{selected.label}</Text>
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
                maxHeight={300}
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
                            <Text style={styles.textSelectedStyle}>{item2.label} </Text>
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


        <CustomButton label={"Submit"} onPress={handleRegister} />

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
    // width: 100,
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
    // width: 200,
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
    paddingVertical: 4,
    paddingHorizontal: 10,
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
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // scroll: true,
  },
});


export default Survey;