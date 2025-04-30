import React, { useState, useEffect } from 'react';
import { Text, Modal, View, Button, FlatList, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import CustomHeader from '../../Components/CustomHeader';
import { ListItem, Icon, Card, CheckBox, Button as ElementButton } from '@rneui/themed';
import { TextInput as LabelTextInput, Button as PaperButton } from 'react-native-paper';
import style from 'src/StyleSheets/MainStyles'
import { Endpoints } from 'src/API'
import client from 'src/APIService'
import { useSelector, useDispatch } from 'react-redux';
import { ProccessPendingOrderList } from './ProccessPendingOrderList';

import ApplicationConstant from 'src/Utles/ApplicationConstant'

import { setProductItemList, setisLoader, setPendingOrderList } from 'src/redux/Slices/MainSlice';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PendingOrder({ route, navigation }) {

    let dispatch = useDispatch()
    // const { customer ,customerID} = route.params;
    // const [Customer, setCustomer] = useState(customer);
    //const [CustomerID, setCustomerID] = useState(customerID);
    const [PendingList, setPendingList] = useState([]);

    var pendingProductList = useSelector(state => state.auth.PendingOrderList);
    useEffect(() => {
        // alert(pendingProductList)
        GerPendingOrderList()

    }, []);
    const GerPendingOrderList = async () => {
        setPendingList(pendingProductList)
        const data = await AsyncStorage.getItem('PendingProductList');
        // if (data != null) {
        //     const pdata = JSON.parse(data);
        //     setPendingList(pendingProductList)
        // }
    }
    const postOrder = async () => {

        const data = await AsyncStorage.getItem('PendingProductList');
        
        if (data != null) {
            const pdata = JSON.parse(data);
            console.log("Body ====== ====   " + JSON.stringify(pdata))
            dispatch(setisLoader(true))
            const endPointProductDetail = Endpoints.endPointNewSaleOrder;
            const headers = {
                "Content-Type": "application/json",
            }
            console.log("URL  ====== ====   " + endPointProductDetail)

            const response = await client.post(endPointProductDetail, pdata, { headers });
           // alert(JSON.stringify(response))
            if (response.status === 200 || response.status === 202) {
                dispatch(setisLoader(false))
                setPendingList([])
                dispatch(setPendingOrderList([]))
               
                await AsyncStorage.removeItem('PendingProductList');
            }
            else 
            {
                dispatch(setisLoader(false))
            }



        }



    }

    ///alert(JSON.stringify(user))
    const RemoveItem = (index) => {

        const updatedItems = pendingProductList.filter((_, i) => i !== index);
     

        //dispatch(setPendingOrderList(updatedItems));
        if(updatedItems=='' || updatedItems== null)
            {
                
                dispatch(setPendingOrderList([]))
                setPendingList([])
        }
        else{
        dispatch(setPendingOrderList(updatedItems));
        setPendingList(updatedItems)
    }
    };

    const CancelOrder = async () => {
        //  dispatch(setProductItemList([]));
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'DashboardScreen' }

                ],
            })
        )

    }


    return (
        <>
            <CustomHeader title="Pending Order List" navigation={navigation} isBack={true} />






            <View style={[style.Pagecontainer, { height: hp('85%') }]}>

                <View style={[style.containerWithCardRow]}>



                    <FlatList
                        data={PendingList}
                        renderItem={({ item, index }) =>
                            <View>

                                <Card containerStyle={[style.CardHeader_Button]}>

                                    <View style={style.ListItemRow_Space_between_secondary}>
                                        <Text style={style.ListRowText}>Customer </Text>
                                        <Text style={style.ListRowText}>{item.CustomerName}</Text>

                                    </View>

                                    <View style={style.ListItemRow_Space_between}>
                                        <Text style={style.ListRowText}>Order Date</Text>
                                        <Text style={style.ListRowText}>{item.OrderDate}</Text>
                                    </View>
                                    {/*
                                        <View style={style.ListItemRow_Space_between_secondary}>
                                            <Text style={style.ListRowText}>Bonus Qty</Text>
                                            <Text style={style.ListRowText}>{item.BonusQty}</Text>
                                        </View>


 
                                        <View style={[style.ListItemRow_Space_between_secondary]}>
                                            <Text style={style.ListRowText}> Item Price</Text>
                                            <Text style={style.ListRowText}>
                                                {item.TotalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                            </Text>
                                        </View>   */}


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

                    <View style={{ marginRight: 20, marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            {/* 
                                <PaperButton style={{ width: '48%', color: 'red', borderColor: ApplicationConstant.AppColor, borderWidth: 2 }}
                                    mode="outlined"
                                    textColor={ApplicationConstant.AppColor}
                                    
                                    onPress={()=> CancelOrder()}
                                >
                                    Cancel
                                </PaperButton> */}

                            <PaperButton style={{ width: '100%', borderColor: ApplicationConstant.AppColor, borderWidth: 2 }} mode="contained"
                                buttonColor={ApplicationConstant.AppColor} onPress={() => postOrder()}>
                                Book Order
                            </PaperButton>
                        </View>
                    </View>


                </View>

            </View>



        </>
    )
}


