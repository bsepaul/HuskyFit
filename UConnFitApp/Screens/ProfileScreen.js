import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, Button} from "react-native";

import {EventRegister} from "react-native-event-listeners";
import themeContext from '../config/themeContext';

export default function HomeScreen({navigation}){
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);
    return(
        <View style = {[styles.container, {backgroundColor: theme.background}]}>
            <Text style = {[styles.text, {color: theme.color}]}>ProfileScreen</Text>
            <View style = {styles.Button}>
            <Button
             title = "View BMI"
             onPress={() => navigation.navigate("BMI")}
             />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 20
    },
    button: {
        paddingTop: 20,
    },
});