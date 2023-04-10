import { useRoute } from '@react-navigation/native';
import WorkoutScreen from './WorkoutScreen';
import WorkoutInfo from './WorkoutInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RecScreen = () => {
  const route = useRoute();
  const token = route.params.token;

  return (
      <Stack.Navigator initialRouteName='WorkoutScreen'>
        <Stack.Screen component = {WorkoutScreen} initialParams={{token:token}} name = "WorkoutScreen" options={{ headerShown:false, params: {token: token} }}/>
        <Stack.Screen component = {WorkoutInfo}   initialParams={{token:token}} name = "WorkoutInfo"   options={{ headerShown:false }}/>
      </Stack.Navigator>
  )
};
export default RecScreen

 /*const RecScreen = ({navigation}) => {
   return (
     <SafeAreaView style={{flex: 1, flexDirection:'center'}}>
       <View style= {{flexDirection:"row", flexWrap:"wrap", alignContent:"space-around"}}>
         <CustomRecButton label={'Walking '}  onPress={() => navigation.navigate('WorkoutScreen2')} /> 
         <CustomRecButton label={'Running '} onPress={() => navigation.navigate('WorkoutScreen2')} />
         <CustomRecButton label={'Weights '} onPress={() => navigation.navigate('WorkoutScreen2')}/>
         <CustomRecButton label={'Yoga    '} onPress={() => navigation.navigate('WorkoutScreen2')}/>
         <CustomRecButton label={'Swimming'} onPress={() => navigation.navigate('WorkoutScreen2')}/>
         <CustomRecButton label={'Biking  '} onPress={() => navigation.navigate('WorkoutScreen2')}/>   
       </View>
       <View>
         <CustomRecButton label={'Other Workouts'} onPress={() => navigation.navigate('WorkoutScreen')}/>  
      </View>
     </SafeAreaView>
        
 );
};
//export default RecScreen


/*import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const items = [
  {
    icon: 'award',
    title: 'Lift Weights',
  },
  {
    icon: 'trending-up',
    title: 'Walking',
  },
  {
    icon: 'activity',
    title: 'Yoga',
  },
  {
    icon: 'aperture',
    title: 'Biking',
  },
];

const { width, height } = Dimensions.get('window');


export default function Example() {
  const [value, setValue] = React.useState(0);

  return (
    <SafeAreaView style={{ backgroundColor: '#1b1d1b', flex: 1 }}>
      <Image
        style={styles.background}
        source={{
          uri: 'https://thumbs.dreamstime.com/b/cartoon-man-playing-his-siberian-husky-dog-design-78667516.jpg',
        }}
        resizeMode="cover"
      />
      <View style={[styles.background, styles.overflow]} />
      <View style={styles.content}>
        <Text style={styles.title}>
          Hello my Fellow Husky, what will we be doing today?
        </Text>
        {items.map(({ icon, title, subtitle }, index) => {
          const isActive = value === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setValue(index);
              }}>
              <View style={[styles.radio, isActive && styles.radioActive]}>
                <View style={styles.radioIcon}>
                  <FeatherIcon color="#fff" name={icon} size={20} />
                </View>

                <View style={styles.radioBody}>
                  <Text style={styles.radioTitle}>{title}</Text>

                  <Text style={styles.radioSubtitle}>{subtitle}</Text>
                </View>

                <View
                  style={[
                    styles.radioCheck,
                    isActive && styles.radioCheckActive,
                  ]}>
                  <FontAwesome color="#fff" name="check" size={12} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 'auto',
    alignItems: 'stretch',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    paddingRight: 40,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overflow: {
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  footer: {
    paddingVertical: 40,
  },
  radio: {
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radioActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },
  radioIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0D223F',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
  },
  radioSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#878787',
  },
  radioCheck: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    marginLeft: 'auto',
    display: 'none',
  },
  radioCheckActive: {
    display: 'flex',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
}); */