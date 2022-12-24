import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ViewAll from "./ViewAll";
import TVDetail from "./TVDetail";
import TV from "../Models/TV";
import TVItem from "../Components/TvItem";
import RecentTVItem from "../Components/RecentTVItem";

class TVSeries extends Component {
  _isMount = false;
  genres = [];
  deviceWidth = Dimensions.get("window").width;

  state = {
    isLoading: false,
    recentMovies: [],
    popularMovies: [],
  };

  constructor(props) {
    super(props);

    //this.genres = props.genres;
  }

  componentDidMount() {
    this._isMount = true;

    return fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=fbcd4fa2da6095325e48e31d1055afba&language=en-US&page=1"
    )
      .then((response) => response.json())

      .then((responseJson) => {
        const moviedata = [];

        var allgenres = this.genres;

        responseJson.results.forEach((movie) => {
          moviedata.push(
            new TV({
              id: movie.id,

              name: movie.name,

              poster_path: movie.poster_path,

              backdrop_path: movie.backdrop_path,

              genres: movie.genres,

              genre_ids: movie.genre_ids,

              overview: movie.overview,

              popularity: movie.popularity,

              release_date: movie.release_date,

              vote_average: movie.vote_average,

              vote_count: movie.vote_count,

              genres: movie.genres,
              first_air_date: movie.first_air_date,
            })
          );
        });

        if (this._isMount) {
          this.setState({
            popularMovies: moviedata,
          });
        }

        fetch(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=fbcd4fa2da6095325e48e31d1055afba"
        )
          .then((res) => res.json())

          .then((resJson) => {
            const moviedata = [];

            var allgenres = this.genres;

            resJson.results.forEach((movie) => {
              moviedata.push(
                new TV({
                  id: movie.id,

                  name: movie.name,

                  poster_path: movie.poster_path,

                  backdrop_path: movie.backdrop_path,

                  genres: movie.genres,

                  genre_ids: movie.genre_ids,

                  overview: movie.overview,

                  popularity: movie.popularity,

                  release_date: movie.release_date,

                  vote_average: movie.vote_average,

                  vote_count: movie.vote_count,

                  genres: movie.genres,
                  first_air_date: movie.first_air_date,
                })
              );
            });

            if (this._isMount) {
              this.setState({
                recentMovies: moviedata,
              });
            }
          });
      })

      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <View
            style={{
              flexWrap: "wrap",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons
              style={{ paddingLeft: 160, paddingTop: 15 }}
              name="movie"
              size={30}
            />
          </View>
        </View>

        <ScrollView scrollEnabled={true}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {"Popular TV Series"}
            </Text>

            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate("TvViewAll", {
                  genres: this.genres,
                  isPopular: true,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {"View All"}
                </Text>

                <MaterialCommunityIcons name="chevron-right" size={20} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <ScrollView
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20 }}>
              {this.state.popularMovies.map((item, index) => {
                return index < 4 ? (
                  <TVItem key={item.id} item={item} />
                ) : (
                  <View key={item.id} />
                );
              })}
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {"Recent Tv Series"}
            </Text>

            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate("TvViewAll", {
                  genres: this.genres,

                  isPopular: false,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {"View All"}
                </Text>

                <MaterialCommunityIcons name="chevron-right" size={20} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{ paddingLeft: 45, paddingTop: 10 }}>
            {this.state.recentMovies.map((item, index) => {
              return index < 4 ? (
                <TVItem key={item.id} item={item} />
              ) : (
                <View key={item.id} />
              );
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
    marginTop: Constants.statusBarHeight,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default TVSeries;
