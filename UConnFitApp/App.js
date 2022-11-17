// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image, SafeAreaView, Platform } from 'react-native';

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>Senior Design!</Text>
//       {/* <Image source={require('./assets/icon.png')}/> */}
//       <Image blurRadius={10} source={{width: 200, height: 300, uri: "https://picsum.photos/200/300"}}/>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0D223F',
//     alignItems: 'center', // moves to middle, horizontally
//     justifyContent: 'center', // moves to middle, vertically
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
// });

import * as React from 'react';
//import type {Node} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './navigation/Main';
import AuthStack from './navigation/screens/AuthStack';
{/*import AppStack from './src/navigation/AppStack';*/}
//import MaterialIcons from 'react-native-vecot-icons/MaterialIcons'; 

const Stack = createNativeStackNavigator(); 
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component ={Main} name = "Main" options={{headerShown:false}}/>
        <Stack.Screen component ={Home} name = "Home"/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Main = (navigation) => {
  return (
    <SafeAreaView style = {{
      flex:1, 
      justifyContent:'center', 
      allignItems:'center', 
      backgroundColor: '#fff',}}>
    <View>
      <Text syle={{fontSize:30, fontWeigh: 'bold', color: '#20315f'}}> 
        HuskyFit 
        </Text>
    </View>
    </SafeAreaView>
  );
    } 

//export default function App() {
  //return(
    //<NavigationContainer>
      //<AuthStack/>
        //{/* <Tabs/> */}
      //{/* < AppStack />*/}
    //</NavigationContainer>
  //)
//}

const Home = () => {
  return (
    <View style = {{flex:1, justifyContent:'center', allignItems:'center', }}>
      <Text></Text>
    </View>
  );
}
