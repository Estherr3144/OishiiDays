import React, {useEffect, useState} from "react";
import {View, Text, FlatList, Button, StyleSheet} from "react-native";
import {getFoodRecords} from "../../services/storage";
import {FoodRecord} from "../../types/FoodRecord";
import {UI} from "../../styles/UI";

export default function SelectRecordScreen({navigation}: any) 
{
  const [records, setRecords] = useState<FoodRecord[]>([]);
  const [showOnlyMissing, setShowOnlyMissing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadRecords();
    });

    return unsubscribe;
  }, 
  
  [navigation]);

  const loadRecords = async () => {
    const data = await getFoodRecords();

    const sorted = [...data].sort((a, b) => {
      const aHas = !!(a.locationName || (a.latitude && a.longitude));
      const bHas = !!(b.locationName || (b.latitude && b.longitude));

      if (aHas === bHas) return b.createdAt - a.createdAt;
      return aHas ? 1 : -1;
    });

    setRecords(sorted);
  };

  const renderItem = ({item}: {item: FoodRecord}) => {
    const hasLocation = !!(item.locationName || (item.latitude && item.longitude));

    return (
      <View 
        style={styles.card}>

      <Text 
        style={styles.dateText}>📅 {item.date}</Text>

      <Text 
        style={styles.categoryText}> 🍽 {item.category}
      </Text>

  {hasLocation ? (
    <Text style={styles.locationAdded}>
      📍 {item.locationName || "Location added"}
    </Text>
  ) : (
    <Text style={styles.locationEmpty}>
      ⚠ No location yet
    </Text>
  )}

  <View style={styles.buttonWrap}>
    <Button
      title={hasLocation ? "Update Location" : "Add Location"}
      onPress={() =>
        navigation.navigate("AddLocation", {recordId: item.id})
      }
    />
  </View>

</View>
    );
  };

  const filteredRecords = showOnlyMissing
    ? records.filter((r) => !(r.locationName || (r.latitude && r.longitude)))
    : records;

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <Button
          title={showOnlyMissing ? "Show All" : "Show Missing Locations"}
          onPress={() => setShowOnlyMissing((v) => !v)}
        />
      </View>

      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}

        ListEmptyComponent=
        {
        <Text 
          style={styles.emptyText}>No records found
        </Text>}
      />
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

    filterRow: 
    {
      marginBottom: UI.spacing.m,
    },

    card: 
    {
      backgroundColor: UI.colors.card,
      padding: UI.spacing.m,
      marginBottom: UI.spacing.m,
      borderRadius: UI.radius.l,
      borderWidth:1,
      borderColor: UI.colors.border,
      ...UI.shadow,
    },

    dateText: 
    {
      ...UI.text.subtitle,
      marginBottom: 4,
    },

    categoryText: 
    {
      color: UI.colors.text,
      marginTop: 4,
    },

    locationAdded: 
    {
      marginTop: 6,
      color: UI.colors.primaryDark,
    },

    locationEmpty: 
    {
      marginTop: 6,
      color: UI.colors.subtext,
    },

    buttonWrap: 
    {
      marginTop: UI.spacing.s,
    },

    emptyText:
    {
      color: UI.colors.subtext,
      textAlign: "center",
      marginTop:24,
    },
  }
);