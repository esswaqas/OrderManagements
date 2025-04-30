import {
    View, StyleSheet, TouchableOpacity, FlatList, Text,Alert,Image,SafeAreaView
} from 'react-native';

import React, { useState,useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import moment from 'moment'
 import { setisLoader} from 'src/redux/Slices/MainSlice';
import { ListItem,Icon,Card ,Button as ElementButton} from '@rneui/themed';
import  AppConstant from 'src/Utles/ApplicationConstant'
import style from 'src/StyleSheets/MainStyles';
import CustomHeader from '../../Components/CustomHeader';
import client from 'src/APIService'
import { Endpoints } from 'src/API'
import { useNavigation ,useFocusEffect} from '@react-navigation/native'
import DateRangeList from '../../Components/DateRabge'
const OrderList = (props) => {
  const [loading, setLoadingLocal] = useState(false)
  let dispatch = useDispatch()
  const navigation = useNavigation()

 var user = useSelector(state => state.auth.user);
     
 
 const [OrderList, setOrderList] = useState([]);
    
 
    const GetOrderList =  async (dateFrom , dateTO)=>{

    const endPointGetAreaList = Endpoints.endPointGetCustomerOrder + '?userID=' + user.id+'&fromDate='+dateFrom+'&toDate='+dateTO;
   // alert(endPointGetAreaList)
    const headers = {
      "Content-Type": "application/json",
    }
    dispatch(setisLoader(true))
    
    console.log('AREAADAEA URL  ---------  ' + endPointGetAreaList)
    const response = await client.get(endPointGetAreaList, undefined, { headers });
  console.log('AREAADAEA Detail---------  ' + JSON.stringify(response))
    if (response.status === 200 || response.status === 202) {
      dispatch(setisLoader(false))
let data = response.data
 setOrderList(data)
    }
    else{
      dispatch(setisLoader(false))
    }

  }
  // useEffect(() => {

  //   GetOrderList()

 

  // }, []);
 
  // "id": 10,
  //       "customerFirstName": "Muneeb",
  //       "customerLastName": null,
  //       "orderDate": "2024-09-21T00:00:00",
  //       "description": "4X (5)",
  //       "subTotal": 750.00,
  //       "cashAmount": null,
  //       "creditAmount": null,
  //       "userFirstName": "waqas",
  //       "userLastName": null

const  rederItems = ({ item, index }) => {
    return (
   

      <Card containerStyle={[style.CardHeader_Button]}>

          <View style={style.ListItemRow_Space_between_secondary}>

              <Text style={style.ListRowText}>ID </Text>
              <Text style={style.ListRowText}>{item.id}</Text>

          </View>

          <View style={style.ListItemRow_Space_between}>
              <Text style={style.ListRowText}>Customer Name</Text>
              <Text style={style.ListRowText}>{item.customerFirstName} {item.customerLastName}</Text>
          </View>

          <View style={style.ListItemRow_Space_between_secondary}>
              <Text style={style.ListRowText}>Order Date</Text>
          
              <Text  style={style.ListRowText}>{moment(item.orderDate).format('DD-MM-YY')}</Text>
          </View>



           

          <View style={style.ListItemRow_Space_between_secondary}>
              
              <Text style={style.ListRowText}>{item.description}</Text>
          </View>

          <View style={[style.ListItemRow_Space_between]}>
              <Text style={style.ListRowText}> Total </Text>
              <Text style={style.ListRowText}>
                  {item.subTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </Text>
          </View>

      </Card>

   

  
//       <TouchableOpacity  >
// <ListItem bottomDivider>
// <Icon name="first-order" type="font-awesome" color="grey" />
// <ListItem.Content>
// <ListItem.Title style={{fontSize:15}}>{item.name}</ListItem.Title>
// {/* <ListItem.Subtitle style={{fontSize:12,color:AppConstant.AppColor}}>
// {item.address}
// </ListItem.Subtitle> */}
// </ListItem.Content>
 
// </ListItem> 
// </TouchableOpacity>
    )}

    const SetDateRangeValues=(fromDate,toDate)=>{
      //alert(fromDate+', '+toDate)
      GetOrderList(fromDate,toDate)
    }
return(
<>

<CustomHeader title="Order List" navigation={navigation} isBack={true} />
<SafeAreaView>
    <View style={style.ListPagecontainer}>
           

   <DateRangeList  SetDateRangeValues={SetDateRangeValues}/>  


                    <FlatList
                data={OrderList} 
                renderItem={rederItems}
                //ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 60 }}
              />
                </View>
                
      </SafeAreaView>
                </>
)



}

export default OrderList
