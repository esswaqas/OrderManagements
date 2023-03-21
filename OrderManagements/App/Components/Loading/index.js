import React from "react";
import { View, ActivityIndicator ,Platform} from "react-native";
import { Colors } from 'src/utils'

const Loading = ({ backgroundColor }) => {
  return (
    <View
    // style={[
    //   styles.loadingContainer,
    //   styles.horizontal,
    //   backgroundColor ? { backgroundColor } : {},
    // ]}
    >
      {Platform.OS == "ios" ? (
        <ActivityIndicator size="small" color={"#EEBC6A"} />
      ) : (
        <ActivityIndicator size="large" color={"#EEBC6A"} />
      )}
    </View>
  );
};
export default Loading;