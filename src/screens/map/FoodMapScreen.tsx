import React, {useEffect, useState} from "react";
import {View, Button, StyleSheet, Image, Text} from "react-native";
import MapView, {Marker, Callout} from "react-native-maps";
import {getFoodRecords} from "../../services/storage";

export default function FoodMapScreen({navigation}: any) 
{
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
  }, 
  
  [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadRecords();
    });
    return unsubscribe;
  }, 
  
  [navigation]);

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
        initialRegion=
        {
          {
            latitude: 1.3521,
            longitude: 103.8198,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }
        }
      >
       {records.map((r) => (
        <Marker
          key={r.id}
          coordinate=
          {
            {
              latitude: r.latitude!,
              longitude: r.longitude!,
            }
          }
        >

        <Callout>
          <View style={styles.callout}>
            <Text style={styles.calloutTitle}>
              {r.locationName || "Saved Location"}
            </Text>

            <Text style={styles.calloutMeta}>
              {r.date} • {r.category}
            </Text>

            {r.imageUri ? (
              <Image source={{ uri: r.imageUri }} style={styles.calloutImage} />
            ) : null}

            {r.note ? (
              <Text style={styles.calloutNote} numberOfLines={2}>
                {r.note}
              </Text>
            ) : null}
          </View>
        </Callout>
      </Marker>
      )
     )
    }
      </MapView>
    </View>
  );
}

const styles = 
StyleSheet.create
(
  {
    container: 
    {
      flex:1
    },
    
    callout: 
    {
      width: 220,
      paddingVertical: 6,
    },

    calloutTitle:
    {
      fontWeight: "700",
      marginBottom: 4,
    },

    calloutMeta: 
    {
      color: "#666",
      marginBottom: 6,
    },

    calloutImage: 
    {
      width: "100%",
      height:110,
      borderRadius:8,
      marginBottom:6,
    },

    calloutNote: 
    {
      color: "#333",
    },
  } 
);