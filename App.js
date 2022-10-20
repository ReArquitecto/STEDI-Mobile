import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';




const AppStack = createNativeStackNavigator();

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [homeTodayScore, setHomeTodayScore] = React.useState(0);

   if (isFirstLaunch == true){
return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>

  );
} else if(isLoggedIn){
  return <Navigation/>
} else{
  return(
    <view>
    <TextInput style={StyleSheet.input}
    placeholderTextColor='#4251f5'
    placeholder='Phone Number'>
    </TextInput>
    <Button
    title='Send'
      style={StyleSheet.button}
      onPress={()=>{
        console.log('Button was pressed!')
      }}
     />
    </view>
  )
  }
}
 export default App;

