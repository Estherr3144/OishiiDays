import React, { useEffect, useState } from "react";
import 
{
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import { getFoodRecords } from "../../services/storage";
import { FoodRecord } from "../../types/FoodRecord";

export default function SelectRecordScreen({ navigation }: any) 
{
  const [records, setRecords] = useState<FoodRecord[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadRecords();
    });
    return unsubscribe;
  }, [navigation]);

  const loadRecords = async () => {
    const data = await getFoodRecords();
    setRecords(data);
  };

  const renderItem = ({ item }: { item: FoodRecord }) => (
    <View style={styles.card}>
      <Text>{item.date}</Text>

      {item.locationName ? (
        <Text style={styles.location}>{item.locationName}</Text>
      ) : (
        <Text style={styles.locationEmpty}>No location yet</Text>
      )}

      <Text>{item.category}</Text>
      <Button
        title="Add Location"
        onPress={() =>
          navigation.navigate("AddLocation", { recordId: item.id })
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { 
    flex: 1, 
    padding: 16 
  },

  card: 
  {
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
  },

  location: 
  { 
    marginTop: 6 
  },

 locationEmpty: 
 { marginTop: 6, 
  color: "#666" 
 },
});