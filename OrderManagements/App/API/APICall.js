import React, { Component } from 'react';
 
 
 
import AsyncStorage from '@react-native-async-storage/async-storage';

 export   const APICall = async (CallType, rURL, bodyObject,userID, userName, CartItems) => {

if(CallType==="POST")
{
     //var url = 'https://trotters.azurewebsites.net/api/jewelleryAPI/' + rURL;  
     var url = 'https://chronokey-dev.azurewebsites.net/api/'+ rURL; 
     console.log("URL =="+url)
     console.log("body  body body   ===="+JSON.stringify(
        bodyObject
    ))
    
   return  await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
           
        },
        body: JSON.stringify(
            bodyObject
        )
    }) 
     

}
else
{

  
    var url = 'https://chronokey-dev.azurewebsites.net/api/'+ rURL; 
   
  //var url = 'https://trotters.azurewebsites.net/api/jewelleryAPI/' + rURL; 
    
  console.log(url)
    return await   fetch(url, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'LoginUserID':  ''+LoginUserID +'',
            // 'CompanyID':  ''+1 +'',
            // 'LoginUserName': ''+userName+'',
            // 'CartItems': CartItems==null?'':CartItems
        },
    })
}
     
//return res;
  }

  
 

 