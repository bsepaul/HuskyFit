import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking}  from 'react-native'
import React, {useState} from "react"
import Constants from 'expo-constants'
import theme from '../config/theme'
import CustomRecButton from '../../assets/Components/CustomRecButton'
import { myColors } from '../../assets/styles/ColorPalette'
const BmiCalculator = ({navigation}) => {
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [bmi, setBmi] = useState('')
    const [description, setDescription] = useState('')



    const calculateBmi = () => {
        const weightInKg = weight / 2.205;
        const bmi = weight / ((height /100) * (height/100))
        setBmi(bmi.toFixed(1))

        if (bmi < 18.5){
            setDescription('below healthy weight')
        }
        else if (bmi >= 18.5 && bmi <= 24.9){
            setDescription('healthy weight')
        }
        else if (bmi >= 25 && bmi <= 29.9){
            setDescription('above healthy weight')
        }
        else if (bmi >= 30){
            setDescription('significantly above healthy weight')
        }
     }     



    const handlePress = () => {
        Linking.openURL('https://www.calculator.net/bmi-calculator.html?ctype=metric&cage=25&csex=m&cheightfeet=5&cheightinch=10&cpound=160&cheightmeter=190&ckg=90&printit=0&x=55&y=21');
    };

    
    return (
        <View style={[styles.container, , {backgroundColor: theme.background}]}>
            <View style={styles.title}>
                <Text style={styles.titleText}>BMI Calculator</Text>
            </View>
            <TextInput
             style={styles.input}
             value={weight}
             onChangeText={(text) => setWeight(text)}
             placeholder="Weight in kg"
             keyboardType='numeric'
            />
            <TextInput
             style={styles.input}
             value={height}
             onChangeText={(text) => setHeight(text)}
             placeholder="Height in Cm"
             keyboardType='numeric'
            />
            <TouchableOpacity
             style={styles.button}
             onPress={calculateBmi}
            >

            <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
            <View style={styles.textView}>
            <Text style={styles.textinformation}>Please note that the information provided here may not be entirely accurate. For more detailed and up-to-date information, we recommend you <Text style={{color: 'blue'}} onPress={handlePress}>click here</Text> to learn more.</Text>
            </View>

            <View style={styles.resultView}>
                <Text style={styles.result}>{bmi}</Text>
                <Text style={styles.result}>{description}</Text>

            </View>
        <View style={{alignItems: 'center', marginBottom:  300}}>
      <CustomRecButton label={'Return'} onPress={() => navigation.goBack()}/> 
    </View>
        </View>

    )
}

export default BmiCalculator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,

       
    },
    title: {
        backgroundColor: myColors.offWhite,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
    titleText:{
        fontSize:30,
        fontWeight:'bold',
    },
    input: {
        height:55,
        margin: 15,
        borderWidth:1/2,
        padding:10,
        borderRadius:5,
        backgroundColor: myColors.offWhite,
        fontSize:18
    },
    button:{
        height:55,
        margin:15,
        borderWidth:1/2,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:20,
        fontWeight:'bold'
    },
    resultView:{
        margin:30,
        alignItems:'center'
    },
    result:{
        fontSize:30,
        color:'#1d3352',
        fontWeight:'bold'
    },
    textView:{
        margin:30,
        alignItems:'center'
    },
    textinformation:{
        fontSize:15,
        color:'#1d3352',
        fontWeight:'bold'
    },

});
