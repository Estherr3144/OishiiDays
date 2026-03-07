export type FoodCategory =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Snack"
  | "Cafe"
  | "Other";

export interface FoodRecord 
{
  id: string;
  date: string;       
  note?: string;
  imageUri?: string;
  category: FoodCategory;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  createdAt: number;
}