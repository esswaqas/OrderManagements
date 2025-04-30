import {
    View, StyleSheet, TouchableOpacity, FlatList, Text,Alert,Image
} from 'react-native';

import React, { useState,useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
  
 import { setisLoader} from 'src/redux/Slices/MainSlice';
import { ListItem,Icon } from '@rneui/themed';
import  AppConstant from 'src/Utles/ApplicationConstant'
import style from 'src/StyleSheets/MainStyles';
import CustomHeader from '../../Components/CustomHeader';
import client from 'src/APIService'
import { Endpoints } from 'src/API'
import { useNavigation ,useFocusEffect} from '@react-navigation/native'

const LoginScreen = (props) => {
  const [loading, setLoadingLocal] = useState(false)
  let dispatch = useDispatch()
  const navigation = useNavigation()

     
 
    
var user = useSelector(state => state.auth.user);
     
 const [AreaList, setAreaList] = useState([]);
    
 
  const GetAreaList =  async ()=>{
    const endPointGetAreaList = Endpoints.endPointGetAreaList + '?userID=' + user.id;


     
    const headers = {
      "Content-Type": "application/json",
    }
    dispatch(setisLoader(true))
    const response = await client.get(endPointGetAreaList, undefined, { headers });
  console.log('AREAADAEA Detail---------  ' + JSON.stringify(response))
    if (response.status === 200 || response.status === 202) {
      dispatch(setisLoader(false))
let data = response.data
//lert(JSON.stringify(data))
setAreaList(data)
    }
    else{
      dispatch(setisLoader(false))
    }

  }
  useEffect(() => {

    GetAreaList()

 

  }, []);
 

const  rederItems = ({ item, index }) => {
    return (
      <TouchableOpacity  >
<ListItem bottomDivider>
<Icon name="first-order" type="font-awesome" color="grey" />
<ListItem.Content>
<ListItem.Title style={{fontSize:15}}>{item.name}</ListItem.Title>
{/* <ListItem.Subtitle style={{fontSize:12,color:AppConstant.AppColor}}>
{item.address}
</ListItem.Subtitle> */}
</ListItem.Content>
 
</ListItem> 
</TouchableOpacity>
    )}

return(
<>
<CustomHeader title="Area List" navigation={navigation} isBack={true} />
    <View style={style.ListPagecontainer}>
              {/* <Loader loading={loading} /> */}

                  
                    <FlatList
                data={AreaList} 
                renderItem={rederItems}
                //ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
                keyExtractor={(item) => item.id}
              />
                </View>
                </>
)



}

export default LoginScreen
