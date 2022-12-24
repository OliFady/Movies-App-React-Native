import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TVDetail from "../Pages/TVDetail";

function MovieItem(props) {
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
        <Text style={{ width: 171 }}>{props.item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginRight: 10,
    marginLeft: 30,
  },
  poster: {
    width: 250,
    height: 350,
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default MovieItem;
