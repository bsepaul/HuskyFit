import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, ScrollView } from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';

export default function App() {
  return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.greetingsContainer}>
        <Text style={styles.greetingsText}>Hello, Jonathan!</Text>
        <Text style={{fontSize: 18, paddingVertical: 8, paddingHorizontal: 20}}>Friday, December 9</Text>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightGrey,
      /*alignItems: 'center',*/
    /*justifyContent: 'center',*/
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
greetingsContainer: {
    flex: 1,
    padding: 10
},
greetingsText: {
    width: '100%',
    height: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 25
}
});
