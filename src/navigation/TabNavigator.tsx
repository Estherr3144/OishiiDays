import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddMealScreen from "../screens/AddMealScreen";

export type RootStackParamList = {
  Home: undefined;
  AddMeal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "OishiiDays" }} />
      <Stack.Screen name="AddMeal" component={AddMealScreen} options={{ title: "Add Meal" }} />
    </Stack.Navigator>
  );
}
