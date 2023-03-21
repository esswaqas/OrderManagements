import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState,useEffect } from 'react';
import { Text, View , StatusBar,StyleSheet,TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';
  import { Marker } from 'react-native-maps';
  import {Endpoints} from '../../API'
  import client from '../../APIService'
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   //height: wp("100%"),
   //width: hp('100%'),
   justifyContent: 'center',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default CustomerLocation = (props) => {

  const [latitude, setlatitude] = useState(37.78825);
  const [longitude, setlongitude] = useState(-122.4324);
  const [latitudeDelta, setlatitudeDelta] = useState(0.0922);
  const [longitudeDelta, setlongitudeDelta] = useState(0.0421);

  useEffect(() => {

    getLatLongFromPostcode(props.postCode)
  }, [props.postCode]);
  const getLatLongFromPostcode = (postcode) => {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=AIzaSyBIs2jkvVGP4zUT_b7o1LGOdVM0IKLh8T0`;

   // alert('url   '  + url)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) 
        {
          // set `p` and other code
 
       /// alert(JSON.stringify(data))
        const location = data.results[0].geometry.location;
      // setlatitude(location.lat)
      //  setlongitude(location.lng)
        // setRegion({
        //   latitude: location.lat,
        //   longitude: location.lng,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // });
        }
      });
  };
  return(

   <View style={styles.container}>
    { (props.postCode !=null &&  props.postCode !=undefined  &&  props.postCode !='') ?
      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: latitude,
         longitude: longitude,
         latitudeDelta: latitudeDelta,
         longitudeDelta: longitudeDelta,
       }}
     >

<Marker
       coordinate={{latitude:latitude,
        longitude:longitude}}
      title={'test'}

    /> 
     </MapView>
     :
     <MapView
     initialRegion={{
       latitude: 37.78825,
       longitude: -122.4324,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }}
   />
  

     }

   </View>);
}