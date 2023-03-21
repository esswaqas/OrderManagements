  
import React, { Component } from 'react';
import { Text, View,Image,Modal ,ActivityIndicator,StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp

} from 'react-native-responsive-screen';



const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
  
       <Modal
       transparent={true}
       
       visible={loading}
       animationType={'none'}
       onRequestClose={() => {console.log('close modal')}}>

<View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator  size="large" color="black" animating={loading} />
            
            {/* If you want to image set source here   animating={this.state.isLoading}*/}
            {/* <Image  
              source={require('../assets/images/loader.gif')}
              style={{ height: 80, width: 80 }}
              resizeMode="contain"
              resizeMethod="resize"
            /> */}
          </View>
        </View>
           {/* <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
         
               

<ActivityIndicator size="small" color="#00ff00" />

           </View> */}
           </Modal>
  )
}

 

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader