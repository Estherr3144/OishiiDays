import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getFoodRecords } from "../../services/storage";

export default function FoodMapScreen({ navigation }: any) {
  const [records, setRecords] = useState<any[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Records"
          onPress={() => navigation.navigate("SelectRecord")}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadRecords();
    });
    return unsubscribe;
  }, [navigation]);

  const loadRecords = async () => {
    const data = await getFoodRecords();
    const withLocation = data.filter(
      (r) => r.latitude && r.longitude
    );
    setRecords(withLocation);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {records.map((r) => (
          <Marker
            key={r.id}
            coordinate={{
              latitude: r.latitude!,
              longitude: r.longitude!,
            }}
            title={r.locationName || r.category}
            description={`${r.date}${r.note ? " • " + r.note : ""}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});