import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import TermsScreen from "../screens/settings/TermsScreen";
import DataScreen from "../screens/settings/DataScreen";
import AboutScreen from "../screens/settings/AboutScreen";
import PrivacyScreen from "../screens/settings/PrivacyScreen";

const Stack = createNativeStackNavigator();

export default function SettingsStack() 
{
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsScreen}
        options={{title:"Settings"}}
      />

      <Stack.Screen 
        name="Terms" 
        component={TermsScreen} 
        options={{title:"Terms"}} 
      />

      <Stack.Screen 
        name="Data" 
        component={DataScreen} 
        options={{title:"Data"}} 
      />

      <Stack.Screen 
        name="About" 
        component={AboutScreen} 
        options={{title:"About"}} 
      />

      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{title:"Privacy"}}
      />
      
    </Stack.Navigator>
  );
}