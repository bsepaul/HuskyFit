import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView,} from 'react-native';
import { myColors } from '../../assets/colors/ColorPalette';
import CustomDiningButtton from '../../assets/Components/CustomDiningButton'; 

const MealScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
    <View style= {{paddingHorizontal:25}}>
    <View style = {{alignItems:'center'}}>
    </View>

<CustomDiningButtton label={'Breakfast'} onPress = {() => {}} />
<CustomDiningButtton label={'Lunch'} onPress = {() => {}} />
<CustomDiningButtton label={'Dinner'} onPress = {() => {}} />
           
                </View>
        </SafeAreaView>       
);
};
export default MealScreen
