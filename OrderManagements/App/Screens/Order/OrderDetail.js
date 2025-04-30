import React, { useState, useEffect } from 'react';
import { Text, Modal, View, Button, FlatList, SafeAreaView, style, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../Components/CustomHeader';
import { ListItem, Icon, Card, CheckBox, Button as ElementButton } from '@rneui/themed';
import { TextInput as LabelTextInput, Button as PaperButton } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
 
import Toast from 'react-native-toast-message'
import client from '../../APIService'
import DropdownList from '../../Components/DropdownList';
import { ImagePath } from 'src/API'
import ApplicationConstant from 'src/Utles/ApplicationConstant'
import ImageViewer from 'react-native-image-zoom-viewer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  setmessagetitle,setmessagebody,setmessagecancelbtn,setisvisibleMessage} from 'src/redux/Slices/MainSlice';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

import styles from 'src/StyleSheets/MainStyles'
import { color } from '@rneui/base';

const ProductDetail = (props) => {
 
  var addedItem = useSelector(state => state.auth.ProductItemList);
  let dispatch = useDispatch()

   
  
  const [DiscountType, setDiscountType] = useState('F');
  const [PriceTypeVal, setPriceTypeVal] = useState('W');
  
  const [productID, setproductID] = useState();
  const [ProductName, setProductName] = useState();
  

   
  const [RetialPrice, setRetialPrice] = useState();
  const [WholesalePrice, setWholesalePrice] = useState();
  const [UnitID, setUnitID] = useState();
  const [UnitValue, setUnitValue] = useState();
  const [AvailableQty, setAvailableQty] = useState();
const [ProductImage, setProductImage] = useState();

  const [unitPrice, setunitPrice] = useState();
  const [Qty, setQty] = useState(0);
  const [CartonQty, setCartonQty] = useState(0);
 
  const [BonusQty, setBonusQty] = useState(0);
  const [CartonBonusQty, setCartonBonusQty] = useState(0);
  const [ItemDiscount, setItemDiscount] = useState(0);
  const [ItemTotalPrice, setItemTotalPrice] = useState(0);
  
  useEffect(() => {
   // alert(JSON.stringify(props.Items))

   
   // alert(data[0].name)
    
if(props.Items!=null && props.Items!='' && props.Items.length>0)
   { 
    var data =props.Items;
     setproductID(data[0].id);
      setProductName(data[0].name);
      setRetialPrice(data[0].price);
      setWholesalePrice(data[0].wholeSalePrice);
      setUnitID(data[0].unitID);
      setUnitValue(data[0].unitValue);
      setAvailableQty(data[0].availableQty);
      setunitPrice(data[0].wholeSalePrice);
      setPriceTypeVal('W')
      setProductImage(data[0].Image);

setItemTotalPrice(0)
 
setCartonQty(0)
setQty(0)
setCartonBonusQty(0)
setBonusQty(0)

    }
   }, [props.Items]);


  const PriceType = (type) => {

    let qty = (CartonQty * UnitValue)+ Qty;
    setPriceTypeVal(type);
    if (type == 'R') {
      let reprice = RetialPrice;
      setunitPrice(reprice);
      CalculatetotalPrice(qty, reprice, ItemDiscount)

    }
    else {
      let whhprice = WholesalePrice;
      setunitPrice(whhprice);
      CalculatetotalPrice(qty, whhprice, ItemDiscount)
    }


  }


  const setUnitPrice = async (val) => {
    let qty = (CartonQty * UnitValue)+ Qty;
    setunitPrice(val)
    CalculatetotalPrice(qty, val, ItemDiscount)
  }
 

  const setItemsDiscount = async (val) => {


    if (val > 0) {


      setItemDiscount(val)

    }
    else {
      setItemDiscount('')
    }

    DiscountToItems(val)
  }
  SetDisCountTypeVal = async (val) => {


    setDiscountType(val)
    let discount = ItemDiscount
    setItemsDiscount(discount)

  }
  const DiscountToItems = async (discount, type) => {

    if (discount > 0) {

      let up = parseFloat(unitPrice);
      let dis = parseFloat(discount);
      let qty = parseInt(((CartonQty * UnitValue)+ Qty));
      CalculatetotalPrice(qty, up, dis)

    }
  }



  const CalculatetotalPrice = async (qty, unitprice, discount) => {


    let quantity = parseInt(qty);
    let up = parseFloat(unitprice);
    let distype = DiscountType;
    let totPrice = (quantity * up);

    if (DiscountType == "F") {
      totPrice = ((totPrice)) - (discount ?? 0);
    }
    else {

      totPrice = ((quantity * up) - (totPrice * ((discount ?? 0) / 100)));
    }

    //a--lert(qty +"-"+ unitPrice+"-"+totPric
    setItemTotalPrice(totPrice);


  }




  const IncrementdecrementBonusQty = async (isncrement, isCarton) => {

   

    if (isncrement == true) {
      if(isCarton==true){
        let qty = CartonBonusQty + 1
        setCartonBonusQty(qty)
      }
      else{
        let qty = BonusQty + 1
        setBonusQty(qty)
      }
    }
    else {

      if(isCarton==true){
        if (parseInt(CartonBonusQty) > 0) {
          let qty = CartonBonusQty - 1
          setCartonBonusQty(qty)
        }
      }
      else{
        if (parseInt(BonusQty) > 0) {
          let qty = BonusQty - 1
          setBonusQty(qty)
        }
      }

     
    }
 
  }


  const Incrementdecrement = async (isncrement, isCarton) => {
 

    let cartonQty = 0
    let qtyinPsc = 0;
//alert("AvailableQty= "+   AvailableQty+" unit Value= "+ UnitValue)
    if (isncrement == true) {

      if (parseInt(AvailableQty) > 0) {
        if (isCarton == true)
           {

          //  IncreaseCartonQty()
          cartonQty = CartonQty + 1
          qtyinPsc = (cartonQty * UnitValue)+ Qty;
         

          if (parseInt(qtyinPsc) <= parseInt(AvailableQty)) {
             setCartonQty(cartonQty)
             CalculatetotalPrice(qtyinPsc, unitPrice, ItemDiscount)
           }
           else{
            dispatch(setmessagetitle('Eroor'))
            dispatch(setmessagebody( "No more carton available for this product."))
            dispatch( setisvisibleMessage(true))
        
          }
        }
        else {
          qtyinPsc =((Qty + 1) +(CartonQty * UnitValue))  ;
          if (parseInt(qtyinPsc) <= parseInt(AvailableQty)) {
           
         
            setQty((Qty + 1) )
            // getBaseUnitValue(qty, UnitValue, Unit)
             CalculatetotalPrice(qtyinPsc, unitPrice, ItemDiscount)
           }
           else {
    
           
            //Toast.show({type: "message",position: "top",props: {title:'Eroor',body: "No more piece available for this product."}})
            dispatch(setmessagetitle('Eroor'))
            dispatch(setmessagebody( "No more piece available for this product."))
            dispatch(setisvisibleMessage(true))
   
           }
        }

       
      } else {
       
       // Toast.show({type: "message",position: "top",props: {title:'Eroor',body: "No more stock available for this product."}})
       dispatch(setmessagetitle('Eroor'))
       dispatch(setmessagebody( "No more stock available for this product."))
       dispatch(setisvisibleMessage(true))
      }
    }
    else {
    

      if (isCarton == true)
        {
          cartonQty = CartonQty - 1
          qtyinPsc = (cartonQty * UnitValue);
          if (parseInt(CartonQty) > 0) {
          setCartonQty(cartonQty)

          let decqty=((Qty) +(qtyinPsc));

          CalculatetotalPrice(decqty, unitPrice, ItemDiscount)}
        }else{
      if (parseInt(Qty) > 0) {
        var qty = Qty - 1
        setQty(qty)
        //getBaseUnitValue(qty, UnitValue, Unit)
        let decqty=(((CartonQty * UnitValue)) +(qty));
        CalculatetotalPrice(decqty, unitPrice, ItemDiscount)

      }
    }
    }
 
  }

  
  const ManualQty=async (val, isCarton)=>
  {
    if (parseInt(AvailableQty) > 0)
       {
      if (isCarton == true)
         {

        //  IncreaseCartonQty()
        cartonQty = val
        qtyinPsc = (cartonQty * UnitValue)+ Qty;
        if (parseInt(qtyinPsc) <= parseInt(AvailableQty)) {
           setCartonQty(cartonQty)
           CalculatetotalPrice(qtyinPsc, unitPrice, ItemDiscount)
         }
         else{
          setCartonQty(0)
          //Toast.show({type: "message",position: "top",props: {title:'Eroor',body: "No more carton available for this product."}})
          dispatch(setmessagetitle('Eroor'))
          dispatch( setmessagebody( "No more carton available for this product."))
          dispatch( setisvisibleMessage(true))
         }
      }
      else
       {
         qtyinPsc =(parseInt(val) +(CartonQty * UnitValue))  ;
         
        if (parseInt(qtyinPsc) <= parseInt(AvailableQty)) {
         
       
          setQty((val) )
          // getBaseUnitValue(qty, UnitValue, Unit)
           CalculatetotalPrice(qtyinPsc, unitPrice, ItemDiscount)
         }
         else {
  
         
         // Toast.show({type: "message",position: "top",props: {title:'Eroor',body: "No more piece available for this product."}})
          setQty(0)
          dispatch(setmessagetitle('Eroor'))
          dispatch( setmessagebody( "No more piece available for this product."))
          dispatch( setisvisibleMessage(true))
 
         }
      }

    
    } 
    else {
     
    //  Toast.show({type: "message",position: "top",props: {title:'Eroor',body: "No more stock available for this product."}})
       
    dispatch(setmessagetitle('Eroor'))
    dispatch(setmessagebody( "No more stock available for this product."))
    dispatch( setisvisibleMessage(true))
    }
  }
  function getBaseUnitValue(qty, unitValue, unitName) {
    let qtyItem = "";

    if (parseInt(qty) > 0 && parseInt(unitValue) <= parseInt(qty)) {

      //alert(qty +"--"+ unitValue +" =rs = " + Math.floor(qty / unitValue))
      if (Math.floor(qty / unitValue) === 0) {
        qtyItem = `${qty} (Piece)`;
      } else {
        if ((qty - (Math.floor(qty / unitValue) * unitValue)) > 0) {
          qtyItem = `${Math.floor(qty / unitValue)} (${unitName}) ${qty - (Math.floor(qty / unitValue) * unitValue)} (Piece)`;
        } else {
          qtyItem = `${Math.floor(qty / unitValue)} (${unitName})`;
        }
      }
      setSelectedQty(qtyItem);
    }
    else {
      qtyItem = qty + ' (Piece)'
      setSelectedQty(qtyItem);
    }

 
  }

  const BindProductItem = async () => {

    var itemobject = new Object();

    if ((CartonQty * UnitValue)+ Qty <= 0) {
      dispatch(setmessagetitle('Warning'))
      dispatch( setmessagebody( "Qty Should be greater to 0"))
      dispatch(setisvisibleMessage(true))

    //  Toast.show({
        //type: "message",
       // position: "top",
       // props: {
       //   title: 'Warning',
       //   body: "Qty Should be greater to 0"
       // }
     // })
      return false;
    }
 
    props.AddtoCartItem(productID,UnitID,UnitValue,CartonQty,Qty,CartonBonusQty,BonusQty,unitPrice,ItemTotalPrice,PriceTypeVal,ProductName,'')
   
  }

  const ClosePopup = () => {
    
    
  
   props.AddtoCartItem(productID,UnitID,UnitValue,CartonQty,Qty,CartonBonusQty,BonusQty,unitPrice,ItemTotalPrice,PriceTypeVal,ProductName, 'close')
   };


  return (
    
       <View >
            
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={props.visibleProductDetailPopup}
                 onRequestClose={ClosePopup}
                >
                    <View style={styles.modalBackground}>
      <View style={[ styles.modalContainer, { height: hp('90%'),  width: wp('95%'), padding: 10, alignSelf:'center'  }]}>

        <View style={{ height: hp('20%')}}>
          {
            ProductImage !== null && ProductImage !== '' ?
              <Image
                style={{ height: hp('20%') }}
                // source={{ uri: ImagePath.ProductImageUrl + '' + ProductImage }}
                source={{ uri: ImagePath.ProductImageUrl + '' + ProductImage }}

              />

              :
              <Image
                resizeMode="contain"
                style={{ width: '90%', height: '90%', borderRadius: 15, }}
                source={require('../../Images/PlaceHolderImage.jpg')}
              />

          }



        </View>

        <View style={{ height: hp('55%'), justifyContent: 'center',   alignItems: 'center', alignSelf: 'center',marginTop:10  }}>
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={35}

          >

            <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true}   >

              <View style={{ flexDirection: 'row',   paddingBottom: 5 }}>
                <View style={{ width: '100%' }}>
                  <DropdownList
                    OptionList={[
                      { label: 'Wholesale Price', value: 'W' },
                      { label: 'Retail Price', value: 'R' },

                    ]}
                    PlaceHolderText={"Price Type"}
                    selectedValue={PriceTypeVal}
                    setValue={PriceType}
                    label={"Price Type"}
                    height={40}
                  />
                </View>
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>

                <LabelTextInput
                  mode="outlined"
                  label="Unit Price"

                  style={{ width: '100%' }}
                  value={'' + unitPrice + ''}
                  textStyle={{ color: 'red' }}
                  onChangeText={(val) => setUnitPrice(val)}

                  right={<TextInput.Affix />}
                />

              </View>
              {/*   Qty  */}

              <View style={{ marginTop: 10, borderWidth: 1 , paddingBottom: 5 }}>

                <View style={{ flexDirection: 'row', backgroundColor: ApplicationConstant.AppColor }}>
                  <Text style={[styles.fontFamily, styles.font_13, { color: 'white', fontWeight: 'bold', padding: 5 }]}>Qty</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '95%', }}>


                  <View style={{ width: '41%' }}>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.fontFamily, styles.font_13, { color: 'black' }]}>Carton</Text>
                    </View>


                    <View style={QtyBoxstyle.qtyLine}>


                      <TouchableOpacity style={QtyBoxstyle.btn} onPress={() => { Incrementdecrement(false, true) }} >
                        <Icon name="minus-circle" type="feather" color={ApplicationConstant.AppColor} size={25} />
                      </TouchableOpacity>
                      
                      <View  >
                        <TextInput value={'' + CartonQty + ''}
                          style={QtyBoxstyle.qtyInput}
                          keyboardType='number-pad'
                          onChangeText={(val) => ManualQty(val,true)}
                        />
                      </View>
                      <TouchableOpacity style={QtyBoxstyle.btn} onPress={() => { Incrementdecrement(true, true) }}>
                        <Icon name="plus-circle" type="feather" color={ApplicationConstant.AppColor} size={25} />
                      </TouchableOpacity>
                    </View>


                  </View>

                  <View style={{ width: '41%', }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.fontFamily, styles.font_13, { color: 'black' }]}>Pcs</Text>
                    </View>
                    <View style={QtyBoxstyle.qtyLine}>

                      <TouchableOpacity style={QtyBoxstyle.btn} onPress={() => { Incrementdecrement(false, false) }} >
                        <Icon name="minus-circle" type="feather" color={ApplicationConstant.AppColor} size={25} />
                      </TouchableOpacity>
                      <View  >
                        <TextInput value={'' + Qty + ''}
                          style={QtyBoxstyle.qtyInput}
                          keyboardType='number-pad'
                          onChangeText={(val) => ManualQty(val,false)}
                        />
                      </View>
                      <TouchableOpacity style={QtyBoxstyle.btn} onPress={() => { Incrementdecrement(true, false) }}>
                        <Icon name="plus-circle" type="feather" color={ApplicationConstant.AppColor} size={25} />
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              </View>
              {/* bouns Qty  */}
              <View style={{ marginTop: 10, borderWidth: 1, paddingBottom: 5 }}>


                <View style={{ flexDirection: 'row', backgroundColor: ApplicationConstant.AppColor }}>
                  <Text style={[styles.fontFamily, styles.font_13, { color: 'white', fontWeight: 'bold', padding: 5 }]}>Bonus Qty</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '95%' }}>
                  <View style={{ width: '41%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.fontFamily, styles.font_13, { color: 'black' }]}>Carton</Text>
                    </View>
                    <View style={QtyBoxstyle.qtyLine}>
                      <TouchableOpacity style={QtyBoxstyle.btn} onPress={() => { IncrementdecrementBonusQty(false,true) }} >
                        <Icon name="minus-circle" type="feather" color={ApplicationConstant.AppColor} size={25} />
                      </TouchableOpacity>
                      <View  >
                        
                        <TextInput value={'' + CartonBonusQty + ''}
                          style={QtyBoxstyle.qtyInput}
                          editable={false}
                            />
                      </View>
                      <TouchableOpacity style={QtyBoxstyle.btn} onPress={() => { IncrementdecrementBonusQty(true,true) }}>
                        <Icon name="plus-circle" type="feather" color={ApplicationConstant.AppColor} size={25} />
                      </TouchableOpacity>
                    </View>


                  </View>

                  <View style={{ width: '41%', }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.fontFamily, styles.font_13, { color: 'black' }]}>Pcs</Text>
                    </View>
                    <View style={QtyBoxstyle.qtyLine}>

                      <TouchableOpacity style={QtyBoxstyle.btn} onPress={() => { IncrementdecrementBonusQty(false,false) }} >
                        <Icon name="minus-circle" type="feather" color={ApplicationConstant.AppColor} size={25} />
                      </TouchableOpacity>
                      <View  >
                        <TextInput value={'' + BonusQty + ''}
                          style={QtyBoxstyle.qtyInput}
                          editable={false}
                            />
                      </View>
                      <TouchableOpacity style={QtyBoxstyle.btn} onPress={() => { IncrementdecrementBonusQty(true,false) }}>
                        <Icon name="plus-circle" type="feather" color={ApplicationConstant.AppColor} size={25} />
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              </View>

              {/* <View style={{ flexDirection: 'row', paddingBottom: 2, width: '100%' }}>

                <View style={{ width: '43%' }}>
                  <DropdownList
                    OptionList={[

                      { label: 'Fixed', value: 'F' },
                      { label: 'Percentage', value: 'P' },
                    ]}
                    PlaceHolderText={"Discount Type"}
                    selectedValue={DiscountType}
                    setValue={SetDisCountTypeVal}
                    label={""}
                    height={50}
                  />
                </View>
                <View style={{ width: '55%' }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 5, paddingTop: 10, marginTop: 10, marginLeft: 10 }}>

                    <LabelTextInput
                      mode="outlined"
                      label="Discount"
                      placeholder=""
                      style={{ width: '100%', textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}
                      value={'' + ItemDiscount + ''}
                      textStyle={{ color: 'red' }}
                      onChangeText={(val) => setItemsDiscount(val)}

                      right={<TextInput.Affix />}
                    />

                  </View>
                </View>

              </View> */}

              <View style={{ flexDirection: 'row',   width: '100%', marginTop: 10, }}>
                
                <Text style={[styles.fontFamily, styles.font_13, { color: 'black', fontWeight: 'bold', padding: 5 }]}>Total Price</Text>
                <Text style={[styles.fontFamily, styles.font_13, { color: 'black', fontWeight: 'bold', padding: 5 }]}>{ItemTotalPrice}</Text>


              </View>

            </ScrollView>
          </KeyboardAwareScrollView>
        </View>

        <View style={{ height: hp('10%') }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '100%' }}>

            <PaperButton style={{ width: '45%',   borderColor: ApplicationConstant.AppColor, borderWidth: 2 }}
              mode="outlined"
              textColor={ApplicationConstant.AppColor}
              onPress={ClosePopup}
            >
              Close
            </PaperButton>

            <PaperButton style={{ width: '48%', borderColor: ApplicationConstant.AppColor, borderWidth: 2 }} mode="contained" buttonColor={ApplicationConstant.AppColor}

              onPress={BindProductItem}>
             Save
            </PaperButton>
          </View>
        </View>

      </View>
      </View>
      </Modal>
      </View>

  )
}


const QtyBoxstyle = StyleSheet.create({

  qtyLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 5,


  },
  qtyInput: {
    width: wp('20%'),

    color: 'black',
    textAlign: 'center',
    padding: 5,

    borderBottomWidth: 1,
    borderColor: '#597e15',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor:ApplicationConstant.AppColor,
    width: wp('7%'),
    height: hp('4%'),
  },
  btnText: {
    color: 'white',
  },
});
export default ProductDetail;