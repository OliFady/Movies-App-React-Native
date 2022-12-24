import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";
import React, { Component, useState } from "react";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Trailer from "../Models/Trailer";
import TrailerItem from "../Components/TrailerItem";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import CastItem from "../Components/CastItem";
import CastViewAll from "./CastViewAll";
import Cast from "../Models/Cast";

const db = SQLite.openDatabase("movie.db");

class TVDetail extends Component {
  movieElement = null;
  constructor(props) {
    super(props);
    this.movieElement = props.route.params.item;
    this.readMovieData(this.movieElement);
  }

  state = {
    Trailer: [],
    activeMovieTrailerKey: "",
    modalVisible: false,
    isFavorite: false,
    castResults: [],
  };

  readMovieData() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Favorites",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ data: _array });
          console.log(_array);
        },
        (txObj, error) => console.error(error)
      );
    });
  }

  delete = (data) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Favorites WHERE movie_id = ? ",
        [data.id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            this.setState({ isFavorite: false });
            console.log("deleted");
          }
        }
      );
    });
  };
  favoriteProcess(data) {
    if (this.state.isFavorite) {
      this.delete(data);
    } else {
      this.newItem(data);
    }
  }

  newItem = (data) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Favorites (movie_id, title, genres, overview, popularity, release_date, vote_average, vote_count,poster) values (?, ?, ?, ?, ?, ?, ?, ?,?)",
        [
          data.id,
          data.title,
          data.genresString,
          data.overview,
          data.popularity,
          data.release_date,
          data.vote_average,
          data.vote_count,
          data.poster_path,
        ],
        (txObj, resultSet) => this.setState({ isFavorite: true }),

        (txObj, error) => console.log("Error", error)
      );
    });
  };

  componentDidMount() {
    return fetch(
      "http://api.themoviedb.org/3/tv/" +
        this.movieElement.id +
        "/videos?api_key=fbcd4fa2da6095325e48e31d1055afba"
    )
      .then((res) => res.json())
      .then((resJson) => {
        var items = [];
        resJson.results.map((movie) => {
          items.push(
            new Trailer({ key: movie.key, name: movie.name, type: movie.type })
          );
        });

        this.setState({ Trailer: items });
        fetch(
          "http://api.themoviedb.org/3/tv/" +
            this.movieElement.id +
            "/credits?api_key=fbcd4fa2da6095325e48e31d1055afba"
        )
          .then((response) => response.json())
          .then((responseJson) => {
            var casts = [];
            responseJson.cast.map((cast) => {
              casts.push(
                new Cast({
                  id: cast.id,
                  name: cast.name,
                  profile_path: cast.profile_path,
                  character: cast.character,
                })
              );
            });
            this.setState({ castResults: casts });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.modalContainer}>
            <View style={{ width: "100%" }}>
              <YoutubePlayer
                play={true}
                height={300}
                videoId={this.state.activeMovieTrailerKey}
              />
            </View>
          </View>
        </Modal>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.pop()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={"#fff"}
              style={styles.arrowButton}
            ></MaterialCommunityIcons>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => this.favoriteProcess(this.movieElement)}
          >
            <MaterialCommunityIcons
              style={{
                position: "absolute",
                top: Constants.statusBarHeight + 10,
                right: 10,
                zIndex: 1,
                paddingLeft: 20,
                paddingBottom: 20,
              }}
              name={this.state.isFavorite ? "heart" : "heart-outline"}
              size={24}
            ></MaterialCommunityIcons>
          </TouchableWithoutFeedback>
          <Image
            style={styles.poster}
            resizeMode={"contain"}
            source={{
              uri:
                "http://image.tmdb.org/t/p/w500/" +
                this.movieElement.backdrop_path,
            }}
          />
          <View style={{ flex: 1, padding: 20 }}>
            <View style={styles.bottomDiv}>
              <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
                <Text style={styles.title}>{this.movieElement.name}</Text>
                <Text>{"Aired On: " + this.movieElement.first_air_date}</Text>
              </View>

              <View
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "white",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{this.movieElement.vote_average}</Text>
              </View>
            </View>
            <Text style={styles.header}>Overview</Text>
            <Text>{this.movieElement.overview}</Text>
            <Text style={styles.header}>Trailers</Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {this.state.Trailer.map((item) => {
                return (
                  <TrailerItem
                    key={item.key}
                    poster={this.movieElement.backdrop_path}
                    onPressFunction={() =>
                      this.setState({
                        modalVisible: true,
                        activeMovieTrailerKey: item.key,
                      })
                    }
                    modalVisible={this.state.modalVisible}
                    data={item}
                  />
                );
              })}
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text style={[styles.header]}>{"Casts"}</Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate("TVCast", {
                    movieid: this.movieElement.id,
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
                  <Text>{"View All"}</Text>
                  <MaterialCommunityIcons name="chevron-right" size={20} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <ScrollView>
              {this.state.castResults.map((cast, index) => {
                return index < 4 ? (
                  <CastItem cast={cast} key={cast.id} />
                ) : (
                  <View key={cast.id} />
                );
              })}
            </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  poster: {
    width: 500,
    height: 281,
  },
  arrowButton: {
    position: "absolute",
    top: Constants.statusBarHeight,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "50%",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  bottomDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default TVDetail;
