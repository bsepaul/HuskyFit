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
import { NavigationContainer } from '@react-navigation/native';
{/*import {createNativeStackNavigator} from '@react-navigation/native-stack';*/}
import Tabs from './navigation/Main';
import AuthStack from './navigation/screens/AuthStack';
{/*import AppStack from './src/navigation/AppStack';*/}


export default function App() {
  return(
    <NavigationContainer>
      <Tabs/>
      {/* < AppStack />*/}
      <AuthStack />
    </NavigationContainer>
  )
}