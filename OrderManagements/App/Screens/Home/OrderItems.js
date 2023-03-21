import {
    View, StyleSheet, TouchableOpacity, FlatList,ScrollView ,Text,Alert,Image
} from 'react-native';
 import React, { useState,useEffect } from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import RNPrint from 'react-native-print';
  
import Moment from 'moment';

import { DataTable } from 'react-native-paper';
import { ListItem,Icon,Button } from '@rneui/themed';
import CustomHeader from '../../Components/CustomHeader';
import TimeModel from '../../Components/TimeModel';
import { useNavigation ,useFocusEffect} from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import {Endpoints} from '../../API'
import client from '../../APIService'
import Toast from 'react-native-toast-message'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import style from '../../StyleSheets/MainStyles';
import Loader from 'src/Components/Loader'

import { setOrderList } from '../../redux/Slices/MainSlice';


import CustomerLocation from './Map'
import {Card} from '@rneui/base'
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';

const OrderItems = ({ route, navigation }) => {
  let dispatch = useDispatch()

    const { itemId } = route.params;
   var list = useSelector(state => state.auth.OrderList);
   const token = useSelector(state => state.auth.token);
   const userID = useSelector(state => state.auth.userID);
   const [Isload, setIsload] = useState(false);
   const [OrderDate, setOrderDate] = useState('');
   const [OrderStatus, setOrderStatus] = useState('');
   const [OrderID, setOrderID] = useState('');
   const [CustomerName, setCustomerName] = useState('');
   const [phoneNumber, setphoneNumber] = useState('');
   const [customerEmail, setcustomerEmail] = useState('');
   const [CustomerAddress, setCustomerAddress] = useState('');
   const [OrderType, setOrderTye] = useState('');
   const [Items, setItems] = useState([]);
   const [PostCode, setPostCode] = useState('');
   const [visiblePopup, setvisiblePopup] = useState(false);


 
   

    useEffect(() => {
      const detail = list.filter(x => x.id === itemId);
      var customerInfo = detail[0].customer;
      setOrderDate(detail[0].orderDate)
      setOrderStatus(detail[0].status)
      setOrderTye(detail[0].orderingMethod)
      setOrderID(detail[0].id)
      setCustomerName(customerInfo.first_Name+' '+customerInfo.last_Name)
      setcustomerEmail(customerInfo.email)
      setCustomerAddress(customerInfo.address1)
      setPostCode(customerInfo.postCode)
      setphoneNumber(customerInfo.phone)
      setItems(detail[0].orderDetails)
      //setAllOrderList(detail)
      
    }, []);



 const PrintPage = async () =>
{


    var orderDateP= Moment(OrderDate).format("dddd, MMMM Do YYYY, h:mm:ss a")
   
  var boday = ``;
  var grandunitTotal=parseFloat(0).toFixed(2);
  var grandTotal=parseFloat(0).toFixed(2);;
  //alert("DATA PAFD =="+ JSON.stringify(this.state.PDFDATA))
  for(let obj of Items)
   
  {
    
    
    var  tr = '';
   
   var itemname = obj.menuItemName;
  
   var Quantity = obj.quantity;
     var price =  obj.price!= null ? obj.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): '';
   var totalPrice =  obj.totalPrice!= null ?obj.totalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,'): '';
   grandunitTotal=  parseFloat(grandunitTotal) + parseFloat(obj.price)
   //alert(grandunitTotal)
   grandTotal=parseFloat(grandTotal) + parseFloat(obj.totalPrice)
    tr=`
    <tr class="tabletitle" style="border-bottom: 0.65px solid !important">

     <td class="tableitem"><p class="itemtext">${itemname}</p></td>
     <td class="tableitem"><p class="itemtext">${Quantity}</p></td>
     <td class="tableitem"><p class="itemtext Amount">£${price}</p></td>
     <td class="tableitem"><p class="itemtext Amount">£${totalPrice}</p></td>
     </tr>
    
    `;
  
    //alert("tr======="+tr)
    boday+=tr;
  
  }
  var grandTotalTr=` 
    <tr class="tabletitle">
  <td></td>
  <td class="Rate"><h2>Total</h2></td>
  <td class="payment Amount"><h2>£${parseFloat(grandunitTotal).toFixed(2)}</h2></td>
  <td class="payment Amount"><h2>£${parseFloat(grandTotal).toFixed(2)}</h2></td>
</tr>`;
boday+=grandTotalTr;

  var html=`  <html>
  <head>
    <meta charset="utf-8">
    <title>Invoice</title>
    <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
    <style>
      ${htmlStyles}
    </style>
  </head>
  <body>
  <div id="invoice-POS">
            <div class="info">
                <h2>Free Order</h2>
            </div><!--End Info-->
   
    
            <div id="mid">
                <table style="width: 100%; border-collapse:collapse">
                    <tr style="background:grey;">
                        <td style="color: white; padding:2mm;  "> ${PostCode}</td>
                        <td style="color: white; text-align: right;  ">${CustomerName}</td>
                    </tr>
                </table>
                <p>${orderDateP}</p>
                <hr />
                <p style="text-align:center"> <b>${OrderType}</b></p>

              
            </div>
    <!--End Invoice Mid-->
  
        <div id="bot">
      
       
        <div id="table" style="border-top: 0.65px solid !important; border-bottom: 0.65px solid !important">

                <table>
                <tr class="tabletitle" style="border-bottom: 0.65px solid !important">

                        <td class="item"><h2>Item</h2></td>
                        <td class="Hours"><h2>Qty</h2></td>
                        <td class="Rate"><h2>Unit Price</h2></td>
                        <td class="Rate"><h2>Total Price</h2></td>
                    </tr>

                    ${boday}

                </table>
            </div><!--End Table-->
           
            <div id="legalcopy">
                <p class="legal">
                    <strong>Thank you for your business!</strong>  
                </p>
            </div>

        </div><!--End InvoiceBot-->
    </div>
  </body>
</html>`;

  await RNPrint.print({
    html:  html
  })

}

const SetDeliveryTime =(value,type)=>{


  if(value!='' && type=='Accept')
  {
    setvisiblePopup(false)
    UpdateOrderStatus(OrderID,'Accept',value)

}
else{
  if(type!='Cencel')
  {
  Toast.show({
    type: 'error',
    text1: 'Warning',
    text2: 'Please enter time first to procced.'
  });
}
else{
  setvisiblePopup(false)
}
}
}
 
const ShowPopup =(value)=>{

  setvisiblePopup(true)
}

    const UpdateOrderStatus = async (id,status,time) => {
       try {
     setIsload(true)
      const endPointLogin = Endpoints.endPointUpdateOrderStatus+"/"+id+"?userid="+userID+"&Status="+status+'&delivertime='+time ;
     // alert(endPointLogin)
       const headers = {
        "Content-Type": "application/json",
        'Authorization': "Bearer "+ token
      }
      const response = await client.put(endPointLogin,undefined,{headers});
      console.log("Login DAta "+  response.status)
      if (response.status === 200 || response.status === 202) 
      {
        setIsload(false)
        Toast.show({
          type: 'error',
          text1: 'success',
          text2: 'Status has been updated successfully.'
        });
         
     navigation.reset({ routes: [{ name: 'HomeScreen' }] });
      }
      else{
        setIsload(false)
      }
    }
    catch (error) {
      setIsload(false)

    //alert('error '+ error)
      console.log(error)
    }

}

return(
<View style={{backgroundColor:'white', flexDirection: 'column', flex:1}}>   
<CustomHeader title="Order Detail" navigation={navigation} isBack={true} />
<Loader loading={Isload} />
{
  visiblePopup==true?
<TimeModel SetDeliveryTime={SetDeliveryTime}  visible={true}  />
:
<TimeModel SetDeliveryTime={SetDeliveryTime}  visible={false}  />
}
<Card containerStyle={[style.CardHeader_Button,{flex:2}]}>
 
<ScrollView>

   <View>
   <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={style.ListRowTextOrderDetail}>Order Date</Text>
        <Text style={style.ListRowTextOrderDetail}>{OrderDate} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={style.ListRowTextOrderDetail}>Order Type</Text>
        <Text style={style.ListRowTextOrderDetail}>{OrderType} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={style.ListRowTextOrderDetail}>Order Status</Text>
        <Text style={style.ListRowTextOrderDetail}>{OrderStatus} </Text>
    </View>

    <CardDivider/>

    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>

         <Text style={[style.ListRowText,{fontSize:RFValue(12),fontWeight:'bold'}]}>{CustomerName}</Text>
 
         
    </View>
    
    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
          <Icon name="envelope" type="font-awesome" color="grey"  size={hp('2%')} style={{paddingLeft: 5}} />
          <Text style={[style.ListRowText,{fontSize:RFValue(11)}]}> {customerEmail}</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
          <Icon name="phone" type="font-awesome" color="grey"  size={hp('2%')} style={{paddingLeft: 5}}/>
          <Text style={[style.ListRowText,{fontSize:RFValue(11)}]}> {phoneNumber}</Text>
    </View>
    <CardDivider />
 

<View style={{ flexDirection:'row'  ,  justifyContent: 'space-between'  ,paddingBottom:5}}>

<View style={{flex:2, }}>
<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>

         <Text style={[style.ListRowText,{fontSize:RFValue(12),fontWeight:'bold'}]}>{CustomerAddress}</Text>
 
         
    </View>
</View>
<View style={{flex:2 ,height:hp('15%'),}}>
<CustomerLocation postCode={PostCode}/>


</View>

</View>
<CardDivider/>
<DataTable style={{paddingLeft:hp('0.1%'),paddingRight:hp('0.1%')}}>
<View  style={{ flexDirection:'row',  backgroundColor:'#f3f3f3',paddingBottom:5,paddingTop:5 }}>
<View style={{flex:2,alignSelf:'center'}}><Text style={[style.font12,{fontWeight:'bold'}]}>Item Name</Text></View>
<View style={{flex:1,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'center' ,fontWeight:'bold'}]}>Qty</Text></View>
<View style={{flex:1,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'right',fontWeight:'bold'}]}>Unit Price</Text></View>
<View style={{flex:1 ,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'right',fontWeight:'bold'}]}>Total Price</Text></View>
     </View>

{
  Items.map((item, i) => {
      return (
    <View style={{flexDirection:'row' ,borderBottomColor:'#E8e5e5', borderBottomWidth:1,paddingBottom:4,paddingTop:4}}>
      <View  style={{flex:2,alignSelf:'center' }}><Text style={[style.font12,{flexWrap:'wrap'}]}>{item.menuItemName} </Text></View>
      <View  style={{flex:1,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'center'}]}>{item.quantity} </Text></View>
      <View  style={{flex:1,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'right'}]}>£{parseFloat(item.price).toFixed(2)}</Text></View>
      <View  style={{flex:1,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'right'}]}>£{parseFloat(item.totalPrice).toFixed(2)}</Text></View>
  </View>
  )})
  }

  {
    Items.length>0?
  
   <View style={{flexDirection:'row'}}>
      <View  style={{flex:2,alignSelf:'center' }}><Text style={[style.font12]}>Total</Text></View>
      <View  style={{flex:1,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'center'}]}>{Items.map(item => item.quantity).reduce((acc, amount) => acc + amount)}</Text></View>
      <View  style={{flex:1,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'right'}]}>£{parseFloat(Items.map(item => item.price).reduce((acc, amount) => acc + amount)).toFixed(2) }</Text></View>
      <View  style={{flex:1,alignSelf:'center'}}><Text style={[style.font12,{textAlign:'right'}]}>£{ parseFloat (Items.map(item => item.totalPrice).reduce((acc, amount) => acc + amount)).toFixed(2)}</Text></View>
  </View>:null
        }
    
</DataTable>


         

   </View>
</ScrollView>
</Card>
<View style={{flex:0.25,flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'  ,backgroundColor:'white', borderTopWidth:0.5} }>
{

OrderStatus=="Order Placed"?

<>

<TouchableOpacity style={{ flex: 2}}>

<Icon name="squared-cross" type="entypo" color="black"  size={hp('3.5%')} onPress={()=> UpdateOrderStatus(OrderID,"reject")}/>


</TouchableOpacity>


<TouchableOpacity style={{ flex: 2}} >

<Icon name="check-square" type="font-awesome" color="black"  size={hp('3.5%')} onPress={()=> ShowPopup()}/>

</TouchableOpacity>


</>
:

null

}
<TouchableOpacity style={{ flex: 2}} onPress={()=> PrintPage()} >

<Icon name="print" type="font-awesome" color="black"  size={hp('3.5%')}/>

</TouchableOpacity>
</View>

                 


         
 
                </View>   
  
)



}

export default OrderItems
const htmlStyles = `
#invoice-POS {
  box-shadow: 0 0 1in -0.50in rgba(0, 0, 0, 0.5);
  padding: 4mm;
  margin: 2 auto;
  width: 100mm;
  background: #FFF;
}

  #invoice-POS ::selection {
      background: #f31544;
      color: #FFF;
  }

  #invoice-POS ::moz-selection {
      background: #f31544;
      color: #FFF;
  }

  #invoice-POS h1 {
      font-size: 1.5em;
      color: #222;
  }

  #invoice-POS h2 {
      font-size: 0.9em;
  }

  #invoice-POS h3 {
      font-size: 1.2em;
      font-weight: 300;
      line-height: 2em;
  }

  #invoice-POS p {
      font-size: 0.7em;
      color: #666;
      line-height: 1.2em;
  }



  #invoice-POS #top {
      min-height: 100px;
  }

  #invoice-POS #mid {
      min-height: 80px;
  }

  #invoice-POS #bot {
      min-height: 50px;
  }

  #invoice-POS #top .logo {
      height: 20px;
      width: 30px;
      background-size: 60px 60px;*/
  }

  #invoice-POS .clientlogo {
      float: left;
      height: 60px;
      width: 60px;
      background-size: 60px 60px;
      border-radius: 50px;
  }

  #invoice-POS .info {
      display: block;
      margin-left: 0;
  }

  #invoice-POS .title {
      float: right;
  }

      #invoice-POS .title p {
          text-align: right;
      }

  #invoice-POS table {
      width: 100%;
      border-collapse: collapse;
  }

  #invoice-POS .tabletitle {
    font-size: 0.8em;
    background: #EEE;
}

  #invoice-POS .service {
      border-bottom: 1px solid #EEE;
  }

  #invoice-POS .item {
      width: 24mm;
  }

  #invoice-POS .itemtext {
      font-size: 0.70em;
  }

  #invoice-POS #legalcopy {
      margin-top: 5mm;
  }
.Amount{
 text-align:right;
}
`;