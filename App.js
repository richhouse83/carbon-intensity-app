import { Text, ScrollView, RefreshControl, SafeAreaView, View } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import getData from './components/getData';
import { styles } from './styles/style';


export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [generationData, setGenerationData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [centreText, setCentreText] = useState('');

  const updateCentreText = ({ text, value }) => setCentreText(
    centreText === `${text} ${value}%` ? '' : `${text} ${value}%`
    );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCentreText('');
    getData(setForecastData, setCurrentData, setGenerationData, setRefreshing);
  }, []);

  const getTextColour = (index) => {
    return index === 'high'
    ? styles.currentHigh
    : index === 'moderate'
    ? styles.currentModerate
    : styles.currentLow
  }

  useEffect(() => {
    setRefreshing(true);
    setCentreText('');
    getData(setForecastData, setCurrentData, setGenerationData, setRefreshing);
  }, [])


  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={refreshing ? null : styles.scrollContainer}>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        {
          refreshing
          ? <Text>Getting Data...</Text>
          :
          <>
          <View style={styles.currentContainer}>
            <Text style={
              [styles.currentText, getTextColour(currentData.index)]
              }>Current Carbon Intensity is {currentData.index}</Text>
              <Text style={[styles.actual, getTextColour(currentData.index)]}>{currentData.actual}</Text>
              <Text>gCO2/kWh</Text>
          </View>
          <View style={styles.forecastContainer}>
            <Text>24 hr Forecast:</Text>
            <ScrollView style={styles.barChart} horizontal>
                <BarChart
                  barBorderRadius={4}
                  isAnimated
                  data={forecastData}
                />
            </ScrollView>
          </View>
          <View style={styles.generationContainer}>
            <Text>Current Generation</Text>
              <PieChart
                donut
                focusOnPress
                onPress={updateCentreText}
                centerLabelComponent={() => (
                  <Text>{centreText}</Text>
                )}
                data={generationData}
              />
            <Text>Press for Detail</Text>
          </View>
          </>
        }
      </ScrollView>
    </SafeAreaView>
  );
}
