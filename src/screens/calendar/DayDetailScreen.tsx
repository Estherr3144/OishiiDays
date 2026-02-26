import React, { useEffect, useState } from "react";
import 
{
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import { getFoodRecords } from "../../services/storage";
import { FoodRecord } from "../../types/FoodRecord";

export default function DayDetailScreen({ route }: any) 
{

  const { date } = route.params;

  const [records, setRecords] = useState<FoodRecord[]>([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const allRecords = await getFoodRecords();

    const filtered = allRecords.filter(
      record => record.date === date
    );

    setRecords(filtered);
  };

  const renderItem = ({ item }: { item: FoodRecord }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />

      <Text style={styles.category}>{item.category}</Text>

      <Text>{item.note}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{date}</Text>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text>No food recorded.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create(
{
  container: 
  {
    flex: 1,
    padding: 16,
  },

  title: 
  {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  card: 
  {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
  },

  image: 
  {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },

  category: 
  {
    fontWeight: "bold",
  },
});