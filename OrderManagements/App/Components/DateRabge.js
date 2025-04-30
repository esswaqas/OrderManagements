import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';

import RNPickerSelect from 'react-native-picker-select';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import DropdownList from '../Components/DropdownList'
const DateRangeList = ({ SetDateRangeValues }) => {

  const [dateRange, setDateRange] = useState({
    Participant: '',
    DateFrom: '',
    DateTo: '',
  });
  const [DateRangeList, setDateRangeList] = useState([
    { label: 'Today', value: 'Today' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'Tomorrow', value: 'Tomorrow' },
    { label: 'Next 7 Days', value: 'Next7Days' },
    { label: 'Last 7 Days', value: 'Last7Days' },
    { label: 'Month To Date', value: 'MonthToDate' },
    { label: 'Last Month', value: 'LastMonth' },
    { label: 'Last 2 Months', value: 'Last2Month' },
    { label: 'Year to Date', value: 'YeartoDate' },
    { label: '1 Year', value: 'OneYear' },
    { label: '2 Year', value: 'TwoYear' },
  ]);
  const [selectRangeValue, setselectRangeValue] = useState('');

  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');

  const GetDateRangeValues = (value) => {
    let fromDate = '';
    let toDate = '';

    setselectRangeValue(value)

    const today = new Date();

    switch (value) {
      case 'MonthToDate':
        fromDate = moment(new Date(today.getFullYear(), today.getMonth(), 1)).format('DD/MM/YYYY');
        toDate = moment(today).format('DD/MM/YYYY');
        break;
      case 'Today':
        fromDate = toDate = moment(today).format('DD/MM/YYYY');
        break;
      case 'Next7Days':
        fromDate = moment(today).format('DD/MM/YYYY');
        toDate = moment(today.setDate(today.getDate() + 6)).format('DD/MM/YYYY');
        break;
      case 'Tomorrow':
        fromDate = toDate = moment(today.setDate(today.getDate() + 1)).format('DD/MM/YYYY');
        break;
      case 'Yesterday':
        fromDate = toDate = moment(today.setDate(today.getDate() - 1)).format('DD/MM/YYYY');
        break;
      case 'LastMonth':
        const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        fromDate = moment(firstDayLastMonth).format('DD/MM/YYYY');
        toDate = moment(lastDayLastMonth).format('DD/MM/YYYY');
        break;
      case 'YeartoDate':
        fromDate = `01/01/${today.getFullYear()}`;
        toDate = moment(today).format('DD/MM/YYYY');
        break;
      case 'Last2Month':
        fromDate = moment(new Date(today.setMonth(today.getMonth() - 2))).format('DD/MM/YYYY');
        toDate = moment(new Date()).format('DD/MM/YYYY');
        break;
      case 'OneYear':
        fromDate = moment(new Date(today.setFullYear(today.getFullYear() - 1))).format('DD/MM/YYYY');
        toDate = moment(new Date()).format('DD/MM/YYYY');
        break;
      case 'TwoYear':
        fromDate = moment(new Date(today.setFullYear(today.getFullYear() - 2))).format('DD/MM/YYYY');
        toDate = moment(new Date()).format('DD/MM/YYYY');
        break;
      case 'Last7Days':
        fromDate = moment(new Date(today.setDate(today.getDate() - 6))).format('DD/MM/YYYY');
        toDate = moment(new Date()).format('DD/MM/YYYY');
        break;
      default:
        break;
    }

    //alert(fromDate+', '+toDate)
    // setDateRange((prev) => ({ ...prev, DateFrom: fromDate, DateTo: toDate }));
    setStartDate(fromDate)
    setEndDate(toDate)
    SetDateRangeValues(fromDate, toDate);
  };

  return (
    <View style={{ width: '100%',  padding :10}}>
      <DropdownList
        OptionList={DateRangeList}
        PlaceHolderText={"Date Range"}
        selectedValue={selectRangeValue}
        setValue={GetDateRangeValues}
        label={"Date Range"}
      />
      {
        StartDate != '' || EndDate != '' ?

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',paddingTop: 3 }}>

            <View style={{ flexDirection: 'row',borderRadius:10,borderWidth:1,alignItems:'center', justifyContent:'center',alignSelf:'center' }}>
              <Text style={{color:'black'}}>  Date: {StartDate}   To  {EndDate} </Text>
            </View>
            
          </View>
          : null
      }
    </View>


  );
};

export default DateRangeList;

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
    paddingHorizontal: 20,
    paddingVertical: 20,

    //borderWidth: 0.5,
    //borderColor: 'purple',
    borderRadius: 10,
    color: 'black',
  },
  inputAndroid: {
    fontSize: RFValue(13),
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#e9e9e9',
    //borderWidth: 0.5,
    //borderColor: 'purple',
    borderRadius: 20,
    color: 'black',
    //paddingRight: 30, // to ensure the text is never behind the icon
  },
});