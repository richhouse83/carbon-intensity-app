import { Text, ScrollView, RefreshControl } from "react-native";
import Swiper from "react-native-swiper";
import PropTypes from "prop-types";
import RegionalView from "./RegionalView";
import { styles } from "../styles/style";

export default function MappedRegions(props) {
  const { regionsData, onRefresh, refreshing, regionsArray } = props;
  return (
    <Swiper showsPagination={false} showsButtons={true} buttonWrapperStyle={styles.buttonWrapperStyle}>
      {regionsArray.map((region) => {
        if (regionsData[region]?.ready)
          return (
            <ScrollView
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
              <RegionalView
                key={region}
                data={{
                  generationData: regionsData[region]?.pieValues,
                  currentData: regionsData[region]?.currentData,
                  region,
                  regionId: regionsData[region]?.regionId,
                }}
                onRefresh={onRefresh}
                refreshing={refreshing}
              />
            </ScrollView>
          );
        else return <Text key={region}>No current data for {region}</Text>;
      })}
    </Swiper>
  );
}

MappedRegions.propTypes = {
  regionsData: PropTypes.object,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  regionsArray: PropTypes.array,
};
