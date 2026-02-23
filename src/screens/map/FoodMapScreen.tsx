import { View, Text, Button } from "react-native";

export default function FoodMapScreen({ navigation }: any) 
{
  return (
    <View>
      <Text>Food Map Screen</Text>

      <Button
        title="Select Record"
        onPress={() => navigation.navigate("SelectRecord")}
      />
    </View>
  );
}
