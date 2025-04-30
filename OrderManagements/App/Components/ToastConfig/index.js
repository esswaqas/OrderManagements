import { View, Text, Image ,TouchableOpacity} from "react-native";
import React from "react";
import Toast from 'react-native-toast-message';

import ApplicationConstant from 'src/Utles/ApplicationConstant'


const toastConfig = {


  message: ({ props }) => (

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
    
    marginTop:7,
   
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderColor:ApplicationConstant.AppColor,
    backgroundColor: "white",
    borderWidth:1,
    borderRadius: 15,
   
    width: '22%',
     }}  onPress={()=> Toast.hide()}>

    <Text style={{textAlign:'center',fontWeight:'bold' ,  color:ApplicationConstant.AppColor}}>
      close
      </Text>

     </TouchableOpacity>  

    </View>
  ),
};
export { toastConfig };









