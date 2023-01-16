import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import getData from './components/getData';


export default function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getData(setData);
  }, [])
  

  return (
    <View style={styles.container}>
      <LineChart data = {data} />
      <Text>Start</Text>
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
