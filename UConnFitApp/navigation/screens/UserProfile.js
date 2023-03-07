import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, Dimensions} from 'react-native';
import { myColors } from '../../assets/styles/ColorPalette';
import CustomButton from "../../assets/Components/CustomButton";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserProfile = ({ navigation }) => {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'center', justifyContent: 'center', alignContent: 'center' }}>
    {/* <SafeAreaView style={styles.container}> */}
    <View style={styles.titleContainer}>
      <Text style= {styles.title}>Profile</Text>
      </View>

  <View style={styles.container}>
      <StatusBar style="auto" />
      <CustomButton label={"Food Log"} onPress={() => navigation.navigate('Foodlog', {token:token})}></CustomButton>
      <CustomButton label={"Workout Log"} onPress={() => navigation.navigate('Workoutlog', {token:token})}></CustomButton>
      <CustomButton label={"Personal Survey"} onPress={() => navigation.navigate('Survey', {token:token})}></CustomButton>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * .25
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "500",
    color: myColors.navy,
    paddingHorizontal: windowWidth * 0.40,
    paddingVertical: 20,
  },
  container: {
    // flex: 1,
    padding: 16,
    // justifyContent: 'center',
    alignContent: 'center',
    // scroll: true,
    paddingHorizontal: windowWidth * .25,
  },
titleContainer: {

}
});

export default UserProfile;
