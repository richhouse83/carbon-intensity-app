import { Text, View, FlatList, SafeAreaView, Pressable, Switch, Linking, Alert } from "react-native";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
import regionsArray from "./regionsArray";
import { styles } from "../styles/style";
import * as SecureStore from 'expo-secure-store';

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
        saveFilteredRegions(result);
        return result;
      } else {
        const result = [...prev, target];
        saveFilteredRegions(result);
        return result;
      }
    });

  useEffect(() => {
    setIsFilteredArray(regionsArray.map(showFiltered));
  }, [filteredRegions]);

  async function saveFilteredRegions(data) {
    await SecureStore.setItemAsync('saved-data', JSON.stringify(data));
  }

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
      <View style={[styles.creditsHeaderView]}>
          <Text style={[styles.creditsHeaderText]}>Developer Information</Text>
        </View>
        <View style={styles.creditsView}>
          <Text style={styles.sectionTitle}>Built by Rich House</Text>
          <Pressable
            onPress={async () => {
              const url = 'http://richhouse.co.uk'
              const supported = await Linking.canOpenURL(url);

              if (supported) {
                await Linking.openURL(url);
              } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
              }
            }}
          >
            <Text style={[styles.sectionTitle, styles.linkText]}>richhouse.co.uk</Text>
          </Pressable>
          <Pressable
            onPress={async () => {
              const url = 'mailto:info@richhouse.co.uk'
              const supported = await Linking.canOpenURL(url);

              if (supported) {
                await Linking.openURL(url);
              } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
              }
            }}
          >
            <Text style={[styles.sectionTitle, styles.linkText]}>info@richhouse.co.uk</Text>
          </Pressable>
            <Text style={[styles.sectionTitle]}>Makes use of the API from 
            </Text>
              <Pressable
                onPress={async () => {
                  const url = 'https://carbonintensity.org.uk/'
                  const supported = await Linking.canOpenURL(url);

                  if (supported) {
                    await Linking.openURL(url);
                  } else {
                    Alert.alert(`Don't know how to open this URL: ${url}`);
                  }
                }}
              >
            <Text style={[styles.sectionTitle, styles.linkText]}>https://carbonintensity.org.uk/</Text>
              </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

SettingsView.propTypes = {
  filteredRegions: PropTypes.array,
  setFilteredRegions: PropTypes.func,
};
