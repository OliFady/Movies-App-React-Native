import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./app/Pages/Main";
import ViewAll from "./app/Pages/ViewAll";
import MovieDetail from "./app/Pages/MovieDetail";
import CastViewAll from "./app/Pages/CastViewAll";
import TVDetail from "./app/Pages/TVDetail";
import TvViewAll from "./app/Pages/TvViewAll";
import TVCast from "./app/Pages/TVCast";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={{ headerTitle: "" }}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{ title: "MovieDetail" }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAll}
          options={{ title: "ViewAll" }}
        />
        <Stack.Screen
          name="CastViewAll"
          component={CastViewAll}
          options={{ title: "CastViewAll" }}
        />
        <Stack.Screen
          name="TVCast"
          component={TVCast}
          options={{ title: "TVCast" }}
        />
        <Stack.Screen
          name="TVDetail"
          component={TVDetail}
          options={{ title: "TVDetail" }}
        />
        <Stack.Screen
          name="TvViewAll"
          component={TvViewAll}
          options={{ title: "TvViewAll" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
