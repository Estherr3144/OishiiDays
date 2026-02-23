import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screens/settings/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function Settings()
{
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
