import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import * as SQLite from "expo-sqlite";
import RecentMovieItem from "../Components/RecentMovieIem";
import MovieItem from "../Components/MovieItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Movie from "./../Models/Movie";

const db = SQLite.openDatabase("movie.db");

export default function Favorite({ navigation }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchSqliteData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Favorites",
        null,
        (txObj, { rows: { _array } }) => {
          setData(_array);
          setLoading(false);
        },
        (txObj, error) => console.error(error)
      );
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchSqliteData();
    });
    return unsubscribe;
  }, [navigation]);

  if (data == null && isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></View>
    );
  } else {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.title]}>Favorites</Text>
        <ScrollView>
          <View style={{ flex: 1, paddingLeft: 20 }}>
            {data.map((item) => {
              const posterPath =
                FileSystem.documentDirectory +
                "/" +
                item.movie_id +
                "poster_path.jpg";
              item.poster_path = item.poster;
              item.id = item.movie_id;
              return <RecentMovieItem key={item.id} item={item} />;
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
    marginBottom: 20,
  },
  nodata: {
    fontSize: 16,
  },
});
