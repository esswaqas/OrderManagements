import React, { Component } from 'react';
 
 
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../APIService'
 import {Endpoints} from '../API'

import { useSelector, useDispatch ,Provider} from 'react-redux';
import Toast from 'react-native-toast-message'
import { setOrderList } from '../redux/Slices/MainSlice';

 //export   const OrderList = async (userID) => {

    export   function OrderList({navigation}) {
        let dispatch = useDispatch();

useEffect(() => {
    const userID = useSelector(state => state.auth.userID)
    GetOrder(userID)
}, []);
        const GetOrder = async (userID) => {
      try {
    //    ;
   
  alert('ffffffrom cc  ' +userID)
    const endPointLogin = Endpoints.endPointGetOrderByuserID+""+userID;
 
console.log(endPointLogin)
let formData = new FormData();
    const headers = {
      "Content-Type": "application/json",
     //'Accept': 'application/json',

      'Authorization': "Bearer "+ tokenusers
    }
    //http://api.freeorder.co.uk/api/auth?email=jamshedmustafa34%2bfreeorder@gmail.com&password=Jam@1122
  //  const response = await client.post(endPointLogin, formData, headers)
    const response = await client.get(endPointLogin,undefined,{headers});

    
    console.log("Login DAta "+  response.status)
   


    if (response.status === 200 || response.status === 202) {
      let data = response.data
      
       
       dispatch(setOrderList(data))

     
    }
    }
  catch (error) {
    
  }}

 }

  
 

 