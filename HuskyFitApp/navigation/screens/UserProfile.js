import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView} from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import CustomButtonArrow from "../../assets/Components/CustomButtonArrow";
import React from 'react';
import { Heart } from 'react-native-feather';

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
    await fetch("https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/profile", requestOptions)
      .then(response => response.text())
      .then((result) => {
        var json = JSON.parse(result);
        setName(json.Name);
        setEmail(json.Email);
      })
      .catch(error => console.log('UserProfile profile error', error));
  }

  React.useEffect(() => {
    const userInfo = navigation.addListener('focus', () => {
      getUserInfo();
    });
    return userInfo;
  }, [navigation]);


  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <CustomButtonArrow label={"Food Log"} arrow={"right"} hasIcon={true} icon={require('../../assets/icons/dine.png')} onPress={() => navigation.navigate('FoodLogProfile', {token:token})}/>
            <CustomButtonArrow label={"Workout Log"} arrow={"right"} hasIcon={true} icon={require('../../assets/icons/rec.png')} onPress={() => navigation.navigate('WorkoutLogProfile', {token:token})}/>
            <Text style={styles.subtitle}>Personal Stats</Text>
            <CustomButtonArrow label={"Personal Survey"} arrow={"right"}  hasIcon={true} icon={require('../../assets/icons/survey.png')} onPress={() => navigation.navigate('Survey', { token: token })} />
            <CustomButtonArrow label={"BMI Calculator"} arrow={"right"} hasIcon={true} icon={require('../../assets/icons/body.png')} onPress={() => navigation.navigate('BmiCalculator', {token:token})}/>
          </View>
          <View style={{ alignItems: 'center', paddingTop: 15, marginBottom: 100, width: windowWidth * 0.7 }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={styles.huskies}>For Huskies, by Huskies</Text><Heart stroke={myColors.lightBlue} strokeWidth={3} width={10} height={10}/>
            </View>
            <Text style={styles.citation}>Icons from feathericons.com & icons8.com</Text>      
            <Text style={styles.citation}>Hosted via Expo</Text>
          </View>
        </View>

      </ScrollView>

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
  citation: {
    fontFamily: "System",
    fontSize: 11,
    paddingTop: 5,
    color: myColors.darkGrey,
    textAlign: 'center',
    fontWeight: '400'
  },
  huskies: {
    fontFamily: "System",
    fontSize: 11,
    color: myColors.darkGrey,
    textAlign: 'center',
    fontWeight: '600',
    paddingRight: 5,
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