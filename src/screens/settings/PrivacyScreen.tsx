import React from "react";
import {ScrollView, Text, StyleSheet} from "react-native";

export default function PrivacyScreen() 
{
  return (
    <ScrollView 
      contentContainerStyle={styles.container}>

      <Text 
        style={styles.title}>Privacy & Permissions
      </Text>

      <Text 
        style={styles.sectionTitle}>Photos
      </Text>

      <Text 
        style={styles.text}>
        If you choose to add a photo, it is used to display your food record in the calendar
        and day detail screens.
      </Text>

      <Text 
        style={styles.sectionTitle}>Location (Optional)
      </Text>

      <Text 
        style={styles.text}>
        If you add a location, it is used to place a marker on the map. Location is optional.
      </Text>

      <Text 
        style={styles.sectionTitle}>No Cloud Upload
      </Text>

      <Text 
        style={styles.text}>
        This app stores your data locally on your device. It does not upload your records to a server.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create
(
  {
    container: 
    { 
      padding: 16 
    },

    title: 
    { 
      fontSize: 20, 
      fontWeight: "bold", 
      marginBottom: 12 
    },

    sectionTitle: 
    { 
      fontWeight: "bold", 
      marginTop: 12, 
      marginBottom: 6 
    },

    text: 
    { 
      marginBottom: 8, 
      lineHeight: 20, 
      color: "#333" 
    },
  }
);