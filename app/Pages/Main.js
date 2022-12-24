import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import Home from "./../Pages/Home";
import Favorite from "./../Pages/Favorite";
import TVSeries from "./../Pages/TVSeries";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("movie.db");
const Tab = createBottomTabNavigator();

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      genres: [],
    };

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, movie_id INT, title TEXT, genres TEXT, overview TEXT, popularity TEXT, release_date TEXT, vote_average TEXT, vote_count TEXT, poster TEXT, backdrop TEXT);"
      );
    });

    this.fetchData();
  }

  fetchData() {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=fbcd4fa2da6095325e48e31d1055afba"
    )
      .then((res) => res.json())
      .then((resjson) => {
        this.setState({
          isLoading: false,
          genres: resjson.genres,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const HomeComponent = (props) => (
      <Home {...props} genres={this.state.genres}></Home>
    );

    if (this.state.isLoading) {
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
      </SafeAreaView>;
    }
    return (
      <Tab.Navigator styles={styles.container} initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeComponent}
          options={{
            headerShown: false,
            tabBarLabel: "Movies",
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="movie" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="TV Series"
          component={TVSeries}
          options={{
            headerShown: false,
            tabBarLabel: "TV Series",
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="youtube-tv"
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart" color={color} size={22} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

export default Main;
