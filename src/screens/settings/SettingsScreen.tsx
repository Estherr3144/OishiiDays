import React from "react";
import {View, Text, Button, StyleSheet, Alert, TouchableOpacity} from "react-native";
import {UI} from "../../styles/UI";

export default function SettingsScreen({ navigation }: any) 
{
  return (
    <View 
      style={styles.container}>

    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("About")}
    >

    <Text 
      style={styles.cardText}>ℹ️ About
    </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Privacy")}
    >
    <Text 
      style={styles.cardText}>🔒 Privacy & Permissions
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("Terms")}
  >

    <Text 
      style={styles.cardText}>📜 Terms of Service
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("Data")}
  >
    <Text 
      style={styles.cardText}>💾 Data (Export / Clear)
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.card, styles.dangerCard]}
    onPress={() =>
      Alert.alert(
        "Delete account",
        "This app stores data locally. To delete data, please use Data > Clear All Records."
      )
    }
  >
    <Text 
      style={styles.dangerText}>🗑 Delete Account
    </Text>
  </TouchableOpacity>

</View>
  );
}

const styles = StyleSheet.create
(
  {
    container: 
    {
      flex:1,
      padding: UI.spacing.l,
      backgroundColor: UI.colors.background,
    },

    card: 
    {
      backgroundColor: UI.colors.card,
      padding: UI.spacing.m,
      borderRadius: UI.radius.l,
      marginBottom: UI.spacing.m,
      borderWidth: 1,
      borderColor: UI.colors.border,
      ...UI.shadow,
    },

    cardText:
    {
      fontSize: 16,
      color: UI.colors.text,
      fontWeight: "600",
    },

    dangerCard: 
    {
      borderColor: UI.colors.danger,
    },

    dangerText: 
    {
      color: UI.colors.danger,
      fontWeight: "600",
    },
  }
);