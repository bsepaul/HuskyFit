import React from 'react'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native'
{/*import MaterialIcons from 'react-native-vector-icons/MaterialIcons';*/}
{/*import MaterialIcons from 'react-native-vector-icons/Ionicons'*/}
{/*import GooglePNG from './assets/icons/Google.png'; */}
import inputfield from '../Components/inputfield'; 

const Register = (navigation) => {
    return (
        <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <ScrollView showsVerticalScrollIndicator={false} style= {{paddingHorizontal:25}}>
            <View style = {{alignItems:'center'}}>
            </View>
            <Text style = {{fontFamily: TimeNewRoman, fontSize:28, 
                fontWeight: '500', color: '#333', marginBottom:30}}> 
                Register
                </Text>
                <View style={{
                    flexDirection:'row', 
                    borderBottomColor: '#ccc', 
                    borderBottomWidth:1, 
                    paddingBottom: 25, 
                    marginBottom:25, 
                    }}>
<View>
                <TouchableOpacity onPress={() => {}} 
                style={{
                    borderColor:'#ddd', 
                    borderWidth:2, 
                    borderRadius:10, 
                    paddingHorizontal:30, 
                    paddingVertical: 10,
            }}> 
            
            <Text style={{ color:'#AD40F', fontWeight:'700'}}>  Google </Text>
                </TouchableOpacity>
                </View> 
                        
                   {/* <MaterialIcons 
                    name='alternative-email' 
                    size={20} 
                    color='#666' 
                    style={{marginRight: 5}} 
                /> */}
                   {/*} <TextInput placeholder = 'Email ID' 
                    style={{flex:1, paddingVertical:0}} 
                    keyboardType = "email-address"
            /> */}

                </View>

                <inputfield label ={'Full Name'} />
                <inputfield label ={'Email Address'} keyboardType = 'email-address' />
                <inputfield label ={'Password'} inputType = 'password' />
                <inputfield label ={'Confirm Password'} inputType = 'password' />
                <inputfield label ={'Date of Birth'} 
                                inputType = 'password' />


                {/* <View style={{
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
                  {/*}  <TextInput placeholder = "Password" 
                    style={{flex:1, paddingVertical:0}}
                    secureTextEntry={true} 
                    />
                    <TouchableOpacity onPress={() => {}}>
                        <Text style = {{color: '#AD40AF', fontWeight: '700'}}> Forgot? </Text>
                    </TouchableOpacity>
            </View>  */}

            <CustomButton label={'Register'} onPress={() => {}} /> 

              <Text style = {{textAllign: 'center', color: '#666', marginbottom: 30 }}> 
                Or, Register with ... 
        </Text>  
                {/* <View>
                <TouchableOpacity onPress={() => {}} 
                style={{
                    borderColor:'#ddd', 
                    borderWidth:2, 
                    borderRadius:10, 
                    paddingHorizontal:30, 
                    paddingVertical: 10,
            }}> 

                {/* <GooglePNG height={24} width={24} />  */}
               {/* <Text style={{ color:'#AD40F', fontWeight:'700'}}>  Google </Text>
                </TouchableOpacity>
                </View> 
*/}
                <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 30}}>
                <Text> Already Registered? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color:'#AD40F', fontWeight:'700'}}>  Login </Text>
                </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
);
};

export default Register