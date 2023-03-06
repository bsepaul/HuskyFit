import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Button,
  Dimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { myColors } from '../../assets/colors/ColorPalette';
// import { name } from './HomeScreen.js';

const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
    ],
  },

];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// export default function Example() {
const Settings = ({ navigation }) => {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  // for toggling dark mode; preferences are not currently preserved on screen change, have to implement later
  // useEffect() on every screen ?
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleSwitch = (value) => {
    setDarkMode(value);
    // console.log(value);
  }

  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.profile}>
          {/* remove profile pic? */}
          <Image alt="" source={{ uri: 'https://s.hdnux.com/photos/01/00/21/57/16849857/6/rawImage.jpg', }} style={styles.profileAvatar} />
          {/* change to match user's name and email */}
          <Text style={styles.profileName}>Jonathan Husky</Text>
          <Text style={styles.profileEmail}>jonathan.husky@uconn.edu</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowSpacer}/>
          
          <Text style={styles.bodyText}>Dark Mode</Text>

          <View style={styles.rowSpacer}/>
          <View style={styles.rowSpacer}/>

          <FeatherIcon color={myColors.navy} name={'sun'} style={styles.rowIcon} size={22} />

          <View style={styles.rowSpacer}/>

          <Switch style={{marginTop:5, paddingRight: 5}} onValueChange= {toggleSwitch} value={darkMode}  trackColor={{true: myColors.navy}}/>

          <View style={styles.rowSpacer}/>

          <FeatherIcon color={myColors.navy} name={'moon'} style={styles.rowIcon} size={22} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: myColors.navy, fontWeight: "700" }}>
              {" "}
              Back{" "}
            </Text>
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 60,
  },
  header: {
    padding: 10,
    borderRadius: 4,
    alignItems: 'center'
  },
  title: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: "500",
    color: myColors.navy,
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: 20,
  },
  profile: {
    padding: 17,
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    marginLeft: windowWidth * .1,
  },
  rowSpacer: {
    flexGrow: .15,
  },
  bodyText: {
    fontFamily: "System",
    fontSize: 20,
    color: myColors.navy,
    paddingVertical: 10,
  },
  rowIcon: {
    paddingRight: 17,
    paddingLeft: 17,
    paddingVertical: 11,
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 9,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: myColors.navy,
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
    color: myColors.navy,
  }
});

export default Settings;