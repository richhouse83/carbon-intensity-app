import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    centerContent: true,
  },
  settingsContainer: {
    height: '100%',
  },
  currentFlex:{
    borderBottomColor: "slategrey",
    borderBottomWidth: 1,
  },
  currentContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  currentHigh: {
    color: "red",
  },
  currentModerate: {
    color: "orange",
  },
  currentLow: {
    color: "lightgreen",
  },
  safeContainer: {
    height: '100%',
    backgroundColor: "#fff",
  },
  safeMapContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    backgroundColor: "#fff",
  },
  forecastContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    // justifyContent: "space-between",
    borderBottomColor: "slategrey",
    borderBottomWidth: 1,
  },
  forecastLoadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomColor: "slategrey",
    borderBottomWidth: 1,
  },
  generationContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barChartView: {
    alignItems: "center",
  },
  barChart: {
    paddingVertical: 20,
  },
  currentText: {
    fontSize: 20,
    paddingBottom: '2%',
  },
  actual: {
    fontSize: 50,
    fontWeight: "bold",
    paddingBottom: '2%',
  },
  sectionTitle: {
    fontSize: 20,
    paddingBottom: 25,
  },
  pieChartContainer: {
    paddingLeft: 24,
  },
  highlight: {
    borderWidth: 1,
    borderColor: "red",
  },
  regionText: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  pressableText: {
    fontSize: 20,
  },
  pressableFilteredText: {
    fontSize: 20,
    color: 'lightgrey'
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: 'slategrey',
    padding: 15,
  },
  settingsHeaderView: {
    flex: 1,
    alignContent: "center",
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  settingsHeaderText: {
    textAlign: 'center',
    fontSize: 25,
  },
  mapContainer: {
    flex: 4,
    backgroundColor: "#fff",
    centerContent: true,
  },
  mapView: {
    flex: 2,
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 4,
  },
  mapInfoView: {
    flex: 1,
    zIndex: 5,
    justifyItems: 'center',
    marginTop: '4%',
  },
  noSelectedRegionView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditsHeaderView: {
    flex: 1,
    alignContent: "center",
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  creditsHeaderText: {
    textAlign: 'center',
    fontSize: 25,
  },
  creditsScrollView: {
    flex: 4,
  },
  creditsView: {
    padding: '4%',
    alignItems: 'center',
  },
  buttonWrapperStyle: {
    paddingTop: '22%',
    alignItems: 'flex-start'
  },
  fetchingText: {
    marginBottom: '4%',
  },
  linkText: {
    color: 'darkblue',
  },
  flatListView: {
    flex: 4,
  },
});
