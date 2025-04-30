import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import ApplicationConstant  from 'src/Utles/ApplicationConstant'
const styles = StyleSheet.create({

  ListPagecontainer: {

    backgroundColor: '#f6f3f3',
    //backgroundColor: 'red',
    height: '100%',
    display: 'flex',



  },
 
  CardHeader_Button: {
    padding: 0, borderTopWidth: 3, borderTopColor: ApplicationConstant.AppColor
    , margin:5 ,
    elevation: 8, position:'relative',   marginBottom:hp('2%')
  },
  ImageIcon:{
    height:hp('3.9%'),
    width:hp('3.9%'),
  },
  ListItemRow_Space_between_secondary: {
    backgroundColor: '#f6f3f3',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    
  },
  ListItemRow_secondary_secondary: {
    backgroundColor: '#f6f3f3',
    flexDirection: 'row', alignItems: 'center'
  },
  ListItemRow_Space_between: {
    backgroundColor: 'white',
    flexDirection: 'row', justifyContent: 'space-between'
    , alignItems: 'center'

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    
    backgroundColor: "#88aa31",
 
    padding:hp('2%')// 12
  },
  ListItemRow: {
    backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'
  },
 
  containerWithCardRow: {
    backgroundColor: 'white',
    width: '100%',
    height:'98%',
    marginTop: 5,

  },
  btnCardbuttom:{
    alignItems: 'center',
    elevation: 50, position:'absolute',bottom:0,right:"45%",
   
  },
  ListRowText: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingTop: 2,
    flexShrink: 1,
    textColor :'black',
    color:'black',
    

 fontSize:RFValue(12),
    
    ...Platform.select({
      ios: {
        color:'black',
      },
      android: {
        fontFamily:  'OpenSans-Regular',
        color:'black',
      }
      // default: {
      //   // other platforms, web for example
      //   fontFamily:  'OpenSans-Regular',
      // }
    }),
  },
  DropDownInnerContainer: {
    // height: 50,
    paddingBottom:10,  
 
   
   
     
   
     justifyContent: 'center'
   },
  font10:{
    fontSize:RFValue(11),
    color:'black',

  },
  font11:{
    fontSize:RFValue(11),
    

  },
  font12:{
    fontSize:RFValue(12),

  },
  font13:{
    fontSize:RFValue(13),

  },
  font14:{
    fontSize:RFValue(14),

  },
  font15:{
    fontSize:RFValue(15),

  },
  ListRowTextOrderDetail: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingTop: 2,
    textColor :'red',
    flexShrink: 1,
 fontSize:RFValue(12),
 fontWeight:'bold',
    
    ...Platform.select({
      ios: {
         
      },
      android: {
        fontFamily:  'OpenSans-Regular',
        color:'black',
        
      }
      // default: {
      //   // other platforms, web for example
      //   fontFamily:  'OpenSans-Regular',
      // }
    }),
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp('90%'),
    height:hp('70%'),
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalsearchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    color:'black'
  },
  modallistItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalitemText: {
    fontSize: 16,
    color: ApplicationConstant.AppColor, // Use AppColor for the text color
  },
  modalcloseButton: {
    backgroundColor: ApplicationConstant.AppColor, // Use AppColor for the close button
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalcloseButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});


export default styles;
