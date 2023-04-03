import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, SafeAreaView, Dimensions }  from 'react-native'
import React, {useState} from "react"
import Constants from 'expo-constants'
import theme from '../config/theme'
import CustomRecButton from '../../assets/Components/CustomRecButton'
import { myColors } from '../../assets/styles/ColorPalette'

const windowWidth = Dimensions.get('window').width;

const BmiCalculator = ({navigation}) => {
    const [weight, setWeight] = useState('')
    const [heightFt, setHeightFt] = useState(0);  
    const [heightIn, setHeightIn] = useState(0);
    const [bmi, setBmi] = useState('')
    const [description, setDescription] = useState('')



    const calculateBmi = () => {
        const weightInKg = weight / 2.205;
        const height = (parseFloat(heightFt) * 12) +  parseFloat(heightIn);
        const heightCm = 2.54 * height;
        const bmi = weightInKg / ((heightCm / 100) * (heightCm / 100));
        setBmi(bmi.toFixed(1));

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
        Linking.openURL('https://www.cdc.gov/healthyweight/assessing/bmi/index.html');
    };

    
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>BMI Calculator</Text>
                </View>
                <View style={styles.textFieldContainer}>
                    <View style={styles.textFieldSmall}>
                        <TextInput
                        placeholder="Height (ft)"
                        placeholderTextColor={myColors.navy}
                        autoCapitalize="none"
                        onChangeText={(heightFt) => {
                            setHeightFt(heightFt);
                        }}
                        />
                    </View>
                    
                    <View style={styles.textFieldSmall}>
                        <TextInput
                        marginLeft= {10}
                        placeholder="(in)"
                        placeholderTextColor={myColors.navy}
                        autoCapitalize="none"
                        onChangeText={(heightIn) => {
                            setHeightIn(heightIn);
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
                <CustomRecButton label={"Calculate"} onPress={calculateBmi}/>

                <View style={styles.textView}>
                    <Text style={styles.textinformation}>Please note that BMI calculated this way is not entirely accurate. For more detailed information, we recommend you <Text style={{color: 'blue'}} onPress={handlePress}>click here</Text> to learn more.</Text>
                </View>

                <View style={styles.resultView}>
                    <Text style={styles.result}>{bmi}</Text>
                    <Text style={styles.result}>{description}</Text>
                </View>
                <CustomRecButton label={"Back"} inverse={true} onPress={() => navigation.goBack()}/>
            </View>            
        </SafeAreaView>


    )
}

export default BmiCalculator

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems:'center',
    },
    textField: {
        flexDirection: "row",
        borderBottomColor: myColors.grey,
        borderBottomWidth: 1,
        paddingBottom: 12,
        marginBottom: 25,
        width: windowWidth * .45,
    },
    textFieldContainer: {
        flexDirection: "row",
        paddingBottom: 12,
        marginBottom: 8,
        width: windowWidth * .45,
        justifyContent: 'space-between',
    },
    textFieldSmall: {
        borderBottomColor: myColors.grey,
        borderBottomWidth: 1,
        paddingBottom: 12,
        marginLeft: 0,
        width: windowWidth*.18,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:30
    },
    titleText: {
        fontFamily: "System",
        fontSize: 30,
        fontWeight: "500",
        color: myColors.navy,
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
    button: {
        backgroundColor: myColors.navy,
        padding:12,
        borderRadius:12,
    },
    buttonText:{
        fontSize:18,
        fontWeight: '400',
        color: myColors.white
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
        width:windowWidth*0.7,
        alignItems: 'center',
        marginTop: 30,
    },
    textinformation:{
        fontSize:15,
        color: myColors.navy,
        fontWeight: '400',
    },

});
