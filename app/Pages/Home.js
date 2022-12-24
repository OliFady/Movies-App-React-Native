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
import Movie from "./../Models/Movie";
import MovieItem from "../Components/MovieItem";
import Constants from "expo-constants";
import Autocomplete from "react-native-autocomplete-input";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RecentMovieItem from "../Components/RecentMovieIem";
import ViewAll from "./ViewAll";

class Home extends Component {
  baseUrl = "http://api.themoviedb.org/3/movie/";
  apiKey = "fbcd4fa2da6095325e48e31d1055afba";
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

    this.genres = props.genres;
  }

  componentDidMount() {
    this._isMount = true;

    return fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=fbcd4fa2da6095325e48e31d1055afba"
    )
      .then((response) => response.json())

      .then((responseJson) => {
        const moviedata = [];

        var allgenres = this.genres;

        responseJson.results.forEach((movie) => {
          movie.genres = [];

          movie.genre_ids.forEach((genre) => {
            var genreData = allgenres.filter((x) => x.id == genre);

            if (genreData.length != 0) {
              movie.genres.push(genreData[0].name);
            }
          });

          moviedata.push(
            new Movie({
              id: movie.id,

              title: movie.title,

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
            })
          );
        });

        if (this._isMount) {
          this.setState({
            popularMovies: moviedata,
          });
        }

        fetch(
          "https://api.themoviedb.org/3/movie/" +
            "now_playing?api_key=fbcd4fa2da6095325e48e31d1055afba&page=2"
        )
          .then((res) => res.json())

          .then((resJson) => {
            const moviedata = [];

            var allgenres = this.genres;

            resJson.results.forEach((movie) => {
              movie.genres = [];

              movie.genre_ids.forEach((genre) => {
                var genreData = allgenres.filter((x) => x.id == genre);

                if (genreData.length != 0) {
                  movie.genres.push(genreData[0].name);
                }
              });

              moviedata.push(
                new Movie({
                  id: movie.id,

                  title: movie.title,

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
              {"Popular Movies"}
            </Text>

            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate("ViewAll", {
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
                  <MovieItem key={item.id} item={item} />
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
              {"Recent Movies"}
            </Text>

            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate("ViewAll", {
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
                <RecentMovieItem key={item.id} item={item} />
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

export default Home;
