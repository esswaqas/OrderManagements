  
 
import React, { useState, useEffect } from 'react';

import { Text, View,Image,Modal ,TouchableOpacity,StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp

} from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import {  setmessagetitle,setmessagebody,setmessagecancelbtn,setisvisibleMessage} from 'src/redux/Slices/MainSlice';

import ApplicationConstant from 'src/Utles/ApplicationConstant'
 
const MessageBox = (props) => {
 
 let dispatch = useDispatch()
  const [isShow, setisShow] = useState(false);
  useEffect(() => {
    setisShow(props.isvisibleMessage)
  }, [props.isvisibleMessage]);

  return (
  
       <Modal
       transparent={true}
       
       visible={isShow}
       animationType={'none'}
       onRequestClose={() => {console.log('close modal')}}>

<View style={styles.modalBackground}>

           <View
               style={{
                 paddingVertical: 10,
                 width: "90%",
                 backgroundColor: "white",
                 borderRadius: 5,
             
         
                 paddingLeft: 10,
                 
                 paddingRight: 5,
                 marginBottom: 5,
                 justifyContent:"center",
                 
                 borderLeftWidth:5,
                 borderLeftColor:ApplicationConstant.AppColor,
         
                 zIndex: 8888888,  
                 elevation: 8888888,  
                 position: "relative",
              
               }}
             >
            <Text
                 style={{
                   fontSize:16,
                   lineHeight: 18,
                    fontWeight:'bold',
                    color: props.title=='Error'? 'red':  props.title=='Warning'? '#FFA500': props.title=='Success'? 'green':'black',
                 }}
                 numberOfLines={2}
               >
                  Alert!
               </Text>
           <View style={{flexDirection:'row',flexWrap:'wrap',flex:1}}>
         
               <Text style={{fontSize:13,color:'black',flexWrap: 'wrap', marginTop:5}}>
                 {props.body}
               </Text>
               
           </View>
         
           
              <TouchableOpacity style={{
             
             marginTop:50,
            
             flexDirection: 'row',
             justifyContent: 'center',
             alignItems: 'center',
             alignSelf:'center',
             borderColor:ApplicationConstant.AppColor,
             backgroundColor: "white",
             borderWidth:1,
             borderRadius: 15,
            
             width: '22%',
              }}  onPress={()=> dispatch(setisvisibleMessage(false))}>
         
             <Text style={{textAlign:'center',fontWeight:'bold' ,  color:ApplicationConstant.AppColor}}>
               close
               </Text>
         
              </TouchableOpacity>  
         
             </View>
        </View>
           {/* <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
         
               

<ActivityIndicator size="small" color="#00ff00" />

           </View> */}
           </Modal>
  )
}

 

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default MessageBox