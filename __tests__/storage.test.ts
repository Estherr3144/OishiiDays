import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFoodRecords, saveFoodRecord, updateFoodRecord, deleteFoodRecord, getEarliestRecordPerDay, saveFoodRecords} from "../src/services/storage";
import {FoodRecord} from "../src/types/FoodRecord";

describe("storage.ts", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
  });

  test("saveFoodRecord + getFoodRecords: should persist and load records", async () => {
    const r: FoodRecord = 
    {
      id: "1",
      date: "2026-03-04",
      category: "Lunch",
      note: "Test note",
      imageUri: "file://image.jpg",
      createdAt: 1000,
    };

    await saveFoodRecord(r);

    const records = await getFoodRecords();
    expect(records).toHaveLength(1);
    expect(records[0].id).toBe("1");
    expect(records[0].date).toBe("2026-03-04");
  });

  test("updateFoodRecord: should update an existing record by id (e.g., add locationName)", async () => {
    const r: FoodRecord = 
    {
      id: "1",
      date: "2026-03-04",
      category: "Dinner",
      createdAt: 1000,
    };

    await saveFoodRecords([r]);

    await updateFoodRecord
    (
      {
      ...r,
      locationName: "Sushi Tei, SG",
      latitude: 1.3,
      longitude: 103.8,
     }
    );

    const records = await getFoodRecords();
    expect(records).toHaveLength(1);
    expect(records[0].locationName).toBe("Sushi Tei, SG");
    expect(records[0].latitude).toBe(1.3);
  });

  test("deleteFoodRecord: should remove record by id", async () => {
    const r1: FoodRecord = 
    {
      id: "1",
      date: "2026-03-04",
      category: "Snack",
      createdAt: 1000,
    };

    const r2: FoodRecord = 
    {
      id: "2",
      date: "2026-03-04",
      category: "Cafe",
      createdAt: 2000,
    };

    await saveFoodRecords([r1, r2]);
    await deleteFoodRecord("1");

    const records = await getFoodRecords();
    expect(records).toHaveLength(1);
    expect(records[0].id).toBe("2");
  });

  test("getEarliestRecordPerDay: should pick the smallest createdAt per date", async () => {
    const a1: FoodRecord = 
    {
      id: "a1",
      date: "2026-03-01",
      category: "Lunch",
      createdAt: 2000,
      imageUri: "file://late.jpg",
    };

    const a2: FoodRecord = 
    {
      id: "a2",
      date: "2026-03-01",
      category: "Lunch",
      createdAt:1000,
      imageUri: "file://early.jpg",
    };

    const b1: FoodRecord = 
    {
      id: "b1",
      date: "2026-03-02",
      category: "Dinner",
      createdAt:1500,
    };

    await saveFoodRecords([a1, a2, b1]);

    const earliest = await getEarliestRecordPerDay();

    expect(earliest).toHaveLength(2);

    const d1 = earliest.find((r) => r.date === "2026-03-01");
    expect(d1?.id).toBe("a2");
    expect(d1?.imageUri).toBe("file://early.jpg");

    const d2 = earliest.find((r) => r.date === "2026-03-02");
    expect(d2?.id).toBe("b1");
  });
});