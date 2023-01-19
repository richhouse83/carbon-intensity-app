import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  currentContainer: {
    flex: 0.4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: 'slategrey',
    borderBottomWidth: 1,
  },
  currentHigh: {
    color: "red",
  },
  currentModerate: {
    color: "black",
  },
  currentLow: {
    color: "lightgreen",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    centerContent: true,
  },
  forecastContainer: {
    flex: 0.9,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: 'slategrey',
    borderBottomWidth: 1,
  },
  generationContainer: {
    flex: 0.9,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barChart: {
    flex: 2,
    paddingTop: 20,
  },
  currentText: {
    fontSize: 20,
  },
  actual: {
    fontSize: 50,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    paddingBottom: 7,
    paddingTop: 5,
  },
  pieChartContainer: {
    paddingLeft: 24,
  },
  highlight: {
    borderWidth: 1,
    borderColor: 'red',
  }
});
