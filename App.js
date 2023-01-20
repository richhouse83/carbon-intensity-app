import { Text, ScrollView, RefreshControl, SafeAreaView } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { styles } from "./styles/style";
import MappedRegions from "./components/MappedRegions";
import getData from "./components/getData";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [regionsData, setRegionsData] = useState({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData(
      setRegionsData,
      setRefreshing
    );
  }, []);

  useEffect(() => {
    setRefreshing(true);
    getData(
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
          <MappedRegions regionsData={regionsData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
