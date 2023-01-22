import { Text, View, FlatList, SafeAreaView, Pressable, Switch } from "react-native";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
import regionsArray from "./regionsArray";
import { styles } from "../styles/style";

export default function SettingsView({ filteredRegions, setFilteredRegions }) {
  const showFiltered = (region) => {
    const isFiltered = !filteredRegions.includes(region);
    return {
      region,
      isFiltered,
      icon: isFiltered ? "close" : "checkmark",
      colour: isFiltered ? "lightgrey" : "black",
      style: isFiltered ? styles.pressableFilteredText : styles.pressableText,
    };
  };
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
        <View style={[styles.settingsHeaderView]}>
          <Text style={[styles.settingsHeaderText]}>Select Regions To View</Text>
        </View>
        <FlatList
          data={isFilteredArray.map(({ region, isFiltered, colour, style, icon }) => ({
            key: region,
            isFiltered,
            colour,
            style,
            icon
          }))}
          renderItem={({ item }) => (
            <Pressable onPress={() => changeFilter(item.key)}>
              <View style={styles.selectContainer}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={item.colour}
                />
                <Text
                  style={
                    item.style
                  }
                >
                  {item.key}
                </Text>
                <Switch value={!item.isFiltered} onValueChange={() => changeFilter(item.key)}/>
              </View>
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
