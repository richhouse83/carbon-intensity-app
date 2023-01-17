import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import getData from './components/getData';


export default function App() {
  const [forecastData, setForecastData] = useState([]);
  const [generationData, setGenerationData] = useState([])
  const [currentData, setCurrentData] = useState({});

  
  useEffect(() => {
    getData(setForecastData, setCurrentData, setGenerationData);
  }, [])
  

  return (
    <View style={styles.container}>
      <Text>Current Carbon Intensity is {currentData.index}</Text>
      <Text>24 hr Forecast:</Text>
      <BarChart data={forecastData} />
      <PieChart donut showText focusOnPress textColor="slategrey" data={generationData} textSize={15}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
