 

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StyleSheet,Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
 
    const styles = StyleSheet.create({
      
        Pagecontainer: {
    
             backgroundColor: 'white',
             height: '100%',
             display:'flex',
             justifyContent: 'center',
             alignItems:'center',
             
        },

        container: {
             backgroundColor: 'white',
            width:'96%'
        },
        inputContainer: {
          marginBottom: 10
        },
        inputInnerContainer: {
          borderColor: '#e9e9e9',
          borderRadius: 5,
          borderWidth: 1,
          flexDirection: 'row',
          backgroundColor:'#ffffff'
        },
        inputs: {
          borderBottomColor: '#ffffff',
          margin:0  ,
          padding: hp('1.5%'),
          width:'100%', fontSize: RFValue(13)
        
          
        
        },
        Logininputs: {
          borderBottomColor: '#ffffff',
          color:"black",
          margin:0  ,
        //  padding: Platform.OS=='ios'? 10:8,
        padding: Platform.isPad? hp('1.5%'): hp('1.2%'),
          width:'100%',
        },
        inputIcon: {
          width: '100%',
          height: 30,
          marginLeft: 15,
          justifyContent: 'center'
        },
        LoginbuttonContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          borderRadius: 5,
          backgroundColor: "#EEBC6A",
          marginTop: 10,
         // padding: Platform.OS=='ios'? 10:8,
          padding: Platform.isPad? hp('1.5%'): hp('1.2%'),
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
           borderRadius: 5,
          backgroundColor: "#EEBC6A",
          //padding:12
          padding:hp('1.6%')// 12
        },
        buttonTextColor: {
          color:'white'
        },
        buttonFontSize: {
         fontSize:RFValue(12)
        },
        
        ErrorMessage: {
          color: 'red'
        },



        textFontFamily:{
          ...Platform.select({
            ios: {
               
            },
            android: {
              fontFamily:  'OpenSans-Regular',
            }
            // default: {
            //   // other platforms, web for example
            //   fontFamily:  'OpenSans-Regular',
            // }
          })
        },
        textStyle:{
          textAlign:'center' , fontSize:RFValue(10)
          //,textDecorationLine:'underline',
        },
    textColor:{
          color: "#88aa31", 
        },
        textColor_white:{
          color: "white", 
        }
,
        CardList:{

          padding: 0, borderTopWidth: 3, borderTopColor: "#213749", margin: 1 
        },
        CardListText:{
          fontSize: RFValue(12)
        },
        blackContainer:{
          backgroundColor: '#02000C',
          width:'100%'
        },
        loginForm:{
          backgroundColor:'#ffffff',
          textAlign:'center',
          marginTop:RFValue('-150'),
          borderRadius: 20,
          width:wp('80%'),
          justifyContent:'center',
          alignItems:'center',
          paddingVertical:30,
          shadowColor: "black",
          shadowOpacity: 1,
          shadowOffset: {
            height: 10,
            width: 10
          },
          shadowRadius: 50.00,
          
          elevation: 20,
        },
        fixedIcon:{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: hp('35%'),
          width: wp('100%'),
          zIndex:-10,
          textAlign:'left',
          flex:1,
          flexDirection:'column'
        },
        fixedImg:{
          left: 0,
        }
        
        
});

export default styles