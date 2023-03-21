import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({

  ListPagecontainer: {

    backgroundColor: '#f6f3f3',
    //backgroundColor: 'red',
    height: '100%',
    display: 'flex',



  },
  CardHeader_Button: {
    padding: 0, borderTopWidth: 2,  margin:5 ,
    elevation: 2, position:'relative',   marginBottom:hp('0.5%')
  },
  ListItemRow_Space_between_secondary: {
    backgroundColor: '#f6f3f3',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
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
  ListItemRow: {
    backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'
  },
  ListRowText: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingTop: 2,
    flexShrink: 1,
 fontSize:RFValue(12),
    
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
    }),
  },
  font10:{
    fontSize:RFValue(11),

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
    flexShrink: 1,
 fontSize:RFValue(12),
 fontWeight:'bold',
    
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
    }),
  },
});


export default styles;
