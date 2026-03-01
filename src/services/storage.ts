import AsyncStorage from "@react-native-async-storage/async-storage";
import { FoodRecord } from "../types/FoodRecord";

const STORAGE_KEY = "FOOD_RECORDS";

export const getFoodRecords = async (): Promise<FoodRecord[]> => {
  try 
  {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } 
  
  catch (error) 
  {
    console.error("Error getting records", error);
    return [];
  }
};

export const saveFoodRecord = async (record: FoodRecord) => {
  const existing = await getFoodRecords();
  const updated = [...existing, record];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const saveFoodRecords = async (records: FoodRecord[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const addFoodRecord = async (record: FoodRecord) => {
  await saveFoodRecord(record);
};

export const updateFoodRecord = async (updated: FoodRecord) => {
  const records = await getFoodRecords();
  const newRecords = records.map(r => (r.id === updated.id ? updated : r));
  await saveFoodRecords(newRecords);
};

export const deleteFoodRecord = async (id: string) => {
  const records = await getFoodRecords();
  const newRecords = records.filter(r => r.id !== id);
  await saveFoodRecords(newRecords);
};

export const getEarliestRecordPerDay = async (): Promise<FoodRecord[]> => {
  const allRecords = await getFoodRecords();

  const map: { [date: string]: FoodRecord } = {};

  allRecords.forEach(record => {
    if (!map[record.date] || map[record.date].createdAt > record.createdAt) 
    {
      map[record.date] = record; 
    }
  });

  return Object.values(map);
};