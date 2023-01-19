import { Text, ScrollView, RefreshControl, SafeAreaView } from "react-native";
import { useEffect, useState, useCallback } from "react";
import getData from "./components/getData";
import { styles } from "./styles/style";
import Swiper from "react-native-swiper";
import RegionalView from "./components/RegionalView";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [generationData, setGenerationData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [centreText, setCentreText] = useState("");
  const [regionsData, setRegionsData] = useState({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCentreText("");
    getData(
      setForecastData,
      setCurrentData,
      setGenerationData,
      setRegionsData,
      setRefreshing
    );
  }, []);

  useEffect(() => {
    setRefreshing(true);
    setCentreText("");
    getData(
      setForecastData,
      setCurrentData,
      setGenerationData,
      setRegionsData,
      setRefreshing
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        contentContainerStyle={refreshing ? null : styles.scrollContainer}
      >
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        {refreshing ? (
          <Text>Getting Data...</Text>
        ) : (
          <Swiper>
            {Object.keys(regionsData)
              .reverse()
              .map((region) => (
                <RegionalView
                  key={region}
                  data={{
                    generationData: regionsData[region]?.pieValues,
                    forecastData,
                    currentData: regionsData[region]?.currentData,
                    region,
                    regionId: regionsData[region]?.regionId
                  }}
                />
              ))}
          </Swiper>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
