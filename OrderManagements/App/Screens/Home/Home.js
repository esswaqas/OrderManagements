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
import NewOrderList from './NewOrderList'

import CompleteOrderList from './CompleteOrderList'
import Loader from 'src/Components/Loader'

import {Endpoints} from '../../API'
import { setOrderList ,setNewOrder} from '../../redux/Slices/MainSlice';


function HomeScreen(props) 
{
  var list = useSelector(state => state.auth.OrderList);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        
      </Text>
    </View>
  );
}

function SettingsScreen() {
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App({navigation}) {

  let dispatch = useDispatch()

    const tokenusers = useSelector(state => state.auth.token);
     

    
    const [AllOrderList, setAllOrderList] = useState([]);
    const [IsDataLoad, setIsDataLoad] = useState(false);
    const [Isload, setIsload] = useState(false);
    const [PendingOrderList, setPendingOrderList] = useState([]);
      const userID = useSelector(state => state.auth.userID);
      
  useEffect(() => {
 
    GetOrder()
  }, []);
  
  const GetOrder = async () => {
    try {
     setIsload(true)
    
     console.log("APP TOEK sdsdsd ========  "+tokenusers +"  =====  UserID    ==="+userID)
   
      const endPointLogin = Endpoints.endPointGetOrderByuserID+"/"+userID;
   
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
        //alert(JSON.stringify(data))
        console.log(data)
       //setAllOrderList(data)
       //setPendingOrderList(data)
       setIsDataLoad(true)
       setIsload(false)
        
        dispatch(setOrderList(data))
        dispatch(setNewOrder(data))

       
      }
      }
    catch (error) {
      setIsload(false)

    //alert('error '+ error)
      console.log(error)
    }
  }
  return (
    // <View>
    <>     
       <CustomHeader title="Orders" navigation={navigation} />
       {/* <Loader loading={Isload} /> */}
    
     
{
IsDataLoad==true?
<Tab.Navigator>

 
   <Tab.Screen name="New" component={NewOrderList} />
        <Tab.Screen name="Completed" component={CompleteOrderList} />
        <Tab.Screen name="All" component={OrderPage} />

</Tab.Navigator>

      :
<Tab.Navigator>

      <Tab.Screen name="New" component={HomeScreen} />
        <Tab.Screen name="Completed" component={SettingsScreen} />
        <Tab.Screen name="All" component={SettingsScreen} />
    

        
       </Tab.Navigator>
       
       }
      </>
    
  );
}




