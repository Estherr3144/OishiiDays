import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Calendar from "./Calendar";
import Map from "./Map";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

export default function TabNavigator() 
{
  return (
   <Tab.Navigator 
    screenOptions={{headerShown:false}}>

      <Tab.Screen 
        name="Calendar" 
        component={Calendar} 
      />

      <Tab.Screen 
        name="Map" 
        component={Map} 
      />

      <Tab.Screen 
        name="Settings" 
        component={Settings} 
      />
      
    </Tab.Navigator>
  );
}
