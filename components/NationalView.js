import {
  Text,
  ScrollView,
  View,
} from "react-native";

import PropTypes from 'prop-types';

import { BarChart, PieChart } from "react-native-gifted-charts";

import { styles } from "../styles/style";

export default function NationalView ({ data }) {
  const {currentData, forecastData, generationData, centreText, updateCentreText} = data;

  const getTextColour = (index) => {
    return index === "high"
      ? styles.currentHigh
      : index === "moderate"
      ? styles.currentModerate
      : styles.currentLow;
  };

  return (
    <View style={styles.container}>
    <Text>National</Text>
  <View style={styles.currentContainer}>
    <Text
      style={[styles.currentText, getTextColour(currentData.index)]}
    >
      Current Carbon Intensity is {currentData.index}
    </Text>
    <Text style={[styles.actual, getTextColour(currentData.index)]}>
      {currentData.actual ?? currentData.forecast}
    </Text>
    <Text>gCO2/kWh</Text>
  </View>
  <View style={styles.forecastContainer}>
    <Text style={styles.sectionTitle}>24 hr Forecast:</Text>
    <ScrollView style={styles.barChart} horizontal>
      <BarChart
      barBorderRadius={4}
      isAnimated data={forecastData}
      noOfSections={2}
      height={125}
      barWidth={30}
      initialSpacing={15}
      />
    </ScrollView>
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
  </View>
  )
}

NationalView.propTypes = {
  data: PropTypes.shape({
    currentData: PropTypes.shape({
      index: PropTypes.string,
      forecast: PropTypes.number,
      actual: PropTypes.number
    }).isRequired,
    forecastData: PropTypes.array,
    generationData: PropTypes.array,
    centreText: PropTypes.string,
    updateCentreText: PropTypes.func,
  })
}