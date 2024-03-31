import {
  Text,
  ScrollView,
  View,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { styles } from "../styles/style";
import { getRegionalForecast } from "./getData";

const getTextColour = (index) => {
  return index.includes("high")
    ? styles.currentHigh
    : index === "moderate"
    ? styles.currentModerate
    : styles.currentLow;
};

export function CurrentRegionInfo({region, currentData}) {
  return (
    <View style={styles.currentContainer}>
        <Text>{region}</Text>
        <Text style={[styles.currentText, getTextColour(currentData.index)]}>
          Current Carbon Intensity is {currentData.index}
        </Text>
        <Text style={[styles.actual, getTextColour(currentData.index)]}>
          {currentData.actual ?? currentData.forecast}
        </Text>
        <Text>gCO2/kWh</Text>
    </View>
  )
}

export default function RegionalView({ data, refreshing, onRefresh }) {
  const { currentData, generationData, region, regionId } = data;

  const [centreText, setCentreText] = useState("");
  const [forecastData, setForecastData] = useState([]);

  const updateCentreText = ({ text, value }) =>
    setCentreText(
      centreText === `${text} ${value}%` ? "" : `${text} ${value}%`
    );

  

  useEffect(() => {
    getRegionalForecast(regionId, setForecastData);
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.currentFlex}>
          <CurrentRegionInfo region={region} currentData={currentData} />
        </View>
        <View
          style={
            forecastData.length === 0
              ? styles.forecastLoadingContainer
              : styles.forecastContainer
          }
        >
          {forecastData.length === 0 ? (
            <View>
              <Text style={styles.fetchingText}>Fetching Forecast</Text>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>24 hr Forecast</Text>
              <ScrollView contentContainerstyle={styles.barChart} horizontal>
                <BarChart
                  barBorderRadius={4}
                  // isAnimated
                  data={forecastData}
                  noOfSections={2}
                  height={135}
                  barWidth={35}
                  initialSpacing={15}
                />
              </ScrollView>
            </>
          )}
        </View>
        <View style={styles.generationContainer}>
          <Text style={styles.sectionTitle}>Current Generation</Text>
          <View style={styles.pieChartContainer}>
            <PieChart
              radius={105}
              donut
              focusOnPress
              onPress={updateCentreText}
              centerLabelComponent={() => <Text>{centreText}</Text>}
              data={generationData}
            />
          </View>
          <Text>Press for Detail</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

CurrentRegionInfo.propTypes = {
  region: PropTypes.string,
  currentData: PropTypes.shape({
    index: PropTypes.string,
    forecast: PropTypes.number,
    actual: PropTypes.number,
  }).isRequired, 
}

RegionalView.propTypes = {
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  data: PropTypes.shape({
    currentData: PropTypes.shape({
      index: PropTypes.string,
      forecast: PropTypes.number,
      actual: PropTypes.number,
    }).isRequired,
    forecastData: PropTypes.array,
    generationData: PropTypes.array,
    region: PropTypes.string,
    regionId: PropTypes.number,
  }),
};
