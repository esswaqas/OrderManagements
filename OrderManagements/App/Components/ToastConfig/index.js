import { View, Text, Image ,TouchableOpacity} from "react-native";
import React from "react";




const toastConfig = {


  message: ({ props }) => (
    <View
      style={{
        height: 130,
        width: "70%",
        backgroundColor: "white",
        borderRadius: 10,


        paddingLeft: 10,
        marginBottom: 5,
        justifyContent:"center"
      }}
    >

      <Text
        style={{
          fontSize:12,
          lineHeight: 18,
          color:"red",
        }}
        numberOfLines={2}
      >
        {props.body}
      </Text>

{/* 
     <TouchableOpacity style={{height: 45,
    marginTop:5,
    borderRadius:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#88aa31",
    width: '100%',
     elevation: 2,}}  onPress={()=>ff()}>
    <Text>OK</Text>
     </TouchableOpacity> */}
    </View>
  ),
};
export { toastConfig };









