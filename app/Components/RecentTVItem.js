import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function RecentTVItem(props) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("TVDetail", { item: props.item })}
    >
      <View style={styles.item}>
        <Image
          style={styles.poster}
          source={{
            uri: "http://image.tmdb.org/t/p/w342/" + props.item.poster_path,
          }}
        />
        <View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <Text style={{ width: 200, fontSize: 18 }}>{props.item.title}</Text>

            <MaterialCommunityIcons
              name="star"
              size={20}
            ></MaterialCommunityIcons>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {props.item.vote_average}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginLeft: 20,
    flexWrap: "wrap",
  },
  poster: {
    width: 250,
    height: 320,
    borderRadius: 10,
  },
});
export default RecentTVItem;
