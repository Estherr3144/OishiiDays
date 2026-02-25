import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { getFoodRecords } from "../../services/storage";
import { FoodRecord } from "../../types/FoodRecord";
import { Button } from "react-native";

export default function CalendarScreen({ navigation }: any) 
{

  const [markedDates, setMarkedDates] = useState({});

  React.useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="+"
        onPress={() => navigation.navigate("AddFood")}
      />
    ),
  });
}, 

[navigation]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const records: FoodRecord[] = await getFoodRecords();

    const marks: any = {};

    records.forEach(record => {
      marks[record.date] = 
      {
        marked: true,
        dotColor: "orange",
      };
    });

    setMarkedDates(marks);
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          navigation.navigate("DayDetail", 
          {
            date: day.dateString,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create(
{
  container: 
  {
    flex: 1,
  },
});