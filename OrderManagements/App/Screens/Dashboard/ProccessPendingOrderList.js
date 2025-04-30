import React, { useState, useEffect } from 'react';
import { Text, Modal, View, Button, FlatList, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import CustomHeader from '../../Components/CustomHeader';
import { ListItem, Icon, Card, CheckBox, Button as ElementButton } from '@rneui/themed';
import { TextInput as LabelTextInput, Button as PaperButton } from 'react-native-paper';
import style from 'src/StyleSheets/MainStyles'

import client from 'src/APIService'
import { useSelector, useDispatch } from 'react-redux';
import { setProductItemList, setisLoader, setPendingOrderList } from 'src/redux/Slices/MainSlice';


 
import Toast from 'react-native-toast-message'
 
import NetInfo from '@react-native-community/netinfo';
import { Endpoints } from 'src/API'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProccessPendingOrderList = async (dispatch) => {
   
    const data = await AsyncStorage.getItem('PendingProductList');
   

        if (data != null) {
            const pdata = JSON.parse(data);
            PostData(pdata,dispatch)
        }
    
}
const PostData = async (pdata,dispatch) => {
  
    const endPointProductDetail = Endpoints.endPointNewSaleOrder;
   // console.log(pdata)
    const headers = {
        "Content-Type": "application/json",
    }
    const response = await client.post(endPointProductDetail, pdata, { headers });
    // alert(JSON.stringify(response))
    if (response.status === 200 || response.status === 202) {
        await AsyncStorage.removeItem('PendingProductList');
        dispatch(setPendingOrderList([]))

    }
}







