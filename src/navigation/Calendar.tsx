import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarScreen from "../screens/calendar/CalendarScreen";
import DayDetailScreen from "../screens/calendar/DayDetailScreen";
import AddFoodScreen from "../screens/calendar/AddFoodScreen";

const Stack = createNativeStackNavigator();

export default function CalendarStack() 
{
  return
  (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ title: "Food Journal" }}
      />

      <Stack.Screen
        name="DayDetail"
        component={DayDetailScreen}
      />

      <Stack.Screen
        name="AddFood"
        component={AddFoodScreen}
      />
    </Stack.Navigator>
  );
}
