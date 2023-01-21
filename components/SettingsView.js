import { Text, View, FlatList, SafeAreaView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import regionsArray from "./regionsArray";
import { styles } from "../styles/style";

export default function SettingsView({ filteredRegions, setFilteredRegions }) {
  const showFiltered = (region) => ({
    region,
    isFiltered: !filteredRegions.includes(region),
  });
  const [isFilteredArray, setIsFilteredArray] = useState(
    regionsArray.map(showFiltered)
  );

  const changeFilter = (target) =>
    setFilteredRegions((prev) => {
      if (prev.includes(target)) {
        const result = prev.filter((item) => item !== target);
        return result;
      } else {
        const result = [...prev, target];
        return result;
      }
    });

  useEffect(() => {
    setIsFilteredArray(regionsArray.map(showFiltered));
  }, [filteredRegions]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <FlatList
          data={isFilteredArray.map(({ region, isFiltered }) => ({
            key: region,
            isFiltered,
          }))}
          renderItem={({ item }) => (
            <Pressable onPress={() => changeFilter(item.key)}>
              <Text
                style={
                  item.isFiltered
                    ? styles.pressableFilteredText
                    : styles.pressableText
                }
              >
                {item.key}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

SettingsView.propTypes = {
  filteredRegions: PropTypes.array,
  setFilteredRegions: PropTypes.func,
};
