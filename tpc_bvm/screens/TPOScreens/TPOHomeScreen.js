import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function TPOHomeScreen() {
  const [tpcName, setTpcName] = useState("");
  const [tpcs, setTpcs] = useState([{ id: "1", name: "TPC 1" }, { id: "2", name: "TPC 2" }]); // Static TPC data

  const addTpc = () => {
    if (tpcName.trim()) {
      setTpcs([...tpcs, { id: Date.now().toString(), name: tpcName }]);
      setTpcName("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TPO Home</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter TPC Name"
        value={tpcName}
        onChangeText={(text) => setTpcName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addTpc}>
        <Text style={styles.buttonText}>Add TPC</Text>
      </TouchableOpacity>

      <FlatList
        data={tpcs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tpcItem}>
            <Text style={styles.tpcText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 25,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tpcItem: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  tpcText: {
    fontSize: 16,
  },
});
