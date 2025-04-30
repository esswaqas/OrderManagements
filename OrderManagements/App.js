import React,{useEffect,useState} from 'react';
import { LogBox ,AppState} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { useSelector,Provider, useDispatch } from 'react-redux';
import { setProductItemList, setisLoader, setPendingOrderList } from 'src/redux/Slices/MainSlice';
import LoginScreen from './App/Screens/Login/index';
 import TestPage from './App/Screens/Testing.js/Testing';
//import {CheckOnlineStatus} from './App/Screens/Testing.js/Testing';

import OrderDetail from './App/Screens/Home/OrderItems';
import CustomerList from './App/Screens/Dashboard/CustomerList';
import AreaList from './App/Screens/Dashboard/AreaList';
import OrderListDashboard from './App/Screens/Dashboard/OrderList';
import {ProccessPendingOrderList} from './App/Screens/Dashboard/ProccessPendingOrderList';
import HomeScreen from './App/Screens/Home/Home';
import DashboardScreen from './App/Screens/Dashboard/Dashboard';
import NewOrderScreen from './App/Screens/Order/NewOrder';
import CreateOrderScreen from './App/Screens/Order/CreateOrder';
import ProductDetailScreen from './App/Screens/Order/ProductDetail';
import OrderListScreen from './App/Screens/Order/OrderList';
import AsyncStorage from '@react-native-async-storage/async-storage';


import PendingOrderList from './App/Screens/Dashboard/PendingOrderList';
import ReceivablePayment from './App/Screens/Payment/ReceivablePayment';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer,useNavigation ,useFocusEffect} from '@react-navigation/native'
import {requestUserPermission,notificationlisteners} from './App/Utles/notificationService'
import Loader from 'src/Components/Loader'
import MessageBox from 'src/Components/MessageBox'
import NetInfo from '@react-native-community/netinfo';

import { toastConfig } from './App/Components/ToastConfig'
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';

import { store ,persistor } from './App/redux/store';

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
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerShown: false,
        backgroundColor: '#fff',
      }}
      >
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
    
     
      <Stack.Screen name="NewOrder" component={NewOrderScreen} />
      <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="CustomerList" component={CustomerList} />
      <Stack.Screen name="AreaList" component={AreaList} />
      <Stack.Screen name="OrderListDashboard" component={OrderListDashboard} />

      
      <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      <Stack.Screen name="PendingOrderListSreen" component={PendingOrderList} />
      
      <Stack.Screen name="ReceivablePayment" component={ReceivablePayment} />
   
    </Stack.Navigator>
  );
};
const AppWrap = () => {
  //const navigation = useNavigation();

  // const unsubscribe = NetInfo.addEventListener((state) => {
  //   // alert('dd')
  //    alert(state.isConnected)
     
  //  })

  useEffect(()=>{
    LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
    LogBox.ignoreAllLogs();//Hide all warning notifications on front-end
   // return () => unsubscribe();
   
  },[])

  return (
  

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
   
      <Toast config={toastConfig}   />
      </PersistGate>
    </Provider>
  );
  
};

const App = ({navigatiion}) =>
   {
 
 let dispatch = useDispatch()
 const tokenusers = useSelector(state => state.auth.token);
 var isloader = useSelector(state => state.auth.isLoader);

 
 var messageType = useSelector(state => state.auth.messageType);
 var messagetitle = useSelector(state => state.auth.messagetitle);
 var messagebody = useSelector(state => state.auth.messagebody);
 var messagecancelbtn = useSelector(state => state.auth.messagecancelbtn);
 var isvisibleMessage = useSelector(state => state.auth.isvisibleMessage);
 
 


 
 
 var user = useSelector(state => state.auth.user);
 
 const [isNetworkConnected, setisNetworkConnected] = useState();
  


 

//  useEffect(() => {
//   // Subscribe to network state updates
//   const unsubscribe = NetInfo.addEventListener((state) => {
//     setisNetworkConnected(state.isConnected);
//    });

//   // Cleanup the subscription on unmount
//   return () => unsubscribe();
// }, []);
const pedingOrderList = async ()=>
{
  const data = await AsyncStorage.getItem('PendingProductList');
 

 if (data != null) 
  {
   
     const pdata = JSON.parse(data);
     dispatch(setPendingOrderList(pdata))
   }
}
  useEffect(()=>{

 
 
    requestUserPermission();
    notificationlisteners(dispatch,tokenusers);
    pedingOrderList()
       NetInfo.addEventListener((state) => {
    setisNetworkConnected(state.isConnected);
    if(state.isConnected==true){
      ProccessPendingOrderList(dispatch)
    }
   });
    
    // const intervalId = BackgroundTimer.setInterval(() => {
    //  // alert(isNetworkConnected)
    //   if(user != null &&  isNetworkConnected){
    //   ProccessPendingOrderList(dispatch)}
    // /// alert("Running background task");
    //   // Your background task here (e.g., fetch data)
    // }, 15000);

    // return () => {
    //   // Stop the background timer when the component is unmounted
    //   BackgroundTimer.clearInterval(intervalId);
    // };

  },[])
  //var tokenuser = useSelector(state => state.auth.token);
//alert("APP TOEK ========  "+tokenuser)
  return (
    <NavigationContainer>
      
      {/* <HomeStacks /> */}

      {/* <AuthStack /> */}
       { user != null ? <HomeStacks />   :   <AuthStack />}   
       <Loader loading={isloader} /> 
       <MessageBox  isvisibleMessage={isvisibleMessage} MessageType={messageType} title={messagetitle} body={messagebody} isCancebtn={messagecancelbtn}  /> 
    </NavigationContainer>
   
  );
};
export default AppWrap;

