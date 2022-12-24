import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

function ChipGroup(props) {
  return (
    <View style={styles.itemGroup}>
      {props.datas.map((item, index) => {
        return (
          <View style={styles.chipitem} key={index}>
            <Text style={{ color: "white" }}>{item}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemGroup: {
    flexDirection: "row",
  },
  chipitem: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    borderRadius: 10,
  },
});

export default ChipGroup;
