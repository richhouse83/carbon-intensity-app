import { SafeAreaView, View } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import PropTypes from "prop-types";
import { styles } from "../styles/style";
import regions from "../geojson/regions.json";

export default function CIMapView({ regionsData }) {
  const features = regions.features.map((region) => ({
    features: [region],
    regionName: regionIds[region.properties.regionid],
    regionId: region.properties.regionid
  })).filter(({regionId}) => regionId <= 14);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <MapView style={styles.map}>
          {features.map((region) => (
            <Geojson
              key={region.features[0].properties.regionid}
              geojson={region}
              fillColor={
                colorMap[regionsData[region.regionName].currentData.index]
              }
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const colorMap = {
  "very high": "#C00500",
  high: "#FF0B04",
  moderate: "#FFB22A",
  low: "#00EC0B",
  "very low": "#7FFF88",
};

const regionIds = {
  1: "North Scotland",
  2: "South Scotland",
  3: "North West England",
  4: "North East England",
  5: "Yorkshire",
  6: "North Wales & Merseyside",
  7: "South Wales",
  8: "West Midlands",
  9: "East Midlands",
  10: "East England",
  11: "South West England",
  12: "South England",
  13: "London",
  14: "South East England",
  15: "England",
  16: "Scotland",
  17: "Wales",
  18: "GB",
};

CIMapView.propTypes = {
  regionsData: PropTypes.object,
};
