import React, {useState} from "react";
import {View, Text, Button, Alert, ScrollView, StyleSheet} from "react-native";
import {getFoodRecords, saveFoodRecords} from "../../services/storage";

export default function DataScreen() 
{
  const [exportText, setExportText] = useState("");

  const handleExport = async () => {
    const records = await getFoodRecords();
    setExportText(JSON.stringify(records, null, 2));
    Alert.alert("Export ready", "Scroll down to copy your JSON.");
  };

  const handleClearAll = async () => {
    Alert.alert(
      "Clear all records?",
      "This will permanently delete all food records stored on this device.",
      [
        { 
          text: "Cancel", 
          style: "cancel" 
        },

        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await saveFoodRecords([]);
            setExportText("");
            Alert.alert("Cleared", "All records have been removed.");
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text 
        style={styles.title}>Data
      </Text>

      <View 
        style={styles.section}>
        <Button 
          title="Export Records (JSON)" onPress={handleExport} />
      </View>

      <View 
        style={styles.section}>
        <Button 
          title="Clear All Records" onPress={handleClearAll} />
      </View>

      {!!exportText && (
        <View 
          style={styles.exportBox}>

          <Text 
            style={styles.exportTitle}>Export JSON
          </Text>

          <Text 
            style={styles.exportText}>{exportText}
          </Text>

        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create
(
  {
    container: 
    {
      padding:16
    },

    title: 
    {
      fontSize:20, 
      fontWeight: "bold", 
      marginBottom:12 
    },

    section: 
    { 
      marginBottom: 12 
    },

    exportBox: 
    {
      marginTop:16,
      padding:12,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
    },

    exportTitle: 
    { 
      fontWeight: "bold", 
      marginBottom: 8 
    },

    exportText: 
    { 
      fontFamily: "monospace", 
      fontSize: 12, 
      lineHeight: 16 
    },
 }
);