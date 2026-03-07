import React from "react";
import {ScrollView, Text, StyleSheet} from "react-native";

export default function TermsScreen() 
{
  return (
    <ScrollView 
      contentContainerStyle={styles.container}>

      <Text 
        style={styles.title}>Terms of Service
      </Text>

      <Text 
        style={styles.text}>
        OishiiDays is a personal food journal app. You are responsible for the
        content you save. Location features are optional and require device
        permissions.
      </Text>

      <Text 
        style={styles.text}>
        Data is stored locally on your device (AsyncStorage). Uninstalling the
        app or clearing data will remove your records.
      </Text>

      <Text 
        style={styles.text}>
        This app is created for educational purposes.
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

    text: 
    { 
      marginBottom: 12, 
      lineHeight: 20 
    },
  }
);