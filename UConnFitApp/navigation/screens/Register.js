import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
// import PasswordChecklist from "react-password-checklist";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import CustomButton from "../../assets/Components/CustomButton";
import { myColors } from "../../assets/styles/ColorPalette";

// Get screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let styles = {
  title: {
    fontFamily: "System",
    fontSize: 28,
    fontWeight: "500",
    color: myColors.navy,
    marginTop: windowHeight*0.08,
    marginBottom: 25,
  },
  field: {
    flexDirection: "row",
    borderBottomColor: myColors.grey,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 25,
    width: windowWidth * 0.75 - 30,
    maxWidth: windowWidth * 0.8,
  },
  datefield: {
    width: windowWidth * 0.75,
    marginBottom: 10,
    paddingBottom: 12,
  },
  fieldText: {
    color: myColors.navy,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.92,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "500",
    color: myColors.navy,
    paddingVertical: 8,
    paddingHorizontal:8,
  },
};

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(new Date(2001, 0, 1));
  const [passwordModalVisible, setPasswordModalVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("Failure");

  function onDateSelected(event, value) {
    setDob(value);
  };

  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }
  
  function containsLowercase(str) {
      return (/[a-z]/.test(str));
  }

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  const handleRegister = async () => {
    console.log("Registering...")



    // Make sure user isn't leaving any required fields empty
    if (!fullName || !email || !password || !dob || !confirmPassword) {
      setModalMessage("Please enter values for all fields");
      setModalVisible(true);
      console.log("fail");
      return; // Don't do API call if invalid data
    }

    // Make sure the confirmed password is the same as the original password
    if (password != confirmPassword) {
      setModalMessage("Passwords must match");
      setModalVisible(true);
        console.log("fail");
        return; // Don't do API call if invalid data
    }

    // Make sure password has one capital letter, one lowercase, one symbol, and one number
    if (!containsUppercase(password) || !containsLowercase(password) || !containsSpecialChars(password) || !containsNumbers(password)) {
      setPasswordModalVisible(true);
        console.log("fail");
        return; // Don't do API call if invalid data
    }

    let date = dob.toLocaleString('en-GB', { timeZone: 'America/New_York' }).split(',')[0];
    let dob_formatted = date.slice(3, 5) + '-' + date.slice(0, 2) + '-' + date.slice(6, 10);

    console.log(fullName)
    console.log(email)
    console.log(password)
    console.log(dob_formatted)
    
    var raw = JSON.stringify({
      name: fullName,
      email: email,
      password: password,
      birthdate: dob_formatted,
    });

    var requestOptions = {
      method: "POST",
      headers: {
        "x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/auth/signup",
      requestOptions
    )
      .then(response => response.text())
      .then((result) => {
        // Do stuff here
        var json = JSON.parse(result);
        console.log(json)
        // var message = json.message
        // console.log(message) // "User registration succesful"
        // navigation.navigate("Login");
      })
      .catch(error => console.log('error', error));
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          }}
          onShow={() => {
            setTimeout(() => {  setModalVisible(false); }, 1000);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => {
          setPasswordModalVisible(!passwordModalVisible);
          }}
          onShow={() => {
            setTimeout(() => {  setPasswordModalVisible(false); }, 4000);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.modalText}>Password must contain:</Text>
              <Text style={styles.modalText}>{'\u2022'} Uppercase letter</Text>
              <Text style={styles.modalText}>{'\u2022'} Lowercase letter</Text>
              <Text style={styles.modalText}>{'\u2022'} Special character</Text>
              <Text style={styles.modalText}>{'\u2022'} Number</Text>              
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }} >
        <View style={{ alignItems: 'center' }}>
          <View style={{width:windowWidth*0.75-30}}>
            <Text style={styles.title}>Register</Text>
          </View>

          <View style={styles.field}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={myColors.navy}
              autoCapitalize="none"
              onChangeText={(fullName) => setFullName(fullName)}
            />
          </View>

          <View style={styles.field}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={myColors.navy}
              inputMode="email"
              autoComplete="email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.field}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={myColors.navy}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View style={styles.field}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={myColors.navy}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)
              }
            />
          </View>

          <View style={{width:windowWidth*0.75-30}}>
            <Text style={styles.fieldText}>Date of Birth</Text>
          </View>

          <View style={styles.datefield}>
            <DateTimePicker display="spinner" value={dob} textColor={myColors.navy} onChange={onDateSelected} />
          </View>          
        </View>


        <CustomButton label={"Register"} onPress={() => handleRegister()} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: myColors.navy }}> Already Registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: myColors.navy, fontWeight: "700" }}>
              {" "}
              Login{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
