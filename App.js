import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput} from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppStack = createNativeStackNavigator();
const loggedInStates={
  LOGGED_IN: 'LOGGED_IN',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  CODE_SENT: 'CODE_SENT'
}

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [loggedInState, setLoggedInState] = React.useState(loggedInStates.NOT_LOGGED_IN);
  const [homeTodayScore, setHomeTodayScore] = React.useState(0);
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [oneTimePassword, setOneTimePassowrd] = React.useState(null);

   if (isFirstLaunch == true){
    return(
      <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
  );
} else if(loggedInState == loggedInStates.LOGGED_IN){
  return <Navigation/>
} else if(loggedInState == loggedInStates.NOT_LOGGED_IN){
  return(
    <View>
    <TextInput 
    style={styles.input}
    placeholderTextColor='#4251f5'
    placeholder='Phone Number'
    onChangeText={setPhoneNumber}
    ></TextInput>
    <Button
    title='Send'
      style={styles.button}
      onPress={async()=>{
        console.log('Button was pressed!')
        await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,
        {
          method:'POST',
          headers:{
            'content-type':'application/text'
          }
        })
        setLoggedInState(loggedInStates.CODE_SENT)
      }}
     />
    </View>
  )}
  else if(loggedInState == loggedInStates.CODE_SENT) {
    return (
      <View>
        <TextInput 
          style={styles.input}
          placeholderTextColor='#4251f5'
          placeholder='Your one-time code'
          onChangeText={setOneTimePassowrd}
          keyboardType = "numeric"
    ></TextInput>
    <Button
    title='Loggin'
      style={styles.button}
      onPress={async()=>{
        console.log('Loggin button was pressed!')
        const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/',
        {
          method:'POST',
          headers:{
            'content-type':'application/text'
          },
          body:JSON.stringify({
            phoneNumber,
            oneTimePassword
          })
        })
        if (loginResponse.status == 200){
        setLoggedInState(loggedInStates.LOGGED_IN);
        } else {
          setLoggedInState(NOT_LOGGED_IN);
        }
        setLoggedInState(loggedInStates.CODE_SENT)
      }}
     />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
      flex:1, 
      alignItems:'center',
      justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 150,
  },
  margin:{
    marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }    
})
 export default App;

