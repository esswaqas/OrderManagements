import {
    View, StyleSheet, TouchableOpacity, FlatList, Text,Alert,Image
} from 'react-native';

import React, { useState,useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
import {Endpoints} from '../../API'
import client from '../../APIService'
import { ListItem,Icon } from '@rneui/themed';

import style from 'src/StyleSheets/MainStyles';

import {Card} from '@rneui/base'
import Loader from 'src/Components/Loader'
import { useNavigation ,useFocusEffect} from '@react-navigation/native'

const LoginScreen = (props) => {
  const [loading, setLoadingLocal] = useState(false)
  let dispatch = useDispatch()
  const navigation = useNavigation()

    const tokenusers = useSelector(state => state.auth.token);
var list = useSelector(state => state.auth.OrderList);
    
    const [AllOrderList, setAllOrderList] = useState([]);
     
      const userID = useSelector(state => state.auth.userID);
      const [Data, setData] = useState();

      const Details =(id)=>{
        //navigation.navigate('OrderDetail')
        
        navigation.navigate('OrderDetail', {
          itemId: id,
        });
      }
  useEffect(() => {


    setAllOrderList(list);

  }, [list]);
//   const GetOrder = async () => {
//     try {
//       setLoadingLocal(true)
    
//      console.log("APP TOEK sdsdsd ========  "+tokenusers +"  =====  UserID    ==="+userID)
   
//       const endPointLogin = Endpoints.endPointGetOrderByuserID+""+userID;
   
// console.log(endPointLogin)
// let formData = new FormData();
//       const headers = {
//         "Content-Type": "application/json",
//        //'Accept': 'application/json',

//         'Authorization': "Bearer "+ tokenusers
//       }
  
//       const response = await client.get(endPointLogin,undefined,{headers});

      
//    //  alert("Login DAta "+  response.status)
     


//       if (response.status === 200 || response.status === 202) {
//         let data = response.data
//         //alert(JSON.stringify(data))
//         console.log("sddsadd  sdsd   "+data)
       
      
//         dispatch(setOrderList(data))
//        // const newlist = data.filter(x => x.status === 'space');


//         setNewOrdersList(data)
//         setLoadingLocal(false)
//       }
//       }
//     catch (error) {
//       setLoadingLocal(false)
//     //alert('error '+ error)
//       console.log(error)
//     }
//   }

const  rederItems = ({ item, index }) => {
    return (
      <TouchableOpacity  onPress={() => Details(item.id) }>
<ListItem bottomDivider>
<Icon name="first-order" type="font-awesome" color="grey" />
<ListItem.Content>
<ListItem.Title style={{fontSize:15}}>{item.customer.first_Name} {item.customer.last_Name}</ListItem.Title>
<ListItem.Subtitle style={{fontSize:12,color:'red'}}>
{item.status}
</ListItem.Subtitle>
</ListItem.Content>
<ListItem.Chevron color="black"/>
</ListItem> 
</TouchableOpacity>
    )}

return(


    <View style={style.ListPagecontainer}>
              {/* <Loader loading={loading} /> */}

                  
                    <FlatList
                data={AllOrderList} 
                renderItem={rederItems}
                //ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
                keyExtractor={(item) => item.id}
              />
                </View>
)



}

export default LoginScreen
