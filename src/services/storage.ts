import AsyncStorage from "@react-native-async-storage/async-storage";
import { FoodRecord } from "../types/FoodRecord";

const STORAGE_KEY = "FOOD_RECORDS";


export const getFoodRecords = async (): Promise<FoodRecord[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    console.error("Error getting records", error);
    return [];
  }
};


const saveFoodRecords = async (records: FoodRecord[]) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(records)
    );
  } catch (error) {
    console.error("Error saving records", error);
  }
};


export const addFoodRecord = async (
  record: FoodRecord
) => {
  const records = await getFoodRecords();

  records.push(record);

  await saveFoodRecords(records);
};


export const updateFoodRecord = async (
  updated: FoodRecord
) => {
  const records = await getFoodRecords();

  const newRecords = records.map(r =>
    r.id === updated.id ? updated : r
  );

  await saveFoodRecords(newRecords);
};


export const deleteFoodRecord = async (id: string) => {
  const records = await getFoodRecords();

  const newRecords = records.filter(r => r.id !== id);

  await saveFoodRecords(newRecords);
};