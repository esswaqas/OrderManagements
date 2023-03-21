import React, { useState,useEffect } from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../Components/CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message'
import client from '../../APIService'
 //import Loading from '../../Components/Loading'
import OrderPage from './OrderList'
import OrderPendingPage from './CompleteOrderList'
import Loader from 'src/Components/Loader'


import {Endpoints} from '../../API'
import { setOrderList } from '../../redux/Slices/MainSlice';


 
 

const Tab = createMaterialTopTabNavigator();

export default function App({navigation}) {

  let dispatch = useDispatch()
  const [loading, setLoadingLocal] = useState(false)

  //const navigation = useNavigation()
    const tokenusers = useSelector(state => state.auth.token);
    
    const [AllOrderList, setAllOrderList] = useState([]);
    const [PendingOrderList, setPendingOrderList] = useState([]);
      const userID = useSelector(state => state.auth.userID);
      
  useEffect(() => {
   // GetOrder()
  }, []);
  const GetOrder = async () => {
    try {
      setLoadingLocal(true)
      
     console.log("APP TOEK sdsdsd ========  "+tokenusers +"  =====  UserID    ==="+userID)
   
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

      
     //alert("Login DAta "+  response.status)
     


      if (response.status === 200 || response.status === 202) {
        let data = response.data
        //alert(JSON.stringify(data))
        console.log(data)
       setAllOrderList(data)
       setPendingOrderList(data)
        dispatch(setOrderList(data))
        setLoadingLocal(false)
        // navigation.navigate("All")
       
      }
      }
    catch (error) {
    setLoadingLocal(false)
    //alert('error '+ error)
      console.log(error)
    }
  }
  return (
    // <View>
    <>     
       <CustomHeader title="Orders" navigation={navigation} />
       {/* <Loader loading={loading} /> */}
       <Tab.Navigator>
       <Tab.Screen name="All" component={OrderPage} />
        <Tab.Screen name="Pending" component={OrderPendingPage} />

        {/* <Tab.Screen name="All" 
            children={()=><OrderPage AllOrderList={AllOrderList}/>}

        
        />
        <Tab.Screen name="Pending"  children={()=><OrderPendingPage PendingOrderList={PendingOrderList} />
      }/> */}
       </Tab.Navigator>
      </>
    
  );
}




