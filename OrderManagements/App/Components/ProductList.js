import React, { Component,useEffect ,useState} from 'react';
 
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import { ImagePath } from 'src/API'
import client from 'src/APIService'
import { ListItem, Icon, Card, Button as ElementButton, Avatar } from '@rneui/themed';

import { Text, Modal, View, Button, FlatList, TextInput, SafeAreaView, style, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from 'src/StyleSheets/MainStyles'
import { useSelector, useDispatch } from 'react-redux';
import { setProductItemList, setisLoader } from 'src/redux/Slices/MainSlice';
import { Endpoints } from 'src/API'
 export default ProductList=(props)=>
 {
   
  const [text, setText] = React.useState('');
  let dispatch = useDispatch()
   var sliceProductList = useSelector(state => state.auth.ProductList);
  const [productList, setproductList] = useState(sliceProductList);
  const [searchText, setSearchText] = useState('');
   const [filteredproductList, setfilteredproductList] = useState([]);
 
  useEffect(() => {
  
    if(props.visibleProductPopup==true)
    {GetLocalProductList()}
   

  }, [props.visibleProductPopup]);

  const GetLocalProductList = async () => {

    const data = await AsyncStorage.getItem('ProductList');

    if (data != null)
       {


      const parseddata = JSON.parse(data);
      console.log("Product List and Qty = " + JSON.stringify(parseddata))

      //alert(parseddata)
      setproductList(parseddata)
      setfilteredproductList(parseddata)
    }
    else 
    {
      GetProductList()
    }

  }
  const GetProductList = async () => {

    const endPointProductList = Endpoints.endPointProductList;
    const headers = {
      "Content-Type": "application/json",

    }
  console.log("Product   url  -- "+endPointProductList)
    dispatch(setisLoader(true))
    const response = await client.get(endPointProductList, undefined, { headers });

    if (response.status === 200 || response.status === 202) {
      let data = response.data;
      dispatch(setisLoader(false))
      await AsyncStorage.setItem('ProductList', JSON.stringify(data));
      setproductList(data)
      setfilteredproductList(data)
       
    }
    else {
      dispatch(setisLoader(false))
    }
    

  }
 
  const ProductDetails = async (id, name, unitValue, unitID, wholeSalePrice, price, unit, availableQty, Image) => {

    props.ProductDetails( id, name, unitValue, unitID, wholeSalePrice, price, unit, availableQty, Image , '')
  }

   const ClosePopup = () => {
    
    
    props.ProductDetails( 'id', 'name', 'unitValue', 'unitID', 'wholeSalePrice', 'price', 'unit', 'availableQty', 'Image' , 'close')
    

   };
   const handleProductSearch = (text) => {
    setsearchProductText(text);

    const filteredItems = productList.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setfilteredproductList(filteredItems);
  };

  
 
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
  return(
    <View >
      
      <Modal
            animationType="slide"
            transparent={true}
            visible={props.visibleProductPopup}
           onRequestClose={ClosePopup}
          >

            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.modalsearchInput}
                  placeholder="Search..."
                  value={searchText}
                  onChangeText={handleProductSearch}
                />

                {/* Display the filtered list */}
                <FlatList
               data={filteredproductList}
               renderItem={rederProductItems}
               keyExtractor={(item) => item.id}
                   
                />

                {/* Close button */}
                <TouchableOpacity onPress={ClosePopup} style={styles.modalcloseButton}>
                  <Text style={styles.modalcloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>

            </View>
          </Modal>
   
   
</View>

  )
 }



 'react-native-modals';
 