import { Text } from "react-native";
import Swiper from "react-native-swiper";
import PropTypes from "prop-types";
import RegionalView from "./RegionalView";

export default function MappedRegions(props) {
  const { regionsData, onRefresh, refreshing, regionsArray } = props;
  return (
    <Swiper showsPagination={false}>
      {regionsArray.map((region) => {
        if (regionsData[region]?.ready)
          return (
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
