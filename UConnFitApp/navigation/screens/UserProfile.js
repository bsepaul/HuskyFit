import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, Dimensions} from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import CustomButton from "../../assets/Components/CustomButton";
import CustomDiningButton from "../../assets/Components/CustomDiningButton";
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserProfile = ({ navigation }) => {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');


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
        setName(json.Name);
        setEmail(json.Email);
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
    <SafeAreaView style={styles.screen}>
      <View style={styles.upperContent}>
        <Image
            source={require('../../assets/img/husky.png')}
            resizeMode='contain'
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
            }}
        />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <View style={styles.content}>
          <Text style={styles.subtitle}>View Logs</Text>
          <CustomDiningButton label={"Food Log"} arrow={"right"} hasIcon={true} icon={require('../../assets/icons/dine.png')} onPress={() => navigation.navigate('Foodlog', {token:token})}/>
          <CustomDiningButton label={"Workout Log"} arrow={"right"} hasIcon={true} icon={require('../../assets/icons/rec.png')} onPress={() => navigation.navigate('Workoutlog', {token:token})}/>
          <Text style={styles.subtitle}>Personal Stats</Text>
          <CustomDiningButton label={"Personal Survey"} arrow={"right"}  hasIcon={true} icon={require('../../assets/icons/survey.png')} onPress={() => navigation.navigate('Survey', { token: token })} />
          <CustomDiningButton label={"BMI Calculator"} arrow={"right"} hasIcon={true} icon={require('../../assets/icons/body.png')} onPress={() => navigation.navigate('BmiCalculator', {token:token})}/>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  upperContent: {
    alignItems: 'center',
    paddingTop: windowHeight * 0.08,
  },
  content: {
    paddingHorizontal:0.125,
  },
  title: {
    fontFamily: "System",
    fontSize: 24,
    paddingVertical: 10,
    fontWeight: "500",
    color: myColors.navy,
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 16,
    paddingTop: 5,
    fontWeight: "400",
    color: myColors.navy,
  },
  email: {
    fontFamily: "System",
    fontSize: 14,
    paddingBottom: 15,
    fontWeight: "400",
    color: myColors.darkGrey,
  },
});

export default UserProfile;