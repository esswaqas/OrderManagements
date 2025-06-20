import React, { useState,useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground,
    ScrollView,StatusBar
  } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../Components/CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {  Icon } from '@rneui/themed';
import Toast from 'react-native-toast-message'
// import style from 'src/StyleSheets/MainStyles';
import Style from 'src/StyleSheets/LoginSS';
 //import Loading from '../../Components/Loading'
 import { setProductItemList ,setisLoader,setPendingOrderList} from 'src/redux/Slices/MainSlice';

 import {RFValue } from "react-native-responsive-fontsize";
 import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
 
const Option = [
    {
        name: 'Create Order',
        Link:"ClinicRegistration",
       // ImageURL:require('../../../Images/Icon/Clinic-Registration.png')
    },
    {
        name: 'Order List',
        Link:"CampRegistration",
       // ImageURL:require('../../../Images/Icon/Camp-Registration.png')
    }
    ,
    {
        name: 'Customer List',
        Link:"CampRegistration",
       // ImageURL:require('../../../Images/Icon/Camp-Registration.png')
    }
    ,
    {
        name: 'Peding Order',
        Link:"CampRegistration",
       // ImageURL:require('../../../Images/Icon/Camp-Registration.png')
    }
    // {
    //     name: 'League Registration',
    //     Link:"LeagueRegistration",
    //   //  ImageURL:require('../../../Images/Icon/League-Registration.png')    
    // },
    // {
    //     name: 'Other Registration',
    //     Link:"OtherRegistration",    
    //    // ImageURL:require('../../../Images/Icon/Other-Registration.png')  
    //   },
    // {
    //     name: 'Membership Registration',
    //     Link:"MembershipRegistration",
    //   ///  ImageURL:require('../../../Images/Icon/Membership-Registration.png')

    // },
    // {
    //     name: 'FAQs',
    //     Link:"RegistrationFaqs",    
    //       //  ImageURL:require('../../../Images/Icon/faq.png')

    // },
]
 

export default function App({navigation}) {
  let dispatch = useDispatch()
  var pendingProductList = useSelector(state => state.auth.PendingOrderList);
  //const [pendingOrders, setpendingOrders] = useState(pendingProductList);

  useEffect(() => {
    dispatch(setProductItemList([]))
  }, []);
   const GotoNewOrder=()=>{
    dispatch(setProductItemList([]))
    navigation.navigate('CreateOrder') // NewOrder
   }
    return (
     
        <>     

        
            <ScrollView contentContainerStyle={{flexGrow:1}}>
           <CustomHeader title="Dashboard" navigation={navigation}  />

           
            <View style={{ flex:1, alignItems: 'center',  }}>

           <View style={[Style.loginForm,{ borderRadius: 0, paddingVertical:0, marginTop:hp('-10%'),    backgroundColor: '#f2f2f2' }]}  >
            {/* Row start */}
           <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",marginTop: 0, marginBottom: 3, }}>

                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

        <TouchableOpacity style={[{padding:hp('5%'),     flex: 1,alignItems: 'center',justifyContent: 'center',    backgroundColor: 'white',marginRight:3}  ]}  onPress={() =>   GotoNewOrder()}> 
        
            
         
        {/* <Icon name="production quantity limits" type="material" color="black"    /> */}
        <Image style={{alignSelf:'center',width:hp('11%'),height:hp('11%')}}  resizeMode="contain"
               source={require('../../Images/Icon/icons8-new-order-100.png')}
                   />
           <Text style={{ color: 'red', fontSize: RFValue(12) ,color:'black'}}>New Order</Text>  
        
          </TouchableOpacity> 
 
          <TouchableOpacity style={[{padding:hp('5%'),    flex: 1,alignItems: 'center',justifyContent: 'center',    backgroundColor: 'white'}  ]}  onPress={() =>   navigation.navigate('OrderListDashboard')}>

          <Image style={{alignSelf:'center',width:hp('11%'),height:hp('11%')}}  resizeMode="contain"
               source={require('../../Images/Icon/icons8-order-list-100.png')}
                   />
             <Text style={{ color: 'red', fontSize: RFValue(12) ,color:'black'}}>Order List</Text>  
            {/* <Text style={{ color: 'red', fontSize: RFValue(15) ,color:'black'}}>Customer List</Text> */}
          </TouchableOpacity>
          </View>
          </View> 
        {/* end */}

           {/* Row start */}
           <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",marginTop: 0, marginBottom: 3, }}>

                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

        <TouchableOpacity style={[{padding:hp('5%'),    flex: 1,alignItems: 'center',justifyContent: 'center',    backgroundColor: 'white',marginRight:3}  ]}  onPress={() =>   navigation.navigate('CustomerList') } > 
        
            
         
        {/* <Icon name="production quantity limits" type="material" color="black"    /> */}
        <Image style={{alignSelf:'center',width:hp('11%'),height:hp('11%')}}  resizeMode="contain"
               source={require('../../Images/Icon/icons8-list-100.png')}
                   />
<Text style={{ color: 'red', fontSize: RFValue(12) ,color:'black'}}>Customer List</Text>  
        
          </TouchableOpacity> 
        
          <TouchableOpacity style={[{padding:hp('5%'),    flex: 1,alignItems: 'center',justifyContent: 'center',    backgroundColor: 'white' }  ]}  onPress={() =>   navigation.navigate('AreaList') } >

          <Image style={{alignSelf:'center',width:hp('11%'),height:hp('11%')}}  resizeMode="contain"
               source={require('../../Images/Icon/icons8-area-chart-100.png')}
                   />
            <Text style={{ color: 'red', fontSize: RFValue(12) ,color:'black'}}>Area List</Text>  
          </TouchableOpacity>

          </View>
          </View> 
        {/* end */}
        
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",marginTop: 0,   }}>

                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

                    <TouchableOpacity 
  style={[{padding: hp('5%'), flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginRight: 3}]}
  onPress={() => navigation.navigate('PendingOrderListSreen')}
>
    {/* Image with count on top */}
    <View style={{position: 'relative'}}>
      <Image 
        style={{alignSelf: 'center', width: hp('11%'), height: hp('11%')}}  
        resizeMode="contain"
        source={require('../../Images/Icon/icons8-data-pending-100.png')}
      />
      
      {
        pendingProductList != null && pendingProductList.length > 0 &&
        <View 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'red',  // Background color for the count badge
            borderRadius: hp('2%'),  // Make it round
            paddingHorizontal: hp('0.5%'),  // Horizontal padding for the count text
            paddingVertical: hp('0.2%'),  // Vertical padding for the count text
          }}
        >
          <Text style={{color: 'white', fontSize: RFValue(12), fontWeight: 'bold'}}>
            {pendingProductList.length}
          </Text>
        </View>
      }
    </View>
    
    <Text style={{color: 'black', fontSize: RFValue(12)}}>Pending Order</Text>

</TouchableOpacity>
        
          <TouchableOpacity style={[{padding:hp('5%'),    flex: 1,alignItems: 'center',justifyContent: 'center',    backgroundColor: 'white' }  ]} onPress={()=> navigation.navigate('ReceivablePayment')} >

          <Image style={{alignSelf:'center',width:hp('11%'),height:hp('11%')}}  resizeMode="contain"
               source={require('../../Images/Icon/icons8-payment-100.png')}
                   />
            
            <Text style={{ color: 'red', fontSize: RFValue(12) ,color:'black'}}>Payment</Text>  
          </TouchableOpacity>
          </View>
          </View> 

             

           
            
      

          </View>
        </View>
        </ScrollView>
            
           
    
     
    
   
    
   
           
           
          </>
        
      );
}