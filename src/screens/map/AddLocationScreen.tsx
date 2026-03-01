import React, { useState } from "react";
import 
{
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { getFoodRecords, updateFoodRecord } from "../../services/storage";

let searchTimer: any = null;

type PlaceOption = 
{
  id: string;
  title: string;
  subtitle?: string;
  latitude?: number;
  longitude?: number;
  kind: "current" | "search";
};

export default function AddLocationScreen({ route, navigation }: any) 
{
  const { recordId } = route.params;

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<PlaceOption[]>(
  [
    { id: "current", title: "Use current location", kind: "current" },
  ]);
  const [loading, setLoading] = useState(false);

  const searchPlaces = async (text: string) => {
    setQuery(text);

    if (!text.trim()) 
    {
      setOptions([{ id: "current", title: "Use current location", kind: "current" }]);
      return;
    }

    if (searchTimer) clearTimeout(searchTimer);

    searchTimer = setTimeout(async () => {
      setLoading(true);

      try 
      {
        const q = encodeURIComponent(text.trim());
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&q=${q}`;

        const res = await fetch(url, 
        {
          headers: 
          {
            "User-Agent": "OishiiDays/1.0 (Expo)",
            "Accept": "application/json",
          },
        });

        const json = await res.json();

        const searchOptions: PlaceOption[] = (json || []).map((r: any, idx: number) => ({
          id: `search-${idx}`,
          title: r.display_name,
          subtitle: r.type ? `Type: ${r.type}` : undefined,
          latitude: Number(r.lat),
          longitude: Number(r.lon),
          kind: "search",
        }));

        setOptions
        (
          [
          { id: "current", title: "Use current location", kind: "current" },
          ...searchOptions,
          ]
        );
      } 
      
      catch (e) 
      {
        setOptions([{ id: "current", title: "Use current location", kind: "current" }]);
        Alert.alert("Search failed", "Please check internet and try again.");
      } 
      
      finally 
      {
        setLoading(false);
      }
    }, 400);
  };

  const saveToRecord = async (latitude: number, longitude: number, locationName: string) => {
    const records = await getFoodRecords();
    const record = records.find((r) => r.id === recordId);

    if (!record) 
    {
      Alert.alert("Record not found");
      return;
    }

    await updateFoodRecord
    (
      {
      ...record,
      latitude,
      longitude,
      locationName,
      }
    );

    Alert.alert("Location saved");
    navigation.goBack();
  };

  const pickOption = async (opt: PlaceOption) => {
    if (loading) return;

    if (opt.kind === "current") 
    {
      setLoading(true);
      try {
        const perm = await Location.requestForegroundPermissionsAsync();
        if (!perm.granted) {
          Alert.alert(
            "Location permission needed",
            "Please allow location access or search by place name."
          );
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const reverse = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        const place = reverse?.[0];
        const name =
          place
            ? [place.name, place.street, place.city, place.region, place.postalCode, place.country]
                .filter(Boolean)
                .join(", ")
            : "Current location";

        await saveToRecord(loc.coords.latitude, loc.coords.longitude, name);
      } 
      
      catch (e) 
      {
        Alert.alert("Cannot get current location", "Try again or search by place name.");
      } 
      
      finally 
      {
        setLoading(false);
      }
      return;
    }

    if (opt.latitude == null || opt.longitude == null) 
    {
      Alert.alert("No coordinates found", "Try a different search.");
      return;
    }

    setLoading(true);
    try 
    {
      const reverse = await Location.reverseGeocodeAsync(
      {
        latitude: opt.latitude,
        longitude: opt.longitude,
      });

      const place = reverse?.[0];
      const name =
        place
          ? [place.name, place.street, place.city, place.region, place.postalCode, place.country]
              .filter(Boolean)
              .join(", ")
          : query.trim();

      await saveToRecord(opt.latitude, opt.longitude, name);
    } 
    
    catch (e) 
    {
      await saveToRecord(opt.latitude, opt.longitude, query.trim());
    } 
    
    finally 
    {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: PlaceOption }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => pickOption(item)}
      disabled={loading}
    >
      <Text style={styles.title}>{item.title}</Text>
      {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
      {item.kind === "current" && <Text style={styles.subtitle}>Recommended</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by place name, postcode, or country."
        value={query}
        onChangeText={searchPlaces}
        style={styles.search}
        autoCorrect={false}
      />

      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={
          loading ? <Text style={styles.loading}>Loading…</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create(
{
  container: { flex: 1, padding: 16 },
  search: 
  {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  item: 
  {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  title: 
  { 
    fontSize: 16, 
    fontWeight: "600" 
  },

  subtitle: 
  { 
    marginTop: 4, 
    color: "#666" 
  },

  loading: 
  { 
    paddingVertical: 12, 
    textAlign: "center", 
    color: "#666" 
  },
});