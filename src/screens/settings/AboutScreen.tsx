import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default function AboutScreen() 
{
  return (
    <View 
      style={styles.container}>

      <Text 
        style={styles.title}>OishiiDays
      </Text>

      <Text 
        style={styles.sectionTitle}>About
      </Text>

      <Text 
        style={styles.text}>
        OishiiDays is a simple food journal app. You can save meals on a calendar,
        and optionally add locations to view them on the map.
      </Text>

      <Text 
        style={styles.sectionTitle}>Data
      </Text>

      <Text 
        style={styles.text}>
        Your records are stored locally on this device using AsyncStorage.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create
(
  {
    container: 
    {
      flex:1, 
      padding:16
    },

    title: 
    { 
      fontSize:22, 
      fontWeight: "bold", 
      marginBottom:6 
    },

    sub: 
    {
      color: "#666", 
      marginBottom: 16 
    },

    sectionTitle: 
    { 
      fontWeight: "bold", 
      marginTop: 12, 
      marginBottom:6 },

    text: 
    { 
      lineHeight:20, 
      color: "#333" 
    },
  }
);