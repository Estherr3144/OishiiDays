import AsyncStorage from "@react-native-async-storage/async-storage";
import {FoodRecord} from "../types/FoodRecord";

const STORAGE_KEY = "FOOD_RECORDS";

export const getFoodRecords = async (): Promise<FoodRecord[]> => {
  try 
  {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) return [];

    return parsed as FoodRecord[];
  } 
  
  catch (error) 
  {
    console.error("Error getting records", error);
    return [];
  }
};

export const saveFoodRecords = async (records: FoodRecord[]) => {
  try 
  {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } 

  catch (error) 
  {
    console.error("Error saving records", error);
  }
};

export const saveFoodRecord = async (record: FoodRecord) => {
  try 
  {
    const existing = await getFoodRecords();
    const updated = [...existing, record];
    await saveFoodRecords(updated);
  } 
  
  catch (error) 
  {
    console.error("Error saving record", error);
  }
};

export const addFoodRecord = async (record: FoodRecord) => {
  await saveFoodRecord(record);
};

export const updateFoodRecord = async (updated: FoodRecord) => {
  try 
  {
    const records = await getFoodRecords();
    const newRecords = records.map((r) => (r.id === updated.id ? updated : r));
    await saveFoodRecords(newRecords);
  } 
  
  catch (error) 
  {
    console.error("Error updating record", error);
  }
};

export const deleteFoodRecord = async (id: string) => {
  try 
  {
    const records = await getFoodRecords();
    const newRecords = records.filter((r) => r.id !== id);
    await saveFoodRecords(newRecords);
  } 
  
  catch (error) 
  {
    console.error("Error deleting record", error);
  }
};

export const getEarliestRecordPerDay = async (): Promise<FoodRecord[]> => {
  const records = await getFoodRecords();

  const map: Record<string, FoodRecord> = {};

  for (const r of records)
  {
    if (!r.date) continue;

    const existing = map[r.date];
    if (!existing || r.createdAt < existing.createdAt) 
    {
      map[r.date] = r;
    }
  }

  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
};