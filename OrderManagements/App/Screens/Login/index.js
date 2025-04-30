
import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ScrollView, StatusBar
} from 'react-native';
import Style from '../../StyleSheets/LoginSS'
import moment from 'moment'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
//import {  setUser, setJToken, setUserID } from '../../redux/actions/authActions';
import Toast from 'react-native-toast-message'
import client from 'src/APIService'
import { useDispatch } from "react-redux"
import Loading from 'src/Components/Loading'
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native'
 
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Images } from '../../Utles/images'
// import {Images} from '../../'
import { Endpoints } from 'src/API'
import { setJToken, setUser, setUserID, setCustomerList, setProductList } from '../../redux/Slices/MainSlice';

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
  const test = () => {
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
          title: 'Warning',
          body: "Please enter fields"
        }
      })
    }
    else if (checkValidation(userName)) {


      Toast.show({
        type: "message",
        position: "top",
        props: {
          title: 'Warning',
          body: "Please enter username"
        }
      })
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
        type: "message",
        position: "top",
        props: {
          title: 'Warning',
          body: "Please enter password"
        }
      })
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
      //await AsyncStorage.removeItem('LoginDate');
      var UserInfo = await AsyncStorage.getItem("UserInfo")

      var loginDate = await AsyncStorage.getItem("LoginDate")
      var currentDate =  moment().format('YYYY-MM-DD'); //moment(moment().date()).format('DD-MM-YY')

      var customeerList = await AsyncStorage.getItem('CustomerList');

      // if user login on same date after login first time in a day
      //alert(loginDate+'  - cc '+currentDate)
      if (UserInfo != null && customeerList!=null && loginDate == currentDate) {
       var userdata= JSON.parse(UserInfo)
      
       if(userdata.username==userName && userdata.password==password){
        dispatch(setUser(userdata))
        dispatch(setCustomerList(JSON.parse(customeerList)))
        return false;
      }
      }
      setLoadingLocal(true)
      //  return false;
      const endPointLogin = Endpoints.endPointLogin + "?username=" + userName + "&password=" + password
   //   alert(endPointLogin)
      let formData = new FormData();
      var fcmToken = await AsyncStorage.getItem("fcmToken")
      const headers = {
        "Content-Type": "application/json",
        //"FCMToken" :fcmToken
      }
      //http://api.freeorder.co.uk/api/auth?email=jamshedmustafa34%2bfreeorder@gmail.com&password=Jam@1122
      //  const response = await client.post(endPointLogin, formData, headers)
      //  const response = await client.get(endPointLogin, headers);

      const response = await client.post(endPointLogin, undefined, { headers });

      // alert("Login DAta "+  response.status)
      // alert("Login DAta "+  JSON.stringify(response))


      if (response.status === 200 || response.status === 202) {

        let data = response.data;
        // console.log("Login DAta "+  JSON.stringify(data))
        ////console.log("Login USer DAta "+  JSON.stringify(data?.user))
        let responseIsError = data.isError
        //alert(responseIsErrore)
        if (responseIsError === null || responseIsError === false || responseIsError == undefined) {



          dispatch(setUser(data?.user))
          await AsyncStorage.setItem('UserInfo', JSON.stringify(data?.user));
          await AsyncStorage.setItem('LoginDate', currentDate);
          await AsyncStorage.setItem('CustomerList', JSON.stringify(data.customerList));
          dispatch(setProductList([]))
          setLoadingLocal(false)
          dispatch(setCustomerList(data.customerList))
          //   if(data.customerList.length>0)
          //   {
          //   var cclist = []

          // for (let item of data.customerList) {

          //       if ( item.lastName != null && item.lastName != '') 
          //         {

          //           cclist.push({ id: item.id, name: (item.firstName + ' ' + item.lastName),address:item.address });
          //        }
          //       else { 
          //         cclist.push({ id: item.id, name: item.firstName,address:item.address });
          //       }

          //     }

          //     dispatch(setCustomerList(cclist))
          //   }
          //   else{
          //     dispatch(setCustomerList([]))
          //   }



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

    <ImageBackground source={require('../../Images/b1.jpg')} style={{
      justifyContent: "center", height: '100%', width: '100%'
    }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>



        <View style={{ flex: 1, alignItems: 'center', }}>

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


                  {/* <TouchableOpacity onPress={() => test()} style={[Style.LoginbuttonContainer]}>
                    <Text style={{ color: '#FFFF', }}>test </Text>
                  </TouchableOpacity> */}
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