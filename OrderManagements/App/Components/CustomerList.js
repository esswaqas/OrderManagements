import React, { Component,useEffect ,useState} from 'react';
 
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
 
 

import { Text, Modal, View, Button, FlatList, TextInput, SafeAreaView, style, TouchableOpacity, StyleSheet } from 'react-native';
 
import styles from 'src/StyleSheets/MainStyles'
import { useSelector, useDispatch } from 'react-redux';
 export default CustomerList=(props)=>
 {
  //const [visible, setvisible] = useState();
  const [text, setText] = React.useState('');
  let dispatch = useDispatch()
  var cList = useSelector(state => state.auth.CustomerList);
  const [customerList, setcustomerList] = useState(cList);
  const [searchText, setSearchText] = useState('');
 
  useEffect(() => {
  
    setcustomerList(cList)
   

  }, [cList]);

   const SetCustomer = (id ,name) => {
    
    setcustomerList(cList);
    setSearchText('')
    props.ManageCustomerList( id, name,'')
   

   };
   const ClosePopup = () => {
    
    
    props.ManageCustomerList('','','close')
    

   };
   const handleCustomerSearch = (text) => {
    setSearchText(text);


    const filteredItems = cList.filter(item =>

       item.name.toLowerCase().includes(text.toLowerCase())
    );
    setcustomerList(filteredItems);
  };
   const rederCustomerItems = ({ item }) => (

    <TouchableOpacity style={styles.modallistItem} onPress={() => SetCustomer(item.customerID, item.name)}>
      <Text style={styles.modalitemText}>{item.name}</Text>
    </TouchableOpacity>
  );
  return(
    <View >
      
      <Modal
            animationType="slide"
            transparent={true}
            visible={props.visiblePopup}
           onRequestClose={ClosePopup}
          >

            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.modalsearchInput}
                  placeholder="Search..."
                  value={searchText}
                  onChangeText={handleCustomerSearch}
                />

                {/* Display the filtered list */}
                <FlatList
                  data={customerList}
                  keyExtractor={item => item.id}
                  renderItem={rederCustomerItems}
                />

                {/* Close button */}
                <TouchableOpacity onPress={ClosePopup} style={styles.modalcloseButton}>
                  <Text style={styles.modalcloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>

            </View>
          </Modal>
   
  {/* <Dialog
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
  </Dialog> */}
</View>

  )
 }



 'react-native-modals';
 