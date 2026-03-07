import React, {useState, useLayoutEffect} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {useCallback} from "react";
import {View, Text, StyleSheet, FlatList, Image, Button, Alert} from "react-native";
import {getFoodRecords, deleteFoodRecord} from "../../services/storage";
import {FoodRecord} from "../../types/FoodRecord";
import {UI} from "../../styles/UI";

export default function DayDetailScreen({route, navigation}: any)
{
  const {date} = route.params;

  useLayoutEffect(() => {
  navigation.setOptions
  (
    {
      headerRight: () => (
        <Button
          title="+"
          onPress={() => navigation.navigate("AddFood", {date})}
        />
      ),
    }
  );
}, [navigation, date]);

  const [records, setRecords] = useState<FoodRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [date])
  );

  const loadRecords = async () => {
    const allRecords = await getFoodRecords();

   const filtered = allRecords
  .filter(record => record.date === date)
  .sort((a, b) => a.createdAt - b.createdAt);

    setRecords(filtered);
  };

  const handleDelete = async (id:string) => {
  Alert.alert(
    "Delete Record",
    "Do you really want to delete this record?",
    [
      {text:"Cancel", 
       style:"cancel"
      },

      {
        text:"Delete",
        style:"destructive",
        onPress: async () => {
          await deleteFoodRecord(id);
          loadRecords(); 
        },
      },
    ]
  );
};

  const renderItem = ({ item }: {item: FoodRecord}) => (
  <View style={styles.card}>
    {item.imageUri && (
      <Image source={{uri: item.imageUri}} style={styles.image} />
    )}

    <Text style={styles.category}>{item.category}</Text>

    {item.locationName ? (
      <Text style={styles.location}>📍 {item.locationName}</Text>
    ) : (
      <Text style={styles.locationEmpty}>No location saved</Text>
    )}

    {item.note ? (
      <Text>{item.note}</Text>
    ) : (
      <Text style={styles.noteEmpty}>No note</Text>
    )}

    <View style={styles.actions}>
      <Button
        title="Edit"
        onPress={() =>
          navigation.navigate("AddFood", {
            editRecord: item,
          })
        }
      />

      <Button
        title="Delete"
        color="red"
        onPress={() => handleDelete(item.id)}
      />
    </View>
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{date}</Text>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent=
        {
          <Text style=
          {
            { 
              textAlign: "center", 
              color: UI.colors.subtext 
            }
          }>
            No food record yet 
          </Text>
        }
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

    title: 
    {
      ...UI.text.title,
      marginBottom: UI.spacing.m,
    },

    card: 
    {
      backgroundColor: UI.colors.card,
      padding: UI.spacing.m,
      marginBottom: UI.spacing.m,
      borderRadius: UI.radius.l,
      borderWidth: 1,
      borderColor: UI.colors.border,
      ...UI.shadow,
    },

    image: 
    {
      width: "100%",
      height: 200,
      borderRadius: UI.radius.m,
      marginBottom: UI.spacing.s,
    },

    category: 
    {
      ...UI.text.subtitle,
      marginBottom: 4,
    },

    location: 
    {
      marginTop: 4,
      marginBottom: 4,
      color: UI.colors.primaryDark,
      fontWeight: "500",
    },

    locationEmpty: 
    {
      marginTop: 4,
      marginBottom: 4,
      color: UI.colors.subtext,
    },

    noteEmpty: 
    {
      color: UI.colors.subtext,
      fontStyle: "italic",
    },

    actions: 
    {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: UI.spacing.s,
    },

  }
);