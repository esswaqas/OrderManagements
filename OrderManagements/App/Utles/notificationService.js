import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
import client from '../APIService'
 import {Endpoints} from '../API'
 import {OrderList} from './OrderList'
 
import { useSelector, useDispatch } from 'react-redux';

import Toast from 'react-native-toast-message'
import { setOrderList } from '../redux/Slices/MainSlice';
 
 
 


 


export  async function requestUserPermission() {

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken();
  }
}
const getToken=async () =>{
 

  const fcmTokens= await messaging().getToken();
  console.log('fcM Token ===   '+fcmTokens)
  var fcmToken =  await AsyncStorage.getItem("fcmToken")
 console.log("Old "+ fcmToken)
 if(fcmToken===null)
 {
  
    try{
//alert(1)
      //  const fcmToken = await messaging.getToken();
        const fcmToken = await messaging().getToken();

        if(fcmToken)
        {
          //  alert("new  Toke  "+ fcmToken)
            await AsyncStorage.setItem("fcmToken" ,fcmToken);

        }
    } catch(error){

 console.log("error in fcmtoken  " + error)
    }
 }


}


export const  notificationlisteners= async (dispatch )=>{
  

messaging().onNotificationOpenedApp(remotemessage=>{
   
  console.log('app to open for background state: ',remotemessage)
});

messaging().onMessage(async remotemessage =>{

 
 var user =  await AsyncStorage.getItem("LoginUserId")
  if(user!=null)
  { 
var jtoken =  await AsyncStorage.getItem("JTToken");
//alert(ss)
GetOrder(dispatch,user,jtoken)
NotificationSounds.getNotifications('notification').then(soundsList  => {
  console.warn('SOUNDS', JSON.stringify(soundsList));
  /*
  Play the notification sound.
  pass the complete sound object.
  This function can be used for playing the sample sound
  */
  //playSampleSound(soundsList[2]);
  // if you want to stop any playing sound just call:
  //stopSampleSound();
});
 console.log('receive in foreground: sdsas ',remotemessage);
  }
  else{
    //alert('Not')
  }

});
messaging().getInitialNotification().then(remoteMessage => {
  if (remoteMessage) {
   // alert('Notification caused app to open from quit state:')
    console.log(
      'Notification caused app to open from quit state:',
      remoteMessage.notification,
    );
  }
});



}


export default GetOrder = async (dispatch,userID,token) => {
  
  //alert(11)
  try {

   
    const tokenusers =token;// useSelector(state => state.auth.token);
 const endPointLogin = Endpoints .endPointGetOrderByuserID+"/"+userID;
   const headers = {
       "Content-Type": "application/json",
       'Authorization': "Bearer "+ tokenusers
     }
     const response = await client.get(endPointLogin,undefined,{headers});
     console.log("Login DAta FCFCFCFC "+  response.status)
     if (response.status === 200 || response.status === 202) {
       let data = response.data
    
      // alert('log')
       
       dispatch(setOrderList (data))
      
      

     }
     }
   catch (error) {
     //setIsload(false)

   //alert('error '+ error)
     console.log(error)
   }

 }
