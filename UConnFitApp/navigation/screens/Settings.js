import { useRoute } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
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
import CustomRecButton from '../../assets/Components/CustomRecButton';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../config/themeContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { myColors } from '../../assets/styles/ColorPalette';
// import { name } from './HomeScreen.js';

const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
    ],
  },
  {
    header: 'Help',
    items: [
      { id: 'contact', icon: 'activity', label: 'BMI Calculator', type: 'link' },
    ],
  },

];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// export default function Example() {
export default function Settings ({ navigation }) {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

  // Get token from route
  const route = useRoute();
  const token = route.params.token;
  const { email } = route.params;
   // for toggling dark mode; preferences are not currently preserved on screen change, have to implement later
  // useEffect() on every screen ?
  //const [darkMode, setDarkMode] = React.useState(false);
  //const toggleSwitch = (value) => {
    //setDarkMode(value);
    // console.log(value);
  //}

  return(
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <View style = {[styles.container, {backgroundColor: theme.background}]}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: theme.color}] }>Settings</Text>
  
          <Text style={[styles.subtitle, {color: theme.color}] }>
            Update to your Preferences
          </Text>
        </View>
  
        <View style={styles.profile}>
  <Image
    alt=""
    source={{
      uri: 'https://s.hdnux.com/photos/01/00/21/57/16849857/6/rawImage.jpg',
    }}
    style={styles.profileAvatar}
  />

  <Text style={[styles.profileName, {color: theme.color}] }>Jonathan Husky</Text>

  <Text style={[styles.profileEmail, {color: theme.color}] }>{email}</Text>
</View>
  
        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionHeaderText, {color: theme.color}] }>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 1 },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}>
                      <View style={styles.row}>
                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22}
                        />
                        <Text style={[styles.rowLabel, {color: theme.color}] }>{label}</Text>
  
                        <View style={styles.rowSpacer} />
  
                            {type === 'toggle' && (
                            <Switch value={mode} onValueChange={(value) => {
      
                              setMode(value);
                              EventRegister.emit("changeTheme", value);
                              }} 
                              />
                          )}
                        { (type === 'select' || type === 'link') &&
                        <TouchableOpacity onPress={() => navigation.navigate('BmiCalculator')}>
                             <FeatherIcon color="#ababab" name="chevron-right" size={22} />
                             </TouchableOpacity>
                            }
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>     
        ))}     
      </View>
      <View style={{alignItems: 'center', marginBottom:  300}}>
      <CustomRecButton label={'Return'} onPress={() => navigation.navigate('UserProfile')}/>  
    </View>
      </ScrollView>
  
    );
    
  }
  
  const styles = StyleSheet.create({
    container: {
        paddingVertical: 21,
      },
  
      section: {
        paddingTop: 1,
      },
      sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 19,
      },
      sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 2,
      },
      header: {
        paddingLeft: 25,
        paddingRight: 24,
        marginBottom: 12,
      },
      title: {
        fontSize: 35,
        fontWeight: '700',
        marginBottom: 6,
      },
      subtitle: {
        fontSize: 16,
        fontWeight: '500',
      },
      profile: {
        padding: 17,
        flexDirection: 'column',
        alignItems: 'center',
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderColor: '#0D223F',
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
        color: '#090909',
      },
      profileEmail: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '600',
        color: '#0D223F',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 15,
        height: 50,
      },
      rowWrapper: {
        paddingLeft: 20,
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
      },
      rowIcon: {
        marginRight: 17,
      },
      rowLabel: {
        fontSize: 17,
        fontWeight: '600',
      },
      rowValue: {
        fontSize: 17,
        color: '#616161',
        marginRight: 4,
      },
      rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      
    
  });
  