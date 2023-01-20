import Swiper from "react-native-swiper";
import RegionalView from "./RegionalView";
import PropTypes from "prop-types";

export default function MappedRegions ({regionsData}) {
  return (
    <Swiper showsPagination={false}>
            {Object.keys(regionsData)
              .reverse()
              .map((region) => (
                <RegionalView
                  key={region}
                  data={{
                    generationData: regionsData[region]?.pieValues,
                    currentData: regionsData[region]?.currentData,
                    region,
                    regionId: regionsData[region]?.regionId
                  }}
                />
              ))}
          </Swiper>
  )
}

MappedRegions.propTypes = {
  regionsData: PropTypes.object
};