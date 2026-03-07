import React, {useState, useCallback} from "react";
import {View, StyleSheet, Button, Image, Text, Alert, TouchableOpacity} from "react-native";
import {Calendar} from "react-native-calendars";
import {FoodRecord} from "../../types/FoodRecord";
import {getEarliestRecordPerDay} from "../../services/storage";
import {useFocusEffect} from "@react-navigation/native";
import {UI} from "../../styles/UI";

const CustomDay = ({date, state, imageMap, onPress}: any) => {
  const imageUri = imageMap[date.dateString];

  return (
    <TouchableOpacity
      style=
      {
        [
          styles.dayContainer,
          !imageUri && {backgroundColor: "transparent"},
        ]
      }

      onPress={() => onPress(date.dateString)}
      disabled={state === "disabled"}
      activeOpacity={0.8}
    >
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.dayImage} />
      )}

      <View style={styles.dayOverlay} pointerEvents="none">
        <Text
          style=
          {
            [
              styles.dayText,
              !imageUri && { color: UI.colors.text, textShadowRadius: 0 },
              state === "disabled" && { color: "#ccc" },
            ]
          }
        >
          {date.day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function CalendarScreen({ navigation }: any) 
{
  const [markedDates, setMarkedDates] = useState<any>({});
  const [imageMap, setImageMap] = useState<{ [date: string]: string }>({});

  useFocusEffect
  (
    useCallback(() => {
      loadRecords();
    }, [])
  );

  const loadRecords = async () => {
    const records: FoodRecord[] = await getEarliestRecordPerDay();
    const marks: any = {};
    const images: { [date: string]: string } = {};

    records.forEach((record) => {
      marks[record.date] = { marked: true, dotColor: "orange" };
      if (record.imageUri) images[record.date] = record.imageUri;
    });

    setMarkedDates(marks);
    setImageMap(images);
  };

  const handleDayPress = (dateStr: string) => {
    const hasRecord = !!markedDates[dateStr];

    if (hasRecord) 
    {
      Alert.alert
      (
        "Food record found",
        `You have record(s) on ${dateStr}`,
        [
          {
            text: "View Records",
            onPress: () => navigation.navigate("DayDetail", {date: dateStr}),
          },

          {
            text: "Add New",
            onPress: () => navigation.navigate("AddFood", {date: dateStr}),
          },

          { text: "Cancel", 
            style: "cancel" },
        ]
      );
    } 
    
    else 
    {
      navigation.navigate("AddFood", {date: dateStr});
    }
  };

  return (
    <View style={styles.container}>
     <Calendar
      markedDates={markedDates}
      style={styles.calendar}
      theme=
      {
        {
          backgroundColor: UI.colors.background,
          calendarBackground: UI.colors.background,
          textSectionTitleColor: UI.colors.primaryDark,
          todayTextColor: UI.colors.primaryDark,
          monthTextColor: UI.colors.primaryDark,
          arrowColor: UI.colors.primaryDark,
          textDayFontWeight: "500",
          textMonthFontWeight: "700",
          textDayHeaderFontWeight: "600",
        }
      }

      dayComponent={({ date, state }) => (
        <CustomDay
          date={date}
          state={state}
          imageMap={imageMap}
          onPress={handleDayPress}
        />
  )}
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
      backgroundColor: UI.colors.background,
      padding: UI.spacing.m,
    },

    calendar: 
    {
      borderRadius: UI.radius.l,
      paddingBottom: UI.spacing.s,
    },

    dayContainer: 
    {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: UI.radius.s,
    },

    dayImage: 
    {
      position: "absolute",
      width: 38,
      height: 38,
      borderRadius: UI.radius.s,
      borderWidth: 1,
      borderColor: UI.colors.border,
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
      color: UI.colors.white,
      fontWeight: "bold",
      textShadowColor: "rgba(0,0,0,0.35)",
      textShadowOffset: {width:0, height:0},
      textShadowRadius: 3,
    },
  }
);