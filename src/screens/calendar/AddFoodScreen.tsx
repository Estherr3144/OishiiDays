
import React, { useState } from "react";
import 
{
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

import { saveFoodRecord } from "../../services/storage";
import { FoodRecord } from "../../types/FoodRecord";
import { FoodCategory } from "../../types/FoodRecord";



export default function AddFoodScreen({ navigation, route }: any) 
{

  const selectedDate =
    route?.params?.date ||
    new Date().toISOString().split("T")[0];

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [category, setCategory] =
  useState<FoodCategory>("Lunch");
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  if (!result.canceled) {
    setImageUri(result.assets[0].uri);
  }
};
const handleSave = async () => {

  if (saving) return;
  setSaving(true);

  try {

    const newRecord: FoodRecord = {
      id: Date.now().toString(),
      date: selectedDate,
      imageUri: imageUri ?? undefined,
      note,
      category,
      createdAt: Date.now(),
    };

    await saveFoodRecord(newRecord);

    setNote("");
    setImageUri(null);
    setCategory("Lunch");

    Alert.alert("Saved!");

    navigation.goBack();

  } finally {
    setSaving(false);
  }
};

  return (
    <View style={styles.container}>

      <Text style={styles.date}>Date: {selectedDate}</Text>

      <Button title="Select Food Image" onPress={pickImage} />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      <TextInput
        placeholder="Food note..."
        style={styles.input}
        value={note}
        onChangeText={setNote}
      />

     <Text>Category</Text>

<Picker
  selectedValue={category}
  onValueChange={(value) =>
    setCategory(value as FoodCategory)
  }
>
  <Picker.Item label="Breakfast" value="Breakfast" />
  <Picker.Item label="Lunch" value="Lunch" />
  <Picker.Item label="Dinner" value="Dinner" />
  <Picker.Item label="Snack" value="Snack" />
  <Picker.Item label="Cafe" value="Cafe" />
  <Picker.Item label="Other" value="Other" />
</Picker>

      <Button title="Save Food Record" onPress={handleSave} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  date: {
    fontSize: 16,
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: 220,
    marginVertical: 12,
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
});