import axios from 'axios';


export default async function getData(setter) {
  const date = new Date(Date.now());
  try {
    const rawData = await axios.get(`https://api.carbonintensity.org.uk/intensity/${date.toISOString()}/fw24h`);
    
    const intensityForecastValues = rawData.data.data.map((obj) => ({ value: obj.intensity.forecast, label: new Date(obj.from).toTimeString().slice(0, 5)}))
    console.log(intensityForecastValues);
    setter(intensityForecastValues);
  } catch(error) {
    console.error(error)
  }
}