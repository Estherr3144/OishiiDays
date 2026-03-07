import React, {useState} from "react";
import {View, Text, TextInput, Button, Image, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Picker} from "@react-native-picker/picker";
import {saveFoodRecord, updateFoodRecord} from "../../services/storage";
import {FoodRecord, FoodCategory} from "../../types/FoodRecord";
import {UI} from "../../styles/UI";

export default function AddFoodScreen({navigation, route}: any) 
{
  const editRecord = route?.params?.editRecord;

  const selectedDate =
    editRecord?.date ||
    route?.params?.date ||
    new Date().toISOString().split("T")[0];

  const [imageUri, setImageUri] = useState<string | null>(
    editRecord?.imageUri || null
  );

  const [note, setNote] = useState(editRecord?.note || "");

  const [category, setCategory] = useState<FoodCategory>(
    editRecord?.category || "Lunch"
  );

  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(
    {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) 
    {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);

    try {
      if (editRecord) 
        {

        await updateFoodRecord
        (
          {
            ...editRecord,
            imageUri: imageUri ?? undefined,
            note,
            category,
          }
       );

        Alert.alert("Updated!");

      } 
      
      else 
      {

        const newRecord: FoodRecord = 
        {
          id: Date.now().toString(),
          date: selectedDate,
          imageUri: imageUri ?? undefined,
          note,
          category,
          createdAt: Date.now(),
        };

        await saveFoodRecord(newRecord);

        Alert.alert("Saved!");
      }

      navigation.goBack();

    } 
    
    finally 
    {
      setSaving(false);
    }

  };

  return (
    <KeyboardAvoidingView
      style={{flex:1}}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.date}>Date:{selectedDate}</Text>
        <View style={styles.buttonWrap}>
          <Button 
          title="Select Food Image " 
          onPress={pickImage} 
          />
        </View>

        {imageUri && (
          <Image source={{uri:imageUri}} style={styles.image} />
        )}

        <TextInput
          placeholder="Food note..."
          style={styles.input}
          value={note}
          onChangeText={setNote}
        />

        <Text 
          style={styles.sectionTitle}>Category
        </Text>

        <Picker
          selectedValue={category}
          onValueChange=
          {
            (value) =>
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

        <View style={styles.saveButton}>

        <Button 
          title="Save Food Record" 
          onPress={handleSave} 
        />

</View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create
(
  {
    container: 
    {
      padding:UI.spacing.l,
      backgroundColor: UI.colors.background,
    },

    date: 
    {
      ...UI.text.subtitle,
      marginBottom: UI.spacing.m,
    },

    sectionTitle: 
    {
      fontWeight:"600",
      marginTop: UI.spacing.s,
      marginBottom: 4,
      color: UI.colors.primaryDark,
    },

    buttonWrap: 
    {
      marginBottom: UI.spacing.m,
    },

    image: 
    {
      width: "100%",
      height: 220,
      marginVertical: UI.spacing.s,
      borderRadius: UI.radius.l,
    },

    input: 
    {
      borderWidth:1,
      borderColor: UI.colors.border,
      padding: UI.spacing.s,
      marginVertical: UI.spacing.s,
      borderRadius: UI.radius.m,
      backgroundColor: UI.colors.card,
    },

    saveButton: 
    {
      marginTop: UI.spacing.l,
    },

 }
);