import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function TrailerItem(props) {
  const devWidth = Dimensions.get("window").width;
  const thumbnail =
    "https://img.youtube.com/vi/" + props.data.key + "/hqdefault.jpg";
  var posterWidth = (devWidth - 50) / 2;
  return (
    <TouchableWithoutFeedback onPress={props.onPressFunction}>
      <View style={{ marginRight: 5 }}>
        <MaterialCommunityIcons
          name="arrow-right-drop-circle"
          size={36}
          color={"#fff"}
          style={{
            position: "absolute",
            left: 60,
            top: 20,
            padding: 10,
            zIndex: 1,
          }}
        ></MaterialCommunityIcons>
        <Image
          resizeMode={"cover"}
          style={{
            width: posterWidth,
            height: 100,
            borderRadius: 15,
            marginBottom: 5,
          }}
          source={{ uri: thumbnail }}
        />
        <Text style={{ flexWrap: "wrap", width: posterWidth }}>
          {props.data.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default TrailerItem;
