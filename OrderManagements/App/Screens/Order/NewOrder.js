import React, { useState, useEffect } from 'react';
import { Text, Modal, View, Button, FlatList, TextInput, SafeAreaView, style, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../Components/CustomHeader';
import { ListItem, Icon, Card, Button as ElementButton, Avatar } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as LabelTextInput, Button as PaperButton } from 'react-native-paper';
import { ImagePath } from 'src/API'

import Toast from 'react-native-toast-message'
import { Endpoints } from 'src/API'


import client from 'src/APIService'
// import OrderDetail from './OrderDetail'
import ProductDetail from './ProductDetail'
import ApplicationConstant from 'src/Utles/ApplicationConstant'

import styles from 'src/StyleSheets/MainStyles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';


// import Loader from 'src/Components/Loader'


import { setProductItemList, setisLoader, setProductList as SliceSetProcductList } from 'src/redux/Slices/MainSlice';

export default function NewOrder({ navigation }) {

  let dispatch = useDispatch()
  var cList = useSelector(state => state.auth.CustomerList);
  var addedItem = useSelector(state => state.auth.ProductItemList);
  var sliceProductList = useSelector(state => state.auth.ProductList);


  const [CustomerID, setCustomerID] = useState(null);
  const [CustomerName, setCustomerName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [DiscountType, setDiscountType] = useState('F');
  const [searchProductText, setsearchProductText] = useState('');
  const [isCustomerModalVisible, setisCustomerModalVisible] = useState(false);
  const [productList, setproductList] = useState(sliceProductList);
  const [productID, setproductID] = useState();
  const [ProductName, setProductName] = useState('');
  const [filteredproductList, setfilteredproductList] = useState([]);
  const [ProductImage, setProductImage] = useState('');
  const [customerList, setcustomerList] = useState(cList);
  const [isVisibleForProductDetailmodel, setisVisibleForProductDetailmodel] = useState(false);
  const [RetialPrice, setRetialPrice] = useState();
  const [WholesalePrice, setWholesalePrice] = useState();
  const [UnitID, setUnitID] = useState();
  const [UnitValue, setUnitValue] = useState();
  const [AvailableQty, setAvailableQty] = useState(0);
  const [IsDetailRender, setIsDetailRender] = useState(false);
  const [checkRetail, setcheckRetail] = useState(false);
  const [checkWholesale, setcheckWholesale] = useState(true);
  const [unitPrice, setunitPrice] = useState('');
  const [Qty, setQty] = useState(0);
  const [Unit, setUnit] = useState('');
  const [SelectedQty, setSelectedQty] = useState('');
  const [BonusQty, setBonusQty] = useState(0);
  const [ItemDiscount, setItemDiscount] = useState(0);
  const [ItemTotalPrice, setItemTotalPrice] = useState(0);
  const toggleCustomerModal = () => {

    setisCustomerModalVisible(!isCustomerModalVisible);
    setCustomerName('')
    setCustomerID(null)
  };
  const toggleProductDetailModal = () => {


    setUnitID();
    setUnitValue();
    setAvailableQty(0);
    setproductID()
    setProductImage('')

    setProductName('')
    setunitPrice(0)
    setUnit()
    setQty(0)
    setBonusQty(0)
    setItemsDiscount('')
    setItemTotalPrice(0)

    setisVisibleForProductDetailmodel(!isVisibleForProductDetailmodel);

  };


  const handleCustomerSearch = (text) => {
    setSearchText(text);


    const filteredItems = cList.filter(item =>

      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setcustomerList(filteredItems);
  };
  const handleProductSearch = (text) => {
    setsearchProductText(text);

    const filteredItems = productList.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setfilteredproductList(filteredItems);
  };

  const SetCustomer = (id, name, balance) => {

    let bala = (parseFloat(balance).toFixed(2))

    //alert(bala)

    if ((parseFloat(balance).toFixed(2)) > 0) {

      Toast.show({
        type: "message",
        position: "top",
        props: {
          title: 'Warning',
          body: "The system cannot create a new order until the outstanding balance is " + bala + " cleared."
        }
      })
      setisCustomerModalVisible(!isCustomerModalVisible);
    }
    else {
      setCustomerName(name)
      setCustomerID(id)
      setisCustomerModalVisible(!isCustomerModalVisible);
    }


  }
  const rederCustomerItems = ({ item }) => (

    <TouchableOpacity style={styles.modallistItem} onPress={() => SetCustomer(item.customerID, item.name, item.balance)}>
      <Text style={styles.modalitemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {

    setcustomerList(cList)


  }, [cList]);

  const ProductDetails = async (id, name, unitValue, unitID, wholeSalePrice, price, unit, availableQty, Image) => {


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
    //alert(Image)
    navigation.navigate('ProductDetailScreen', {
      id :id,
      name :name,
      unitValue :unitValue,
      unitID :unitID,
      wholeSalePrice  :wholeSalePrice,
      price :price,
      unit :unit, 
      availableQty :availableQty,
      ProductImage:Image
    });



  }


  const rederProductItems = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => ProductDetails(item.id, item.name, item.unitValue, item.unitID, item.wholeSalePrice, item.price, item.unit, item.availableQty, item.productImage)}>
        <ListItem bottomDivider>
          {
            item.productImage != '' ?
              <Avatar
                rounded
                source={{ uri: ImagePath.ProductImageUrl + '' + item.productImage }}
              />
              : null
          }
          <ListItem.Content>
            <ListItem.Title style={styles.modalitemText}>{item.name}  </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    )
  }

  const GetProductList = async () => {

    const endPointProductList = Endpoints.endPointProductList;
    const headers = {
      "Content-Type": "application/json",

    }

    // if(productList!= null && productList.length>0)
    // {
    //   setfilteredproductList(productList)
    //   return false
    // }


    dispatch(setisLoader(true))
    const response = await client.get(endPointProductList, undefined, { headers });

    if (response.status === 200 || response.status === 202) {
      let data = response.data;
      await AsyncStorage.setItem('ProductList', JSON.stringify(data));
      dispatch(setisLoader(false))
      setproductList(data)
      setfilteredproductList(data)
      //dispatch(SliceSetProcductList(data))
    }
    else {
      dispatch(setisLoader(false))
    }
    

  }
  useEffect(() => {


    GetLocalProductList()

  }, []);
  const GetLocalProductList = async () => {

    const data = await AsyncStorage.getItem('ProductList');

    if (data != null) {


      const parseddata = JSON.parse(data);
      console.log("Product List and Qty = " + JSON.stringify(parseddata))

      //alert(parseddata)
      setproductList(parseddata)
      setfilteredproductList(parseddata)
    }
    else {
      GetProductList()
    }

  }
 

  function getBaseUnitValue(qty, unitValue, unitName) {
    let qtyItem = "";

    if (parseInt(qty) > 0 && parseInt(unitValue) <= parseInt(qty)) {

      //alert(qty +"--"+ unitValue +" =rs = " + Math.floor(qty / unitValue))
      if (Math.floor(qty / unitValue) === 0) {
        qtyItem = `${qty} (Piece)`;
      } else {
        if ((qty - (Math.floor(qty / unitValue) * unitValue)) > 0) {
          qtyItem = `${Math.floor(qty / unitValue)} (${unitName}) ${qty - (Math.floor(qty / unitValue) * unitValue)} (Piece)`;
        } else {
          qtyItem = `${Math.floor(qty / unitValue)} (${unitName})`;
        }
      }
      setSelectedQty(qtyItem);
    }
    else {
      qtyItem = qty + ' (Piece)'
      setSelectedQty(qtyItem);
    }

    //return qtyItem;
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
            height: hp('10%')
          }]}>


            <TouchableOpacity onPress={toggleCustomerModal}>

              <ListItem bottomDivider>
                {
                  (CustomerName == null || CustomerName == '') ?
                    <Icon name="plus" type="font-awesome" color="grey" /> : <Icon name="user" type="font-awesome" color="grey" />
                }

                <ListItem.Content>


                  {(CustomerName == null || CustomerName == '') ?

                    <ListItem.Title style={{ fontSize: 15 }}>Choose Customer</ListItem.Title>

                    :

                    <ListItem.Title style={{ fontSize: 15 }}>{CustomerName}</ListItem.Title>
                  }


                </ListItem.Content>

              </ListItem>
            </TouchableOpacity>




            <Modal
              animationType="slide"
              transparent={true}
              visible={isCustomerModalVisible}
              onRequestClose={toggleCustomerModal}
            >

              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <TextInput
                    style={styles.modalsearchInput}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={handleCustomerSearch}
                  />

                  {/* Display the filtered list */}
                  <FlatList
                    data={customerList}
                    keyExtractor={item => item.id}
                    renderItem={rederCustomerItems}
                  />

                  {/* Close button */}
                  <TouchableOpacity onPress={toggleCustomerModal} style={styles.modalcloseButton}>
                    <Text style={styles.modalcloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Modal>



          </Card>


          <View style={[{
            height: hp('82%')
          }]}>

            <TextInput
              style={styles.modalsearchInput}
              placeholder="Search..."
              value={searchProductText}
              onChangeText={handleProductSearch}
            />

            <FlatList
              data={filteredproductList}
              renderItem={rederProductItems}
              //ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
              keyExtractor={(item) => item.id}
            />



            {addedItem.length > 0 ?

              <View style={{ marginRight: 20, marginLeft: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>


                  <PaperButton style={{ width: '100%', borderColor: ApplicationConstant.AppColor, borderWidth: 2 }} mode="contained"
                    buttonColor={ApplicationConstant.AppColor} onPress={() => {
                      navigation.navigate('OrderListScreen', {
                        customer: CustomerName,
                        customerID: CustomerID
                      });
                    }
                    }>
                    Go to Cart
                  </PaperButton>
                </View>
              </View> : null
            }




          </View>
          <View>
            {/* {
              isVisibleForProductDetailmodel == true ?

                <ProductDetail isVisibleForProductDetailmodel={isVisibleForProductDetailmodel} toggleProductDetailModal={toggleProductDetailModal}



                  RetialPrice={RetialPrice}
                  WholesalePrice={WholesalePrice}
                  UnitID={UnitID}
                  UnitValue={UnitValue}
                  AvailableQty={AvailableQty}
                  checkRetail={checkRetail}
                  checkWholesale={checkWholesale}
                  unitPrice={unitPrice}
                  qty={Qty}
                  Unit={Unit}
                  ItemDiscount={ItemDiscount}
                  DiscountType={DiscountType}
                  SetDisCountTypeVal={SetDisCountTypeVal}
                  SelectedQty={SelectedQty}
                  BonusQty={BonusQty}
                  setUnitPrice={setUnitPrice}
                  ItemTotalPrice={ItemTotalPrice}
                  PriceType={PriceType}
                  Incrementdecrement={Incrementdecrement}
                  IncrementdecrementBonusQty={IncrementdecrementBonusQty}
                  setManualQty={setManualQty}
                  setItemsDiscount={setItemsDiscount}
                  BindProductItem={BindProductItem}
                  ImageUrl={ProductImage}

                />
                :
                null
            } */}
          </View>

        </View>
      </SafeAreaView>
    </>
  )
}

