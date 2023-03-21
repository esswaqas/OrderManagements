import React, { Component,useEffect ,useState} from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import  AppStype  from 'src/StyleSheets/MainStyles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {
  AppRegistry,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
  View
} from 'react-native';
import Toast from 'react-native-toast-message'

import Dialog, { DialogFooter, DialogButton, DialogContent,DialogTitle } from 'react-native-popup-dialog';
 
import NotificationSounds, { playSampleSound } from  'react-native-notification-sounds';
 export default TimeModel=(props)=>
 {
  const [visible, setvisible] = useState(props.visible);
  const [text, setText] = React.useState('');
   const onChangeText = text => setText(text);
   const hasErrors = () => {
    return  text==''? false: true;
  };
  
   const Accept = () => {
    
    
    props.SetDeliveryTime( text, 'Accept')
    

   };
   const ClosePopup = () => {
    
    
    props.SetDeliveryTime( text, 'Cencel')
    

   };
  return(
    <View >
   
  <Dialog
    visible={props.visible}
    rounded={true}
    useNativeDriver={true}
    dialogStyle={{borderTopColor:'black'}}
    onTouchOutside={() => {
      setvisible(false);
    }}
    dialogTitle={<DialogTitle
    textStyle={AppStype.font12}
      title="Delivery Time" />}
  >
    <DialogContent
style={{height:hp('10%'), width:wp('60%')}}
    >
      <View >
      <TextInput
      label="Time"
      value={text}
      onChangeText={text => setText(text)}
      mode={'outlined'}
       style={{height:hp('5%')}}
       contentStyle={{paddingTop:2}}
       underlineColor={'black'}
       activeUnderlineColor={'black'}
       outlineColor={'black'}
       keyboardType='numeric'
       dense={true}
    />   
        
    </View>
    </DialogContent>
    <DialogFooter  bordered={true} >
     <DialogButton
      textStyle={AppStype.font12}
        align={'center'}
        bordered={true}
        activeOpacity={2}
          text="CANCEL"

          onPress={() =>ClosePopup()}
        />
         <DialogButton
textStyle={AppStype.font12}     
   align={'center'}
        bordered={true}
        activeOpacity={2}
          text="Ok"

          onPress={() =>Accept()}
        />
      </DialogFooter>
  </Dialog>
</View>

  )
 }



 'react-native-modals';
 