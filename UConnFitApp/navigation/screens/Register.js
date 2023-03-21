import React, { useState } from "react";
import fetch from "node-fetch";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import CustomButton from "../../assets/Components/CustomButton";
import { myColors } from "../../assets/styles/ColorPalette";

let styles = {
  flexDirection: "row",
  borderBottomColor: myColors.grey,
  borderBottomWidth: 1,
  paddingBottom: 12,
  marginBottom: 25,
};

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");

  const alertSuccess = () => {
    const title = 'User registration sucessful';
    const message = 'Please log in with your email and password.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };
  const alertFailure = () => {
    const title = 'Registration Error';
    const message = 'Please make sure you enter information for all specified fields.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };

  const handleFullName = (text) => {
    setFullName(text);
  };
  const handleEmail = (text) => {
    setEmail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };
  // const handleConfirmPassword = (text) => {
  //   setConfirmPassword(text);
  // };
  const handleDob = (text) => {
    setDob(text);
  };

  const handleRegister = () => {
    (async () => {
      var raw = JSON.stringify({
        name: fullName,
        email: email,
        password: password,
        birthdate: dob,
      });

      // Make sure user isn't leaving any required fields empty
      if( !fullName || !email || !password || !dob ) { 
        alertFailure();
        console.log("fail");
        return; // Don't do API call if invalid data
      }

      var requestOptions = {
        method: "POST",
        headers: {
          "x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
          "Content-Type": "application/json",
        },
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/auth/signup",
        requestOptions
      )
      .then(response => response.text())
      .then((result) => {
        // Do stuff here
        var json = JSON.parse(result);
        var message = json.message
        console.log(message) // "User registration succesful"
        alertSuccess();
        navigation.navigate("Login");
      })
      .catch(error => console.log('error', error));
    })();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <Text
          style={{
            fontFamily: "System",
            fontSize: 28,
            fontWeight: "500",
            color: myColors.navy,
            marginTop: 100,
            marginBottom: 1,
          }}
        >
          Register
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 25,
          }}
        ></View>

        <View style={styles}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(fullName) => setFullName(fullName)}
          />
        </View>

        <View style={styles}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <View style={styles}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />
        </View>

        <View style={styles}>
          <TextInput
            placeholder="Date of Birth"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(dob) => setDob(dob)}
          />
        </View>

        <CustomButton label={"Register"} onPress={handleRegister} />

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
