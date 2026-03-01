import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { FoodRecord } from "../../types/FoodRecord";
import { getEarliestRecordPerDay } from "../../services/storage";
import { useFocusEffect } from "@react-navigation/native";

const CustomDay = ({ date, state, marking, imageMap }: any) => {
  const imageUri = imageMap[date.dateString];

  return (
    <View style={styles.dayContainer}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.dayImage}
        />
      )}

      <View style={styles.dayOverlay}>
        <Text
          style=
          {
            [
              styles.dayText,
              state === "disabled" && { color: "#ccc" },
            ]
          }
        >
          {date.day}
        </Text>
      </View>
    </View>
  );
};


export default function CalendarScreen({ navigation }: any) 
{

  const [markedDates, setMarkedDates] = useState({});
  const [imageMap, setImageMap] =
    useState<{ [date: string]: string }>({});

  // Header "+"
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="+"
          onPress={() => navigation.navigate("AddFood")}
        />
      ),
    });
  }, [navigation]);

useFocusEffect(


  useCallback(() => {
    loadRecords();
  }, [])
);
 

  const loadRecords = async () => {

    const records: FoodRecord[] =
      await getEarliestRecordPerDay();

    const marks: any = {};
    const images: { [date: string]: string } = {};

    records.forEach(record => {

      marks[record.date] = 
      {
        marked: true,
        dotColor: "orange",
      };

      if (record.imageUri) 
      {
        images[record.date] = record.imageUri;
      }
    });

    setMarkedDates(marks);
    setImageMap(images);
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}

        dayComponent={({ date, state, marking }) => (
          <CustomDay
            date={date}
            state={state}
            marking={marking}
            imageMap={imageMap}
          />
        )}

        onDayPress={(day) => {
          navigation.navigate("DayDetail", {
            date: day.dateString,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create
(
  {

  container: 
  {
    flex: 1,
  },

  dayContainer: 
  {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  dayImage: 
  {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 6,
  },

  dayOverlay: 
  {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  dayText: 
  {
    color: "white",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },

});