import { Text } from "react-native";
import axios from "axios";

export default async function getData(
  setForecast,
  setCurrent,
  setGeneration,
  setRegionsData,
  setRefreshing
) {
  const date = new Date(Date.now());
  setForecast([]);
  setGeneration([]);
  try {
    const forecastRaw = await axios.get(
      `https://api.carbonintensity.org.uk/intensity/${date.toISOString()}/fw24h`
    );
    const currentData = await axios.get(
      "https://api.carbonintensity.org.uk/intensity"
    );
    const generationData = await axios.get(
      "https://api.carbonintensity.org.uk/generation"
    );
    const regionalRaw = await axios.get(
      "https://api.carbonintensity.org.uk/regional"
    );

    const regions = {};

    regionalRaw.data.data[0].regions.forEach((region) => {
      regions[region.shortname] = {
        pieValues: region.generationmix
        .filter(({ perc }) => perc > 0)
        .map(({ fuel, perc }) => ({
          value: perc,
          text: fuel.replace(/^./, (c) => c.toUpperCase()),
          color: generationColours[fuel],
        })),
        currentData: region.intensity,
        ready: true,
        regionId: region.regionid
      }
    });

    const intensityForecastValues = forecastRaw.data.data
      .filter((obj, index) => index % 2)
      .map((obj) => {
        const value = obj.intensity.forecast;
        const label = new Date(obj.from).toTimeString().slice(0, 5);
        const frontColor = getColour(value);
        const topLabelComponent = () => (
          <Text style={{ color: frontColor, fontSize: 18, marginBottom: 6 }}>
            {value}
          </Text>
        );
        return {
          value,
          label,
          frontColor,
          topLabelComponent,
        };
      });

    const pieValues = generationData.data.data.generationmix
      .filter(({ perc }) => perc > 0)
      .map(({ fuel, perc }) => ({
        value: perc,
        text: fuel.replace(/^./, (c) => c.toUpperCase()),
        color: generationColours[fuel],
      }));

    setForecast(intensityForecastValues);
    setCurrent(currentData.data.data[0].intensity);
    setGeneration(pieValues);
    setRegionsData(regions);
    setRefreshing(false);
  } catch (error) {
    console.error(error);
  }
}

const getColour = (value) => {
  return value > 200
    ? "darkred"
    : value > 180
    ? "red"
    : value > 150
    ? "darkorange"
    : value > 120
    ? "orange"
    : value > 100
    ? "gold"
    : value > 80
    ? "forestgreen"
    : "lightgreen";
};

const generationColours = {
  wind: "lightskyblue",
  biomass: "darkolivegreen",
  coal: "darkgrey",
  nuclear: "goldenrod",
  imports: "pink",
  solar: "gold",
  hydro: "aqua",
  other: "grey",
  gas: "aquamarine",
};

export const getRegionalForecast = async (regionId, setForecastData) => {
  const date = new Date(Date.now());

  try {
    const regionalForecastRaw = await axios.get(`https://api.carbonintensity.org.uk/regional/intensity/${date.toISOString()}/fw24h/regionid/${regionId}`);

    const intensityForecastValues = regionalForecastRaw.data.data.data
      .filter((obj, index) => index % 2)
      .map((obj) => {
        const value = obj.intensity.forecast;
        const label = new Date(obj.from).toTimeString().slice(0, 5);
        const frontColor = getColour(value);
        const topLabelComponent = () => (
          <Text style={{ color: frontColor, fontSize: 18, marginBottom: 6 }}>
            {value}
          </Text>
        );
        return {
          value,
          label,
          frontColor,
          topLabelComponent,
        };
      });

    setForecastData(intensityForecastValues)
  } catch (error) {
    console.error(error);
  }
}
