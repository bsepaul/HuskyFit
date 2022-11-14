import React from 'react'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image} from 'react-native';
import CustomButtton from '../../assets/Componenets/CustomButton';
// import CustomButttom from '../../assets/Componenets/CustomButton'
// {/*import MaterialIcons from 'react-native-vector-icons/MaterialIcons';*/}
// {/*import MaterialIcons from 'react-native-vector-icons/Ionicons'*/}
// {/*import GooglePNG from './assets/icons/Google.png'; */}


import InputField from '../../assets/Componenets/InputField';


const LogIn = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <View style= {{paddingHorizontal:25}}>
            <View style = {{alignItems:'center'}}>
            </View>
            <Text style = {{fontFamily: 'TimesNewRoman', fontSize:28, 
                fontWeight: '500', color: '#333', marginBottom:30}}> 
                Login
                </Text>

                <InputField label ={'Email Address'} keyboardType = 'email-address' />
                <InputField label ={'Password'} inputType = 'password' 
                fieldButtonLabel = {'Forgot?'}
                fieldButtonFunction = {() => {}}
                />


                {/* <View style={{
                    flexDirection:'row', 
                    borderBottomColor: '#ccc', 
                    borderBottomWidth:1, 
                    paddingBottom: 25, 
                    marginBottom:25, 
                    }}>
                   {/* <MaterialIcons 
                    name='alternative-email' 
                    size={20} 
                    color='#666' 
                    style={{marginRight: 5}} 
                /> */}
                 {/*}   <TextInput placeholder = 'Email ID' 
                    style={{flex:1, paddingVertical:0}} 
                    keyboardType = "email-address"
                    />
                </View>


                <View style={{
                    flexDirection:'row', 
                    borderBottomColor: '#ccc', 
                    borderBottomWidth:1, 
                    paddingBottom: 25, 
                    marginBottom:25, 
                    }}>
                    {/*<MaterialIcons
                    name='alternative-email' 
                    size={20} 
                    color='#666' 
                    style={{marginRight: 5}} 
                />*/}
                {/* <TextInput placeholder = "Password" 
                    style={{flex:1, paddingVertical:0}}
                    secureTextEntry={true} 
                    />
                    <TouchableOpacity onPress={() => {}}>
                        <Text style = {{color: '#0D223F', fontWeight: '700'}}> Forgot? </Text>
                    </TouchableOpacity>
                </View>
            */}
                <CustomButtton label={'Login'} onPress = {() => {}} />

                <Text style = {{textAllign: 'center', color: '#666', marginbottom: 30 }}> 
                Or, Login with ... 
                </Text>
                <View>
                <TouchableOpacity onPress={() => {}} 
                style={{
                    borderColor:'#ddd', 
                    borderWidth:2, 
                    borderRadius:10, 
                    paddingHorizontal:30, 
                    paddingVertical: 10,
            }}> 

                {/* <GooglePNG height={24} width={24} />  */}
                <Text style={{ color:'#AD40F', fontWeight:'700'}}>  Google </Text>
                </TouchableOpacity>
                </View> 

                <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 30}}>
                <Text> New to the App? </Text>
                <TouchableOpacity onPress={() => navigation.nagivate('Register')}>
                <Text style={{ color:'#AD40F', fontWeight:'700'}}>  Register </Text>
                </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
);
};

export default LogIn