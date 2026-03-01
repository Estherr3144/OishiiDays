import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodMapScreen from "../screens/map/FoodMapScreen";
import SelectRecordScreen from "../screens/map/SelectRecordScreen";
import AddLocationScreen from "../screens/map/AddLocationScreen";

const Stack = createNativeStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FoodMap" component={FoodMapScreen} />
      <Stack.Screen name="SelectRecord" component={SelectRecordScreen} />
      <Stack.Screen name="AddLocation" component={AddLocationScreen} />
    </Stack.Navigator>
  );
}