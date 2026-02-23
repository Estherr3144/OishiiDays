import { View, Text, Button } from "react-native";

export default function DayDetailScreen({ navigation }: any) 
{
  return (
    <View>
      <Text>Day Detail Screen</Text>

      <Button
        title="Add Food"
        onPress={() => navigation.navigate("AddFood")}
      />
    </View>
  );
}
