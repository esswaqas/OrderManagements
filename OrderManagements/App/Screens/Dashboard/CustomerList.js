import {
    View, StyleSheet, TouchableOpacity, FlatList, Text,Alert,Image
} from 'react-native';

import React, { useState,useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
  
import client from '../../APIService'
import { ListItem,Icon } from '@rneui/themed';
import  AppConstant from 'src/Utles/ApplicationConstant'
import style from 'src/StyleSheets/MainStyles';
import CustomHeader from '../../Components/CustomHeader';
import {Card} from '@rneui/base'
import Loader from 'src/Components/Loader'
import { useNavigation ,useFocusEffect} from '@react-navigation/native'

const LoginScreen = (props) => {
  const [loading, setLoadingLocal] = useState(false)
  let dispatch = useDispatch()
  const navigation = useNavigation()

     
var list = useSelector(state => state.auth.CustomerList);
    
   // alert(JSON.stringify(list))
     
 const [CustomerList, setCustomerList] = useState([]);
      const Details =(id,name)=>{
        navigation.navigate('ReceivablePayment', {
          userID : id,
        name : name,
        });
      }
  useEffect(() => {


    setCustomerList(list);

  }, [list]);
 

const  rederItems = ({ item, index }) => {
    return (
      <TouchableOpacity  onPress={()=>  Details(item.customerID,item.name) }>
<ListItem bottomDivider>
<Icon name="first-order" type="font-awesome" color="grey" />
<ListItem.Content>
<ListItem.Title style={{fontSize:15}}>{item.name}</ListItem.Title>
<ListItem.Subtitle style={{fontSize:12,color:AppConstant.AppColor}}>
{item.address}
  
</ListItem.Subtitle>
{
  item.balance>0?
  <ListItem.Subtitle style={{fontSize:12,color:AppConstant.AppColor}}>
 
{ item.balance }  
</ListItem.Subtitle>
  : null
}

</ListItem.Content>
 
</ListItem> 
</TouchableOpacity>
    )}

return(
<>
<CustomHeader title="Customer List" navigation={navigation} isBack={true} />
    <View style={style.ListPagecontainer}>
              {/* <Loader loading={loading} /> */}

                  
                    <FlatList
                data={CustomerList} 
                renderItem={rederItems}
                //ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 60 }}
              />
                </View>
                </>
)



}

export default LoginScreen
