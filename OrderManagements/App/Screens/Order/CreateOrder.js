import React, { useState, useEffect } from 'react';
import { Text, Modal, View, Button, FlatList, TextInput, SafeAreaView, style, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../Components/CustomHeader';
import { ListItem, Icon, Card, Button as ElementButton, Avatar } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as LabelTextInput, Button as PaperButton } from 'react-native-paper';
import { ImagePath } from 'src/API'

import DropdownList from '../../Components/DropdownList';

import Toast from 'react-native-toast-message'
import { Endpoints } from 'src/API'
import CustomerList from '../../Components/CustomerList';
import ProductList from '../../Components/ProductList';

import client from 'src/APIService'
import OrderDetail from './OrderDetail'
//import ProductDetail from './ProductDetail'
//import ProductDetail from './ProductDetail'
import ApplicationConstant from 'src/Utles/ApplicationConstant'
 
import styles from 'src/StyleSheets/MainStyles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';


// import Loader from 'src/Components/Loader'


import { setProductItemList, setisLoader, setProductList as SliceSetProcductList ,setPendingOrderList} from 'src/redux/Slices/MainSlice';

export default function NewOrder({ navigation }) {

  let dispatch = useDispatch()

  var cList = useSelector(state => state.auth.CustomerList);
  var addedItem = useSelector(state => state.auth.ProductItemList);
  var sliceProductList = useSelector(state => state.auth.ProductList);
  
var user = useSelector(state => state.auth.user);
  const [CustomerID, setCustomerID] = useState(null);
  const [CustomerName, setCustomerName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchProductText, setsearchProductText] = useState('');
  const [isCustomerModalVisible, setisCustomerModalVisible] = useState(false);
  const [isProductListModalVisible, setisProductListModalVisible] = useState(false);
  const [isProductDetailModalVisible, setisProductDetailModalVisible] = useState(false);
  const [productList, setproductList] = useState(sliceProductList);
  const [filteredproductList, setfilteredproductList] = useState([]);
  const [ProductDetailItems, setProductDetailItems] = useState([]);
  const [customerList, setcustomerList] = useState(cList);
  const [DiscountType, setDiscountType] = useState('F');
  const [ItemDiscount, setItemDiscount] = useState(0);
  const [TotalPriceItems, setTotalPriceItems] = useState(0);
  const [TotalAmountAfterDiscount, setTotalAmountAfterDiscount] = useState(0);
  useEffect(() => { setcustomerList(cList) }, [cList]);

  const toggleCustomerModal = () => {

    if (addedItem.length > 0) {
      Toast.show({
        type: "message",
        position: "top",
        props: {
          title: 'Warning',
          body: "Please cancel order  or delete all items from list to change customer"
        }
      })
      return false;
    }
    setisCustomerModalVisible(!isCustomerModalVisible);
    setCustomerName('')
    setCustomerID(null)
  };
  const toggleProductListModal = () => {

    if (CustomerID == null || CustomerID == '') {

      Toast.show({
        type: "message",
        position: "top",
        props: {
          title: 'Warning',
          body: "Please choose customer first."
        }
      })

      return false;
    }

    setisProductListModalVisible(!isProductListModalVisible);

  };

  const ManageCustomerList = async (id, name, action) => {


    if (action == 'close') {

      setisCustomerModalVisible(false);
      setCustomerName('')
      setCustomerID(null)
      setCustomerLedgerList([])
    }
    else {
      setisCustomerModalVisible(false);
      setCustomerName(name)
      setCustomerID(id)


    }
  }
  SetDisCountTypeVal = async (val) => {
    setDiscountType(val)
    let discount = ItemDiscount

    DiscountToAmount(discount, TotalPriceItems)
  }

  const setItemsDiscount = async (val) => {
     
    if (val > 0) {
      setItemDiscount(val)
    }
    else {
      setItemDiscount(0)
    }
    DiscountToAmount(val, TotalPriceItems)
  }

  const DiscountToAmount = async (discount, totalAmount) => {

    let totPrice = 0
    if (discount > 0) {
      if (DiscountType == "F") {
        totPrice = ((totalAmount)) - (discount ?? 0);
    //    alert(DiscountType+'  inner -   '+discount+" -- " +totalAmount +'   totPrice'+  totPrice)
      }
      else {

        totPrice = (totalAmount - (totalAmount * ((discount ?? 0) / 100)));
      }
      setTotalPriceItems(totalAmount);
      setTotalAmountAfterDiscount(totPrice);
    }
    else {
      setTotalPriceItems(totalAmount);
      setTotalAmountAfterDiscount(totalAmount);
    }

  }

  const ProductDetails = async (id, name, unitValue, unitID, wholeSalePrice, price, unit, availableQty, Image, action) => {



    if (action == 'close') {
      setisProductListModalVisible(!isProductListModalVisible);
      return false;
    }

    // if (CustomerID == null || CustomerID == '') {

    //   Toast.show({
    //     type: "message",
    //     position: "top",
    //     props: {
    //       title: 'Warning',
    //       body: "Please choose customer first."
    //     }
    //   })

    //   return false;
    // }

    if (availableQty == null || availableQty == '' || availableQty == 0) {

      Toast.show({
        type: "message",
        position: "top",
        props: {

          title: 'Warning',
          body: "There is no more stock available that product."
        }
      })

      return false;
    }
    let items = [];

    setisProductListModalVisible(!isProductListModalVisible);
    items.push({ id: id, name: name, unitValue: unitValue, unitID: unitID, wholeSalePrice: wholeSalePrice, price: price, unit: unit, availableQty: availableQty, Image: Image });

    setProductDetailItems(items)
    setisProductDetailModalVisible(!isProductDetailModalVisible);

    //  items.push(id);
    //  items.push(id);
    //  items.push(id);
    // navigation.navigate('ProductDetailScreen', {
    //   id :id,
    //   name :name,
    //   unitValue :unitValue,
    //   unitID :unitID,
    //   wholeSalePrice  :wholeSalePrice,
    //   price :price,
    //   unit :unit, 
    //   availableQty :availableQty,
    //   ProductImage:Image
    // });
  }

  const AddtoCartItem = async (productID, UnitID, UnitValue, CartonQty, Qty, CartonBonusQty, BonusQty, unitPrice,ItemTotalPrice, PriceTypeVal, ProductName, action) => {

    if (action == 'close') {
      setisProductDetailModalVisible(!isProductDetailModalVisible);
      return false;
    }
    var itemobject = new Object();

    if ((CartonQty * UnitValue) + Qty <= 0) {

      Toast.show({
        type: "message",
        position: "top",
        props: {
          title: 'Warning',
          body: "Qty Should be greater to 0"
        }
      })
      return false;
    }

    //  alert('save')
    var pitemList = [];

    itemobject =
    {
      ProductID: productID,
      UnitID: UnitID,
      UnitValue: UnitValue,
      CartonQty:CartonQty,
      Qty:  Qty,
      CartonBonusQty:CartonBonusQty,
      BonusQty:BonusQty,// ((CartonBonusQty * UnitValue) + BonusQty),
      Price: unitPrice,
      TotalPrice: ItemTotalPrice,
      Discount: 0,//(ItemDiscount != '' ? ItemDiscount : 0),
      DiscountAmount: 0,//(ItemDiscount != '' ? ItemDiscount : 0),
      DiscountType: '',//DiscountType,
      PriceType: PriceTypeVal,
      ProductName: ProductName,
      SKU: "0"

    }





    // Check if addedItem exists and has elements
    if (addedItem != null && addedItem.length > 0) {
      // Create a new array by spreading the existing items and adding the new itemobject
      pitemList = [...addedItem, itemobject];
      ///alert("After adding the new item: " + JSON.stringify(pitemList));
    } else {
      // If addedItem is empty or null, just add the new itemobject
      pitemList.push(itemobject);
    }

    dispatch(setProductItemList(pitemList));
    setisProductDetailModalVisible(!isProductDetailModalVisible);
    var sumofItemsPrice = pitemList.reduce((acc, item) => acc + item.TotalPrice, 0)
    //alert(sumofItemsPrice)
    setTotalPriceItems(sumofItemsPrice)
    DiscountToAmount(ItemDiscount, sumofItemsPrice)

    //alert("added item nin ==== "+JSON.stringify(addedItem))


    //navigation.GetProductList()
    // Toast.show({
    //   type: "message",
    //   position: "top",
    //   props: {
    //     title: 'Success',
    //     body: "Item has been added successfully "
    //   }
    // })
    // navigation.goBack()
    // navigation.navigate('OrderListScreen', {
    //   customer: CustomerName,
    //   customerID: CustomerID
    // });

  }



  const RemoveItem = (index) => {

    const updatedItems = addedItem.filter((_, i) => i !== index);

    dispatch(setProductItemList(updatedItems));

    var sumofItemsPrice = updatedItems.reduce((acc, item) => acc + item.TotalPrice, 0)

    setTotalPriceItems(sumofItemsPrice)
    DiscountToAmount(ItemDiscount, sumofItemsPrice)
  };

  const CreateOrder = async () => {
    if (addedItem == undefined || addedItem == null || addedItem.length <= 0) {
      Toast.show({
        type: "message",
        position: "top",
        props: {
          title: 'Warning',
          body: "Please select Product first."
        }
      })
      return false;
    }
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    var prrcessObj = {

      OrderDate: date,
      UserID: user.id,
      CustomerID: CustomerID,
      ProductID: 0,
      CustomerName: CustomerName,
      UnitID: 0,
      Discount:ItemDiscount,
      DiscountType:DiscountType,
      Ordertems: addedItem,
      saleORderItemList: [],
      saleORderReturnItemList: [],  
       SubTotal  : TotalAmountAfterDiscount,
       TotalItemsPrice  :TotalPriceItems
    }
  //  alert(2)
    
    ProcessOrder(prrcessObj)


  }
 const ProcessOrder = async (prrcessObj) =>{
 
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
               setItemsDiscount(0);
               setTotalAmountAfterDiscount(0);
               setTotalPriceItems(0);

              Toast.show({type: "message",position: "top",props: {title:'Success',body: data.message }})
            }
            else{
                  savePendingOrderList(prrcessObj)
            }
      }
      else
      {
        dispatch(setisLoader(false))
        setItemsDiscount(0);
        setTotalAmountAfterDiscount(0);
        setTotalPriceItems(0);

        dispatch(setProductItemList([]));
        
          savePendingOrderList(prrcessObj)
          
      }
 }

 const savePendingOrderList =async(prrcessObj)=>{
   

   const data = await AsyncStorage.getItem('PendingProductList');
 //   alert("Data from bbb Stt  == "+ data)
   if (data != null && data !='')  
       {
     const pdata = JSON.parse(data);
     pdata.push(prrcessObj)
     dispatch(setPendingOrderList(pdata))
     setItemsDiscount(0);
     setTotalAmountAfterDiscount(0);
     setTotalPriceItems(0);

     await AsyncStorage.setItem('PendingProductList', JSON.stringify(pdata));
  
   }
   else{
       var pedningList =[]
       pedningList.push(prrcessObj)
       
       dispatch(setPendingOrderList(pedningList))
       setItemsDiscount(0);
       setTotalAmountAfterDiscount(0);
       setTotalPriceItems(0);

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
      <CustomHeader title="New Order" navigation={navigation} isBack={true} />
      <SafeAreaView   >
        <View style={[styles.Pagecontainer, { height: hp('100%'), backgroundColor: 'white' }]}>

          <Card containerStyle={[{
            padding: 4, borderTopWidth: 3, borderTopColor: ApplicationConstant.AppColor,
            marginBottom: 1,
            margin: 1,
            elevation: 5, marginTop: 3,
            height: hp('11%')
          }]}>


            <TouchableOpacity onPress={toggleCustomerModal}>

              <ListItem bottomDivider
                containerStyle={{
                  padding: 2, // Removes inner padding
                  margin: 2,  // Removes any default margin

                }}
              >
                {
                  (CustomerName == null || CustomerName == '') ?
                    <Icon name="plus" type="font-awesome" color="grey" /> : <Icon name="user" type="font-awesome" color="grey" />
                }

                <ListItem.Content>


                  {(CustomerName == null || CustomerName == '') ?

                    <ListItem.Title style={{ fontSize: 13, fontWeight: 'bold' }}>Choose Customer</ListItem.Title>

                    :

                    <ListItem.Title style={{ fontSize: 13, fontWeight: 'bold' }}>{CustomerName}</ListItem.Title>
                  }


                </ListItem.Content>

              </ListItem>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleProductListModal}>

              <ListItem bottomDivider
                containerStyle={{
                  padding: 2, // Removes inner padding
                  margin: 2,  // Removes any default margin
                }}
              >
                {
                  (CustomerName == null || CustomerName == '') ?
                    <Icon name="plus" type="font-awesome" color="grey" /> : <Icon name="user" type="font-awesome" color="grey" />
                }

                <ListItem.Content>


                  <ListItem.Title style={{ fontSize: 13, fontWeight: 'bold' }}>Choose Product</ListItem.Title>
                </ListItem.Content>

              </ListItem>
            </TouchableOpacity>

            <CustomerList ManageCustomerList={ManageCustomerList} visiblePopup={isCustomerModalVisible} />
            <ProductList ProductDetails={ProductDetails} visibleProductPopup={isProductListModalVisible} />
            <OrderDetail Items={ProductDetailItems} AddtoCartItem={AddtoCartItem} visibleProductDetailPopup={isProductDetailModalVisible} />
          </Card>

          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={55}
          >
            <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true}   >
              <View style={[{
                height: hp('55%'), width: '100%'
              }]}>

                <View>
                  <FlatList
                    data={addedItem}
                    renderItem={({ item, index }) =>
                      <View>

                        <Card containerStyle={[styles.CardHeader_Button]}>

                          <View style={[styles.ListItemRow_Space_between, { backgroundColor: ApplicationConstant.AppColor, color: '#fffff' }]}>
                            <View style={{ flexDirection: 'row' }}>

                              <Text style={[styles.ListRowText, { color: 'white', fontWeight: 'bold' }]}> {item.TotalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <Icon name='trash' size={25} color='#fff' type="ionicon" onPress={() => RemoveItem(index)} />
                            </View>
                          </View>
                          <View style={styles.ListItemRow_Space_between_secondary}>
                            <Text style={styles.ListRowText}>Product </Text>
                            <Text style={styles.ListRowText}>{item.ProductName}</Text>
                          </View>
 

                          <View style={styles.ListItemRow_Space_between_secondary}>
                            <Text style={styles.ListRowText}>Carton Qty</Text>
                            <Text style={styles.ListRowText}>{item.CartonQty}</Text>
                            <Text style={styles.ListRowText}> Qty</Text>
                            <Text style={styles.ListRowText}>{item.Qty}</Text>
                          </View>

                          <View style={styles.ListItemRow_Space_between_secondary}>
                            <Text style={styles.ListRowText}>Bonus Carton </Text>
                            <Text style={styles.ListRowText}>{item.CartonBonusQty}</Text>
                            <Text style={styles.ListRowText}>Bonus Qty</Text>
                            <Text style={styles.ListRowText}>{item.BonusQty}</Text>
                          </View>
                        </Card>


                      </View>
                    }

                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>

              <View style={[{
                height: hp('25%'),
               
              }]}>

                <View style={[styles.ListItemRow_Space_between_secondary, { padding: 3 }]}>
                  <Text style={[styles.ListRowText, { fontWeight: 'bold' }]}>Total Price </Text>
                  <Text style={[styles.ListRowText, { fontWeight: 'bold' }]}>{TotalPriceItems.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </View>


                <View style={{ flexDirection: 'row', paddingBottom: 2, justifyContent: 'center', alignItems: 'center' }}>

                  <View style={{ width: '48%', marginTop: 5 }}>
                    <DropdownList
                      OptionList={[

                        { label: 'Fixed', value: 'F' },
                        { label: 'Percentage', value: 'P' },
                      ]}
                      PlaceHolderText={"Discount Type"}
                      selectedValue={DiscountType}
                      setValue={SetDisCountTypeVal}
                      label={""}
                      height={50}
                    />
                  </View>
                  <View style={{ width: '48%' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>

                      <LabelTextInput
                        mode="outlined"
                        label="Discount"
                        placeholder=""
                        style={{ width: '100%', textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}
                        value={ItemDiscount}
                        textStyle={{ color: 'red' }}
                        keyboardType='number-pad'
                        onChangeText={(val) => setItemsDiscount(val)}

                        right={<TextInput.Affix />}
                      />

                    </View>
                  </View>

                </View>

                <View style={[styles.ListItemRow_Space_between_secondary, { padding: 5 }]}>
                  <Text style={[styles.ListRowText, { fontWeight: 'bold' }]}>After Discount Total Price  </Text>
                  <Text style={[styles.ListRowText, { fontWeight: 'bold' }]}>{TotalAmountAfterDiscount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '100%' }}>
                
                            <PaperButton style={{ width: '45%',   borderColor: ApplicationConstant.AppColor, borderWidth: 2 }}
                              mode="outlined"
                              textColor={ApplicationConstant.AppColor}
                              onPress={() => {
                                navigation.navigate('DashboardScreen');
                              }
                              }
                            >
                              Close
                            </PaperButton>
                
                            <PaperButton style={{ width: '48%',margin:0,padding:0, borderColor: ApplicationConstant.AppColor, borderWidth: 2 }} mode="contained" buttonColor={ApplicationConstant.AppColor}
                contentStyle={{margin:0,padding:0}}
                  
                              onPress={CreateOrder}>
                             Book
                            </PaperButton>
                          </View>
                   

                 
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

