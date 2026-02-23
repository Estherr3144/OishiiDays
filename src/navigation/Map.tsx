import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodMapScreen from "../screens/map/FoodMapScreen";
import SelectRecordScreen from "../screens/map/SelectRecordScreen";

const Stack = createNativeStackNavigator();

export default function Map() 
{
  return (
    <Stack.Navigator>
      <Stack.Screen name="FoodMap" component={FoodMapScreen} />
      <Stack.Screen name="SelectRecord" component={SelectRecordScreen} />
    </Stack.Navigator>
  );
}
