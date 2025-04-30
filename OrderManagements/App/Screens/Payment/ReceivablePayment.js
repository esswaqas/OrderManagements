import React, { useState, useEffect } from 'react';
import { Text, Modal, ScrollView, View, FlatList, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../Components/CustomHeader';
import CustomerList from '../../Components/CustomerList';
import { ListItem, Icon, Card } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import moment from 'moment'
import style from 'src/StyleSheets/MainStyles'
import { TextInput as LabelTextInput, Button as PaperButton } from 'react-native-paper';
import PaymentFormPopup from './PaymentForm'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen'
import Toast from 'react-native-toast-message'
import { Endpoints } from 'src/API'
import client from 'src/APIService'

import ApplicationConstant from 'src/Utles/ApplicationConstant'
// import Loader from 'src/Components/Loader'
import { setProductItemList, setisLoader, setCustomerList } from 'src/redux/Slices/MainSlice';
import { CommonActions } from '@react-navigation/native';
export default function ReceivablePayment({ route, navigation }) {
  
  
 
const [CustomerID, setCustomerID] = useState(null);
const [CustomerName, setCustomerName] = useState('');
  let dispatch = useDispatch()
  var cList = useSelector(state => state.auth.CustomerList);
  const [isConnected, setIsConnected] = useState(false);

  var user = useSelector(state => state.auth.user);

 
  const [isCustomerModalVisible, setisCustomerModalVisible] = useState(false);
  const [customerList, setcustomerList] = useState([]);
  const [CustomerLedgerList, setCustomerLedgerList] = useState([]);
  const [CustomerBalance, setCustomerBalance] = useState(0);
  const [isVisiblePaymentForModel, setisVisiblePaymentForModel] = useState(false);

  const toggleCustomerModal = () => {
    setisCustomerModalVisible(!isCustomerModalVisible);
    setCustomerName('')
    setCustomerID(null)
  };
  const togglePaymentFormModal = () => {
    if (!isConnected)
      {
     Toast.show({ type: "message", position: "top", props: { title: 'Error', body: "You are offline now, Please connect you internet connnection to proceed payment." } })
     return false;
   }
    setisVisiblePaymentForModel(!isVisiblePaymentForModel);


  };
 

  const rederLedger = ({ item, index }) => {
    return (
      <>
        <Card containerStyle={[style.CardHeader_Button]}>

          <View style={style.ListItemRow_Space_between}>
            <Text style={style.ListRowText}>Date </Text>
            <Text style={style.ListRowText}>{moment(item.createDateTime).format('DD-MM-YY')}</Text>


          </View>
          <View style={style.ListItemRow_Space_between_secondary}>
            <Text style={style.ListRowText}>Debit</Text>
            <Text style={style.ListRowText}>{item.debit}</Text>
          </View>
          <View style={style.ListItemRow_Space_between}>
            <Text style={style.ListRowText}>Credit</Text>
            <Text style={style.ListRowText}>{item.credit}</Text>
          </View>



          <View style={[style.ListItemRow_Space_between_secondary]}>
            <Text style={style.ListRowText}>Balance</Text>
            <Text style={style.ListRowText}>{item.balance}</Text>

          </View>
          <View style={style.ListItemRow}>
            <Text style={style.ListRowText}>Description</Text>
            <Text style={style.ListRowText}>{item.description}</Text>
          </View>


        </Card>
      </>





    )
  }


  useEffect(() => {
   
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      
      if(route.params!=undefined  )
        {
          const { userID,name } = route.params;
      if(state.isConnected){
      setCustomerName(name)
      setCustomerID(userID)
      GetLedger(userID);
    }
    else{
      setCustomerName('')
      setCustomerID(null)
      setCustomerLedgerList([])
   Toast.show({ type: "message", position: "top", props: { title: 'Error', body: "You are offline now, Please connect you internet connnection to proceed payment." } })
   return false;
    }
   
     
    }
    
   
    });
  
    return () => unsubscribe(); // cleanup on component unmount
  }, []);




  const GetLedger = async (id) => {

    const endPointGetCustomerLedger = Endpoints.endPointGetCustomerLedger + "?customerID=" + id + "&fromDate=&toDate=";
    const headers = {
      "Content-Type": "application/json",

    }
    console.log(endPointGetCustomerLedger)
    dispatch(setisLoader(true))
    const response = await client.get(endPointGetCustomerLedger, undefined, { headers });
    if (response.status === 200 || response.status === 202) {
      let data = response.data;


      dispatch(setisLoader(false))
      setCustomerLedgerList(data)

      if (data.length > 0) {

        var lastitem = data[0]
        setCustomerBalance(lastitem.balance)
      }else{
        setCustomerBalance(0)
      }


    }
    else {
      dispatch(setisLoader(false))

    }
  }

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
      if (!isConnected)
        {
          setCustomerName('')
          setCustomerID(null)
          setCustomerLedgerList([])
       Toast.show({ type: "message", position: "top", props: { title: 'Error', body: "You are offline now, Please connect you internet connnection to proceed payment." } })
       return false;
    
     }else{
      GetLedger(id)
     }

     
    }
  }

  const CancelPayment = async () => {
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
  const SubmitPaymentForm = async (PaymentMethod, AmountToPay, AccountNumber, BankName, Description, isHidePopup) => {

    if (isHidePopup) {

      setisVisiblePaymentForModel(false)
    }
    else {

      SubmitPayment(PaymentMethod, AmountToPay, AccountNumber, BankName, Description)

    }

  }

  const SubmitPayment = async (PaymentMethod, AmountToPay, AccountNumber, BankName, Description) => {

    if (!isConnected)
      {
     Toast.show({ type: "message", position: "top", props: { title: 'Error', body: "You are offline now, Please connect you internet connnection to proceed payment." } })
     return false;
   }
    var prrcessObj = {
      CustomerID: CustomerID,
      UserID: user.id,
      Amount: AmountToPay,
      Method: PaymentMethod,
      BankName: BankName,
      BankAccountNumber: AccountNumber,
      Description: Description,
      LedgerType: 'Customer'

    }

    const endPointCustomerPayment = Endpoints.endPointCustomerPayment;

    const headers = {
      "Content-Type": "application/json",
    }
    console.log('prrcessObj Log =======' + endPointCustomerPayment + ' ------------- ' + JSON.stringify(prrcessObj))
    dispatch(setisLoader(true))
    const response = await client.post(endPointCustomerPayment, prrcessObj, { headers });
    if (response.status === 200 || response.status === 202) {
      dispatch(setisLoader(false))
      setisVisiblePaymentForModel(false)
      let data = response.data;

      if (data.isError != true) {

        var cus = cList.find(i => i.customerID == CustomerID);

        var commentIndex = cList.findIndex(function (c) {
          return c.customerID == CustomerID;
        });
        const carray = [...cList];

        carray[commentIndex]['balance'] = (parseFloat(cus.balance).toFixed(2) - parseFloat(AmountToPay).toFixed(2))
        dispatch(setCustomerList(carray))
        await AsyncStorage.setItem('CustomerList', JSON.stringify(carray));


        Toast.show({ type: "message", position: "top", props: { title: 'Success', body: data.message } })
        setCustomerLedgerList([])
        setCustomerBalance(0)
        setCustomerName('')
        setCustomerID(null)
      }
      else {
        Toast.show({ type: "message", position: "top", props: { title: 'Error', body: data.message } })
      }
      setisVisiblePaymentForModel(false)

    }
    else {
      dispatch(setisLoader(false))
      Toast.show({ type: "message", position: "top", props: { title: 'Error', body: "There is an error in Request." } })
      setisVisiblePaymentForModel(false)
    }
  }
  return (
    <>


      <CustomHeader title="Payment" navigation={navigation} isBack={true} />

      <SafeAreaView>


        <Card containerStyle={[{
          padding: 4, borderTopWidth: 3, borderTopColor: ApplicationConstant.AppColor,
          marginBottom: 1,
          margin: 1,
          elevation: 5, marginTop: 3
        }]}>


          <TouchableOpacity onPress={toggleCustomerModal}>

            <ListItem bottomDivider>
              {
                (CustomerName == null || CustomerName == '') ?
                  <Icon name="plus" type="font-awesome" color="grey" /> : <Icon name="user" type="font-awesome" color="grey" />
              }

              <ListItem.Content>


                {(CustomerName == null || CustomerName == '') ?


                  <ListItem.Title style={{ fontSize: 15 }}>Choose Customer </ListItem.Title>

                  :


                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

                    <Text style={{ fontSize: 15, color:'black' }}>{CustomerName}</Text>
                    {
                       (CustomerBalance<0) ?
                    
                          <Text style={{ fontSize: 15, color:'black' }}>Balance: { -1*CustomerBalance}Cr</Text>
                          :
                          <Text style={{ fontSize: 15 , color:'black'}}>Balance: { (CustomerBalance)} Dr</Text>
                       
                    }
                   

                  </View>

                  // <ListItem.Title style={{ fontSize: 15 }}>{CustomerName}</ListItem.Title>
                }


              </ListItem.Content>

            </ListItem>
          </TouchableOpacity>

          <CustomerList ManageCustomerList={ManageCustomerList} visiblePopup={isCustomerModalVisible} />





        </Card>

        <View style={[style.Pagecontainer, { height: hp('80%') }]}>

          <View style={[style.containerWithCardRow]}>

            <FlatList
              data={CustomerLedgerList}
              keyExtractor={item => item.sr}
              renderItem={rederLedger}
            />
            <View style={{ marginRight: 20, marginLeft: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>

                <PaperButton style={{ width: '48%', color: 'red', borderColor: ApplicationConstant.AppColor, borderWidth: 2 }}
                  mode="outlined"
                  textColor={ApplicationConstant.AppColor}
                  CancelPayment
                  onPress={() => { CancelPayment() }}
                >
                  Cancel
                </PaperButton>


                <PaperButton style={{ width: '48%', borderColor: ApplicationConstant.AppColor, borderWidth: 2 }} mode="contained"
                  buttonColor={ApplicationConstant.AppColor} onPress={togglePaymentFormModal} >
                  Payment
                </PaperButton>

                <PaymentFormPopup SubmitPaymentForm={SubmitPaymentForm} visiblePopup={isVisiblePaymentForModel} />

              </View>
            </View>

          </View>
        </View>

      </SafeAreaView>


    </>
  )
}

// const tableStyle = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   cell: {
//     flex: 1,
//     padding: 10,
//     textAlign: 'center',
//   },
//   header: {
//     fontWeight: 'bold',

//     backgroundColor: 'black',
//   },
// });