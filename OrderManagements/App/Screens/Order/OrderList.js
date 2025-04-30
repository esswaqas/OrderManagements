import React, { useState, useEffect } from 'react';
import { Text, Modal, View, Button, FlatList, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
 

import CustomHeader from '../../Components/CustomHeader';
import { ListItem, Icon, Card, CheckBox, Button as ElementButton } from '@rneui/themed';
import { TextInput as LabelTextInput, Button as PaperButton } from 'react-native-paper';
import style from 'src/StyleSheets/MainStyles'
import { Endpoints } from 'src/API'
import client from 'src/APIService'
import { useSelector, useDispatch } from 'react-redux';
 
import ApplicationConstant from 'src/Utles/ApplicationConstant'
import { setProductItemList ,setisLoader,setPendingOrderList} from 'src/redux/Slices/MainSlice';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function OrderDetail({ route, navigation }) {

    let dispatch = useDispatch()
    const { customer ,customerID} = route.params;
    
    //alert(customer)
    const [Customer, setCustomer] = useState(customer);
    const [CustomerID, setCustomerID] = useState(customerID);

    var addedItem = useSelector(state => state.auth.ProductItemList);
    var pendingProductItemList = useSelector(state => state.auth.PendingProductList);
    var user = useSelector(state => state.auth.user);
    
   
    const RemoveItem = (index) => {
        
        const updatedItems = addedItem.filter((_, i) => i !== index);
 
        dispatch(setProductItemList(updatedItems));
    };
    
    const CancelOrder = async () =>{
        dispatch(setProductItemList([]));
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'DashboardScreen' }
                 
              ],
            })
          )

      }

    const CreateOrder=async()=>
  {

    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    var prrcessObj ={

   OrderDate:date,
   UserID:user.id,
   CustomerID:CustomerID,
   ProductID:0,
   CustomerName:Customer,
   UnitID:0,
   Ordertems:addedItem,
   saleORderItemList:[],
   saleORderReturnItemList:[],


    }
    
    if(addedItem==undefined || addedItem == null || addedItem.length<=0)
        {
            Toast.show({
                type: "message",
                position: "top",
                props: {
                    title:'Warning',
                  body: "No more Item in List."
                }
              })  
  return false;
        }
       // var plist =[]
        // if(pendingProductItemList!= null && pendingProductItemList.length>0){
        //     plist=pendingProductItemList;
        // }
    
        ProcessOrder(prrcessObj)
  

//       NetInfo.addEventListener((state) => {


     
//       if(state.isConnected==true)
//         {
//             ProcessOrder(prrcessObj)
//        }
//     else{
//         dispatch(setProductItemList([]));
//         savePendingOrderList(prrcessObj)
//     }
//  })
}

 const ProcessOrder = async (prrcessObj) =>{

  //  savePendingOrderList(prrcessObj)
   // return false;
   const endPointProductDetail = Endpoints.endPointCreateSaleOrder ;
    const headers = {
        "Content-Type": "application/json",
      }
  
     dispatch(setisLoader(true))
      const response = await client.post(endPointProductDetail, prrcessObj, { headers });
      
      if (response.status === 200 || response.status === 202) 
        {
           
            dispatch(setisLoader(false))
            let data = response.data;
            if(data.isError==false)
            {
              dispatch(setProductItemList([]));
              Toast.show({type: "message",position: "top",props: {title:'Success',body: data.message }})
            }
            else{
                  savePendingOrderList(prrcessObj)
            }
      }
      else{
        dispatch(setisLoader(false))
        dispatch(setProductItemList([]));
        
          savePendingOrderList(prrcessObj)
          
      }
 }

    

    
    const savePendingOrderList =async(prrcessObj)=>{
       // alert(1)
 
        const data = await AsyncStorage.getItem('PendingProductList');
       // alert("Data from bbb Stt  == "+ data)
        if (data != null && data !='')  
            {
          const pdata = JSON.parse(data);
          pdata.push(prrcessObj)
          dispatch(setPendingOrderList(pdata))
    
          await AsyncStorage.setItem('PendingProductList', JSON.stringify(pdata));
       
        }
        else{
            var pedningList =[]
            pedningList.push(prrcessObj)
            
            dispatch(setPendingOrderList(pedningList))
            //alert("Data after bbb Stt  == "+ JSON.stringify(pedningList))
            await AsyncStorage.setItem('PendingProductList', JSON.stringify(pedningList));
           // alert('elsew')

        }
        Toast.show({
            type: "message",
            position: "top",
            props: {
                title:'Success',
              body: "The item has been added on Pending order list."
            }
          }) 

    }
    return (
        <>
            <CustomHeader title="Order List" navigation={navigation} isBack={true} />

              
            <ScrollView style={{ height: hp('100%')}}>   

                <View style={{flexDirection:'row' ,height: hp('5%'), justifyContent:'space-between', alignItems:'center'}}>

                <View style={{flexDirection:'row' ,height: hp('5%'),   alignItems:'center' , marginLeft:10}}>
                <Icon name="user" type="font-awesome" color="grey" />
               <Text allowFontScaling={false} style={{ fontSize: 20 ,marginLeft:5,fontWeight:'bold', color:'black'}}>{Customer}</Text>

                </View>
              
                <TouchableOpacity style={{flexDirection:'row' ,height: hp('5%'),   alignItems:'center', marginRight:10}} onPress={() => navigation.goBack()}>
                <Icon name="plus" type="font-awesome" color="grey" />
               <Text allowFontScaling={false} style={{ fontSize: 20 ,marginLeft:5,fontWeight:'bold', color:'black'}}>Add More Items</Text>

                </TouchableOpacity>
                </View>

                    
                <View style={[style.Pagecontainer,{height: hp('85%')}]}>

                    <View style={[style.containerWithCardRow]}>

                   

                        <FlatList
                            data={addedItem}
                            renderItem={({ item, index }) =>
                                <View>

                                    <Card containerStyle={[style.CardHeader_Button]}>

                                        <View style={style.ListItemRow_Space_between_secondary}>
                                            <Text style={style.ListRowText}>Product </Text>
                                            <Text style={style.ListRowText}>{item.ProductName}</Text>

                                        </View>
                                        <View style={style.ListItemRow_Space_between}>
                                            <Text style={style.ListRowText}>Qty</Text>
                                            <Text style={style.ListRowText}>{item.Qty}</Text>
                                        </View>
                                        <View style={style.ListItemRow_Space_between_secondary}>
                                            <Text style={style.ListRowText}>Bonus Qty</Text>
                                            <Text style={style.ListRowText}>{item.BonusQty}</Text>
                                        </View>



                                        <View style={[style.ListItemRow_Space_between_secondary]}>
                                            <Text style={style.ListRowText}> Item Price</Text>
                                            <Text style={style.ListRowText}>
                                                {item.TotalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                            </Text>
                                        </View>


                                    </Card>

                                    <TouchableOpacity activeOpacity={0.1} style={style.btnCardbuttom} onPress={() => RemoveItem(index)}    >



                                        <Image
                                            style={style.ImageIcon} resizeMode="contain"
                                            source={require('src/Images/Icon/delete-02.png')}
                                        />

                                    </TouchableOpacity>

                                </View>
                            }

                            keyExtractor={(item, index) => index.toString()}
                        />
 
<View style={{ marginRight: 20, marginLeft: 20  }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>

                                <PaperButton style={{ width: '48%', color: 'red', borderColor: ApplicationConstant.AppColor, borderWidth: 2 }}
                                    mode="outlined"
                                    textColor={ApplicationConstant.AppColor}
                                    
                                    onPress={()=> CancelOrder()}
                                >
                                    Cancel
                                </PaperButton>

                                <PaperButton style={{ width: '48%', borderColor: ApplicationConstant.AppColor, borderWidth: 2 }} mode="contained" 
                                buttonColor={ApplicationConstant.AppColor} onPress={()=> CreateOrder()}>
                                  Book Order  
                                </PaperButton>
                            </View>
                        </View>
                       
                    
                    </View>
                    
                </View>
             
            </ScrollView>
                
        </>
    )
}


