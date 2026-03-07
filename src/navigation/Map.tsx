import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FoodMapScreen from "../screens/map/FoodMapScreen";
import SelectRecordScreen from "../screens/map/SelectRecordScreen";
import AddLocationScreen from "../screens/map/AddLocationScreen";

const Stack = createNativeStackNavigator();

export default function MapStack() 
{
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FoodMap" 
        component={FoodMapScreen}
        options={{title:"Map"}}
      />

      <Stack.Screen 
        name="SelectRecord" 
        component={SelectRecordScreen}
        options={{title:"Select Record"}}
      />

      <Stack.Screen 
        name="AddLocation" 
        component={AddLocationScreen} 
        options={{title:"Add Location"}}
      />

    </Stack.Navigator>
  );
}