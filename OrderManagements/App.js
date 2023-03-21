import React,{useEffect} from 'react';
import { LogBox } from 'react-native';
 
import { useSelector,Provider, useDispatch } from 'react-redux';
import LoginScreen from './App/Screens/Login/index';
import TestPage from './App/Screens/Testing.js/Testing';
import OrderDetail from './App/Screens/Home/OrderItems';
import HomeScreen from './App/Screens/Home/Home';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer,useNavigation ,useFocusEffect} from '@react-navigation/native'
import {requestUserPermission,notificationlisteners} from './App/Utles/notificationService'
 

import { toastConfig } from './App/Components/ToastConfig'
import Toast from 'react-native-toast-message';
import { store } from './App/redux/store';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const AuthStack = ({...props}) => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        backgroundColor: '#fff',
      }}
      >
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="TestPage" component={TestPage} />
    </Stack.Navigator>
  );
};
const HomeStacks = ({...props}) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        backgroundColor: '#fff',
      }}
      >
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
     
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
};
const AppWrap = () => {
  //const navigation = useNavigation();


  useEffect(()=>{
 
    LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
  
    LogBox.ignoreAllLogs();//Hide all warning notifications on front-end


  },[])
  return (
    <Provider store={store}>
      <App />
      <Toast config={toastConfig}   />
    </Provider>
  );
};

const App = ({navigatiion}) => {
 // const {user} = useSelector((state) => state.auth.user)
 let dispatch = useDispatch()
 const tokenusers = useSelector(state => state.auth.token);

 
 
  var user = useSelector(state => state.auth.user);
 
  useEffect(()=>{
 
    requestUserPermission();
    notificationlisteners(dispatch,tokenusers);
 

  },[])
  //var tokenuser = useSelector(state => state.auth.token);
//alert("APP TOEK ========  "+tokenuser)
  return (
    <NavigationContainer>
      
     { user != null ? <HomeStacks />   :   <AuthStack />}
      {/* <DrawerStack navigatiion={navigatiion}/> */}
      {/* {user != null ?
       <DrawerStack navigatiion={navigatiion} />: <AuthStack />} */}
    </NavigationContainer>
   
  );
};
export default AppWrap;

