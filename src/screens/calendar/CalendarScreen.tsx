import { View, Text, Button } from "react-native";

export default function CalendarScreen({ navigation }: any) 
{
  return (
    <View>
      <Text>Calendar Screen</Text>

      <Button
        title="Go to Day Detail"
        onPress={() => navigation.navigate("DayDetail")}
      />
    </View>
  );
}
