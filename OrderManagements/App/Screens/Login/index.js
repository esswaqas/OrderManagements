
import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,StatusBar
} from 'react-native';
import Style from '../../StyleSheets/LoginSS'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import {RFValue } from "react-native-responsive-fontsize";
//import {  setUser, setJToken, setUserID } from '../../redux/actions/authActions';
import Toast from 'react-native-toast-message'
import client from 'src/APIService'
import { useDispatch } from "react-redux"
import Loading from 'src/Components/Loading'
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {Images} from '../../Utles/images'
// import {Images} from '../../'
import {Endpoints} from 'src/API'
import { setJToken,setUser ,setUserID} from '../../redux/Slices/MainSlice';

const LoginScreen = () => {
  const navigation = useNavigation()


  let dispatch = useDispatch()

 
   const [userName, setuserName] = useState('')
   const [password, setPassword] = useState('')
  
  //  const [userName, setuserName] = useState('kasana1@gmail.com')
  //  const [password, setPassword] = useState('Mahmood1!')
  const [loading, setLoadingLocal] = useState()

  const userNameRef = useRef()
  const passwordRef = useRef()
const test=()=>{
  navigation.navigate("TestPage")
}

  const checkValidation = (checkableValue) => {
    if (checkableValue === null || checkableValue === undefined || String(checkableValue).trim() === '') {
    //  alert('vv')
      return true

    }
    else {
      return false
    }
  }
  const loginChecks = () => {
    if (checkValidation(userName) && checkValidation(password)) {
      Toast.show({
        type: "message",
        position: "top",
        props: {
          body: "Please enter fields"
        }
      })
    }
    else if (checkValidation(userName))
     {
       
    
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Please enter username'
      });
      // Toast.show({
      //   type: "message",
      //   position: "top",
        
      //   props: {
      //     body: "Please enter username"
      //   }
      // })
    }
    else if (checkValidation(password)) {

      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Please enter password'
      });
      // Toast.show({
      //   type: "message",
      //   position: "top",
      //   props: {
      //     body: ""
      //   }
      // })
    }
    else {
      handleLogin()
    }
  }
  const handleLogin = async () => {
    try {
      setLoadingLocal(true)

      const endPointLogin = Endpoints.endPointLogin+"?email="+userName+"&password="+password

      let formData = new FormData();
  var fcmToken =  await AsyncStorage.getItem("fcmToken")

      // formData.append("UserName", userName);
      // formData.append("PasswordHash", password);
//alert(endPointLogin)
      const headers = {
        "Content-Type": "application/json",
        "FCMToken" :fcmToken
      }
      //http://api.freeorder.co.uk/api/auth?email=jamshedmustafa34%2bfreeorder@gmail.com&password=Jam@1122
    //  const response = await client.post(endPointLogin, formData, headers)
    //  const response = await client.get(endPointLogin, headers);
      const response = await client.get(endPointLogin,undefined,{headers});

      //alert("Login DAta "+  response.status)
     


      if (response.status === 200 || response.status === 202) {
        let data = response.data
     //  alert("Login DAta "+  JSON.stringify(data))
    
        let responseStatus = data.error
        //alert(data.error)
        if (responseStatus === false || responseStatus===undefined ) {

         
           // dispatch(setUserData(data?.data))
          // dispatch(setDellerID(data?.data?.dealerID))
          // dispatch(setRoleName(data?.data?.roleName))
          // dispatch(setCaseUserID(data?.data?.editCaseUserID))
          //alert(response.data)
          await AsyncStorage.setItem("LoginUserId" ,response.data.userId);
          await AsyncStorage.setItem("JTToken" ,response.data.token);
           
          dispatch(setJToken(response.data.token))
          dispatch(setUserID(response.data.userId))
          dispatch(setUser(true))
          


          
          setLoadingLocal(false)
          
        }
        else {
          setLoadingLocal(false)
          Toast.show({
            type: "message",
            props: {
              body: JSON.stringify(data.message)
            }
          })
        }

      }
    }
    catch (error) {
      setLoadingLocal(false)
      console.log(error)
    }
  }
  return (

    <ImageBackground source={require('../../Images/b1.jpg')}  style={{   
       justifyContent: "center", height:'100%' ,width:'100%'}}>
    <ScrollView contentContainerStyle={{flexGrow:1}}>
    


      <View style={{ flex:1, alignItems: 'center', }}>

         <View style={Style.blackContainer}>
         <View style={{ height: hp('50%') }}>
            <Image style={{
              alignSelf: 'flex-end',
              height: hp('40%'),
              width: wp('100%')
            }}
              resizeMode="contain" 
              source={require('../../Images/b2.jpg')}
              />
          </View>  

        </View>  
        <View style={Style.loginForm} >
          <View>
            <View style={{
              flexDirection: "row", justifyContent: "center", alignItems: "center",
              marginTop: 0, marginBottom: 15,
            }}>
              <Text style={[Style.textFontFamily, { color: '#000000', textAlign: 'center', paddingLeft: 10, fontSize: RFValue(30) }]}>
                Login
                    </Text>
            </View>
          </View>

          <View style={{ width: wp('65%'), justifyContent: 'center', marginHorizental: 'auto' }} >

            <View style={Style.inputContainer}>
              <Text style={[Style.textFontFamily, { color: '#848588', textAlign: 'left', fontSize: RFValue(14) }]}>
                Username
                      </Text>
              <View style={Style.inputInnerContainer}>


                <TextInput style={Style.Logininputs}
                  ref={userNameRef}
                  placeholder="Username"
                  value={userName}
                  autoCapitalize="none"
                  keyboardType={"default"}
                  returnKeyType={"next"}
                  onChangeText={(userName) => setuserName(userName)}
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                }}
                blurOnSubmit={false}
                />
              </View>


            </View>

            <View style={Style.inputContainer}>

              <Text style={[Style.textFontFamily, { color: '#848588', textAlign: 'left', fontSize: RFValue(14) }]}>
                Password
                      </Text>
              <View style={Style.inputInnerContainer}>

                <TextInput style={Style.Logininputs}
                  ref={passwordRef}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                />
              </View>

            </View>
            {loading ?
              <View style={{ marginTop: 10 }}>
                <Loading />
              </View>
              :
<>
              <TouchableOpacity onPress={() => loginChecks()} style={[Style.LoginbuttonContainer]}>
                <Text style={{ color: '#FFFF', }}>LOGIN </Text>
              </TouchableOpacity>

              
 <TouchableOpacity onPress={() => test()} style={[Style.LoginbuttonContainer]}>
<Text style={{ color: '#FFFF', }}>test </Text>
</TouchableOpacity> 
</>
            }
          </View>
        </View>
        {/* <View style={Style.fixedIcon}>
          <Image style={{ width: wp('40') }} resizeMode="contain" source={Images.LoginStyle} />
        </View> */}
        
      </View>
    </ScrollView>
    </ImageBackground>

  );

}
export default LoginScreen