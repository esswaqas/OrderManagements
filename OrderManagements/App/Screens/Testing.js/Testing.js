import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatusExample = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  const test=()=>{
    if(isConnected){
      alert('test')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isConnected ? 'You are online!' : 'You are offline!'}
      </Text>
      <Text style={styles.text}>
        Connection Type: {connectionType}
      </Text>
      <View>
<TouchableOpacity onPress={test}>
  <Text>test</Text>
</TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default NetworkStatusExample;
