import React, {useState,useEffect} from 'react';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import {StyleSheet, Text, View, TouchableOpacity , Image, Platform} from 'react-native';
import {    Icon,   } from '@rneui/themed';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {

  heightPercentageToDP as hp,

} from 'react-native-responsive-screen';
  
let CustomSwitch = React.memo(({
  OptionList,
  PlaceHolderText,
  selectedValue,
  setValue,
  label, height
}) => {
  let [selectValue, setSelectValue] = useState(selectedValue);

  const updatedSwitchData = () => {
    setValue(selectValue);
  };

  const updated = val => {
    selectValue = val;
    setSelectValue(val);
    Platform.OS === "ios" ? null : setValue(val);
  };

  useEffect(() => {
    setSelectValue(selectedValue);
  }, [selectedValue]);

  return (
    <View>
      {
        label!=="Price Type"??
       
<Text style={{color:'black'}}>{label}</Text>}

      <RNPickerSelect
        placeholder={{
          label: PlaceHolderText,
          value: '',
          color: '#a5a5a5'
        }}
        items={OptionList}
        textInputProps={{ multiline: true }}
        pickerProps={{ numberOfLines: 10 }}
        onDonePress={() => {
          updatedSwitchData();
        }}
        onValueChange={value => {
          updated(value);
        }}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: Platform.OS == 'ios' ? 0 : 0,
            right: 20,
          },
          placeholder: {
            color: '#a5a5a5',
          },
          
          inputAndroid: {
            height:height,
            fontSize: RFValue(13),
            paddingHorizontal: 13,
           
            backgroundColor: 'white',
             borderWidth:0.5,
            borderColor: 'black',
           borderRadius: 0,
            color: 'black',
            //paddingRight: 30, // to ensure the text is never behind the icon
          },
        }}
        value={selectValue}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Icon name="sort-desc" type='font-awesome' size={hp('3%')} />;
        }}
      />
    </View>
  );
});

export default CustomSwitch;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
    //   justifyContent:'center',
    //   alignItems:'center',
    //   fontSize: 13,
    //   paddingVertical: 8,
    //   paddingHorizontal: 20,
    //   //borderWidth: 1,
    //   borderColor: 'gray',
    //   backgroundColor: '#e9e9e9',
    //   borderRadius: 8,
    //  // marginTop:9,
    //   color: 'black',
    fontSize: RFValue(13),
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: 'white',
    //borderWidth: 0.5,
    //borderColor: 'purple',
   borderRadius: 0,
    color: 'black',
    },
    
  });
  