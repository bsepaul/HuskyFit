import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomButton from "../../assets/Components/CustomButton";

const UserProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile Screen!</Text>
      <StatusBar style="auto" />
      <CustomButton label={"Settings"} onPress={() => navigation.navigate('Settings')}></CustomButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
export default UserProfile;