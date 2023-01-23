import { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import getData from "./components/getData";
import MainView from "./components/MainView";
import regionsArray from "./components/regionsArray";
import SettingsView from "./components/SettingsView";
import CIMapView from './components/CIMapView';

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [regionsData, setRegionsData] = useState({});
  const [filteredRegions, setFilteredRegions] = useState(regionsArray);

  const Tab = createBottomTabNavigator();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData(setRegionsData, setRefreshing);
  }, []);

  useEffect(() => {
    setRefreshing(true);
    getData(setRegionsData, setRefreshing);
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "pie-chart"
                : "pie-chart-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            } else if (route.name === "Map") {
              iconName = "map"
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home">
          {(props) => (
            <MainView
              {...props}
              onRefresh={onRefresh}
              refreshing={refreshing}
              regionsData={regionsData}
              regionsArray={regionsArray.filter((region) =>
                filteredRegions.includes(region)
              )}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Map">
        {(props) => (
            <CIMapView {...props} regionsData={regionsData} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {(props) => (
            <SettingsView
              {...props}
              filteredRegions={filteredRegions}
              setFilteredRegions={setFilteredRegions}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
