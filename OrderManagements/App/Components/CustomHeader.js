import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-native-paper';

import { ListItem, Icon } from '@rneui/themed';
import ApplicationConstant from 'src/Utles/ApplicationConstant'
import { Endpoints } from 'src/API'
import client from 'src/APIService'
import Loader from 'src/Components/Loader'

import { ListAccordionGroupContext } from 'react-native-paper/lib/typescript/components/List/ListAccordionGroup';
import { setUser ,setCustomerList,setProductList,setisLoader} from '../redux/Slices/MainSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CustomHeader = (props) => {
  let dispatch = useDispatch()
  var list = useSelector(state => state.auth.OrderList) 
  
  var user = useSelector(state => state.auth.user);

  //.filter(x => x.status == 'Order Placed');
  //list.filter(x => x.status == 'Order Placed')

  //const [Count, setCount] = useState(list != null?list.length:0);
  const LogOut = async () => {

   // await AsyncStorage.removeItem('ProductList');
    await AsyncStorage.removeItem('PendingProductList');
    dispatch(setUser(null))

  }
  const syncData =async()=>{
     const endPointProductDetail = Endpoints.endPointGetCustomerAppItemList + '?userID=' + user.id;


    console.log(endPointProductDetail)
    const headers = {
      "Content-Type": "application/json",
    }
    dispatch(setisLoader(true))
    const response = await client.get(endPointProductDetail, undefined, { headers });
   
    if (response.status === 200 || response.status === 202)
       {
        dispatch(setisLoader(false))
      let data = response.data;
  
      await AsyncStorage.setItem('ProductList', JSON.stringify(data.products));
      await AsyncStorage.setItem('CustomerList', JSON.stringify(data.customers));
      dispatch(setCustomerList(data.customers))
    }
    else{
      dispatch(setisLoader(false))
    }
  }


  useEffect(() => {
    if (list != null) {
      ///alert(JSON.stringify(list))
      //const newlist = list.filter(x => x.status === 'Order Placed');

      //setCount( newlist.length);
    }
    // ()}
  }, []);
  return (
    <>
      <StatusBar backgroundColor={ApplicationConstant.AppColor} />
      <View style={{ width: '100%',paddingTop:10, height: props.title == 'Dashboard' ? hp('20%') : hp('7%'), flexDirection: 'row', backgroundColor: ApplicationConstant.AppColor }}>

        <View style={{ paddingHorizontal: 10, flexDirection: 'row'  }}>
          
          <View style={{ flexDirection: 'row', width: wp('60%'),   alignItems: 'flex-start' }}>
            {props.isBack === true ?
              <Icon name="chevron-back-outline" type="ionicon" color="white" size={30} onPress={() => props.navigation.goBack()} /> : null
            }
            <Text allowFontScaling={false} style={{ color: '#fff', marginLeft: 10, fontSize: 20,fontWeight:'bold' }}>{props.title}</Text>
          </View>

          <View style={{ flexDirection: 'row', width: wp('40%') ,paddingRight:5 ,justifyContent:'space-evenly'}}>
            <View>
              <Icon name='sync-circle-outline' size={25} color='#fff' type="ionicon"
                onPress={syncData} />
            </View>
            <View>
              <Icon name='home' size={25} color='#fff' type="ionicon"
                onPress={() => props.navigation.navigate("DashboardScreen")} />
            </View>
            <View>
              <Icon name='power' size={25} color='#fff' type="fontisto"
                onPress={LogOut} />
            </View>
          </View>
        </View>
      </View>
    </>
    //     <View style={{ width: '100%', height: props.title=='Dashboard'?'20%':'10%',  flexDirection: 'row', backgroundColor: ApplicationConstant.AppColor }}>

    //     <StatusBar backgroundColor={ApplicationConstant.AppColor}  />

    //     <View style={{ flex: 1,   flexDirection: 'row' ,  height:'40%' }}>


    //     <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' , marginHorizontal:15 }}>
    //        {
    //        props.isBack===true?
    //     <Icon name="chevron-back-outline" type="ionicon" color="white"   onPress={() => props.navigation.goBack()}/>:null
    //     }

    //         <Text style={{ color: '#fff', marginLeft: 10, fontSize:20 }}>{props.title}</Text>
    //       </View>

    //       <TouchableOpacity    onPress={() => props.navigation.navigate("HomeScreen")}   style={{  justifyContent: 'center', alignItems: 'center' }}>


    // <View style={styles.tabContainer}>
    //     {

    //       ( list != null && list.length > 0) &&
    //       <View style={styles.tabBadge}>
    //  <Badge
    //   visible={true}
    //   size={20}
    //   style={{ top: 0, position: 'absolute' }}>
    //    {list.filter(x => x.status == 'Order Placed').length}

    // </Badge>



    //         {/* <Text style={styles.tabBadgeText}>
    //         {list.length}
    //         </Text> */}
    //       </View>

    //     }

    //   </View>

    //       </TouchableOpacity>

    //       <View
    //        style={{  justifyContent: 'center', alignItems: 'center', marginHorizontal:15 }}>
    //         <Icon name='power' size={25} color='#fff' type="fontisto"
    //         onPress={LogOut} />

    //       </View>

    //     </View>
    //     </View>
  )
}

export default CustomHeader;
const styles = StyleSheet.create({
  tabContainer: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  tabBadge: {
    position: 'absolute',
    top: -5,
    right: -10,




    zIndex: 2,

  },
  tabBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
});