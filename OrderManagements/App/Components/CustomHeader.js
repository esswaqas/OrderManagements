import React, { useState,useEffect } from 'react';
import { Text, View , StatusBar,StyleSheet,TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-native-paper';

import { ListItem,Icon } from '@rneui/themed';

// import Feather from 'react-native-vector-icons/Feather';
 
//import { Fea } from '@rneui/base';
 
 
import { ListAccordionGroupContext } from 'react-native-paper/lib/typescript/components/List/ListAccordionGroup';
import { setUser } from '../redux/Slices/MainSlice';


const CustomHeader = (props) => {
  let dispatch = useDispatch()
  var list = useSelector(state => state.auth.OrderList) //.filter(x => x.status == 'Order Placed');
  //list.filter(x => x.status == 'Order Placed')
  
  //const [Count, setCount] = useState(list != null?list.length:0);

  
  useEffect(() => {
    if(list!= null)
    {
      ///alert(JSON.stringify(list))
      //const newlist = list.filter(x => x.status === 'Order Placed');

    //setCount( newlist.length);
  }
     // ()}
   }, []);
  return (
    <View style={{ width: '100%', height: 50, flexDirection: 'row', backgroundColor: '#000' }}>
    <StatusBar backgroundColor={"black"}  />

    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
       {
       props.isBack===true?
    <Icon name="chevron-back-outline" type="ionicon" color="white"   onPress={() => props.navigation.goBack()}/>:null
    }

        <Text style={{ color: '#fff', marginLeft: 10, fontSize:20 }}>{props.title}</Text>
      </View>
     
      <TouchableOpacity    onPress={() => props.navigation.navigate("HomeScreen")}   style={{  justifyContent: 'center', alignItems: 'center' }}>
        

<View style={styles.tabContainer}>
    {
    
      ( list != null && list.length > 0) &&
      <View style={styles.tabBadge}>
 <Badge
  visible={true}
  size={20}
  style={{ top: 0, position: 'absolute' }}>
   {list.filter(x => x.status == 'Order Placed').length}
</Badge>

 

        {/* <Text style={styles.tabBadgeText}>
        {list.length}
        </Text> */}
      </View>

    }
   <Icon name='bell-alt' size={25} color='#fff' type="fontisto" />
  </View>
         
      </TouchableOpacity>
      <View
       style={{  justifyContent: 'center', alignItems: 'center', marginHorizontal:20 }}>
        <Icon name='power' size={25} color='#fff' type="fontisto"
        onPress={() =>  dispatch(setUser(null))} />
        
      </View>
     
    </View>
  )
}

export default CustomHeader;
const styles = StyleSheet.create({
  tabContainer: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  tabBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    
    
     
    
    zIndex: 2,
 
  },
  tabBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
});