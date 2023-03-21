import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, Dimensions} from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import CustomButton from "../../assets/Components/CustomButton";
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserProfile = ({ navigation }) => {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  const [name, setName] = React.useState('');


  const getUserInfo = async () => {
    var raw = ""
    var requestOptions = {
      method: 'GET',
      headers: {"x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
                "Authorization": token},
      body: raw,
      redirect: 'follow'
    };
    fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/profile", requestOptions)
      .then(response => response.text())
      .then((result) => {
        var json = JSON.parse(result);
        setName(json.Name.split(' ')[0])
      })
      .catch(error => console.log('error', error));
  }

  React.useEffect(() => {
    const userInfo = navigation.addListener('focus', () => {
      getUserInfo();
    });
    return userInfo;
  }, [navigation]);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <CustomButton label={"Food Log"} onPress={() => navigation.navigate('Foodlog', {token:token})}></CustomButton>
        <CustomButton label={"Workout Log"} onPress={() => navigation.navigate('Workoutlog', {token:token})}></CustomButton>
        <CustomButton label={"Personal Survey"} onPress={() => navigation.navigate('Survey', {token:token})}></CustomButton>
        <CustomButton label={"BmiCalculator"} onPress={() => navigation.navigate('BmiCalculator', {token:token})}></CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "System",
    fontSize: 30,
    padding: 16,
    fontWeight: "500",
    color: myColors.navy,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: windowWidth * .25,
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 100,
  },
});

export default UserProfile;