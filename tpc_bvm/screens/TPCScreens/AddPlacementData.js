import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import connString from "../../components/connectionString";
import { Picker } from "@react-native-picker/picker";

const AddPlacementScreen = () => {
    const [applications, setApplications] = useState([]);
    const [selectedUid, setSelectedUid] = useState('');
    const [selectedCompanyId, setSelectedCompanyId] = useState('');
    const [packageOffered, setPackageOffered] = useState('');

    // Fetch applications from backend on component mount
    useEffect(() => {
        axios.get(`${connString}/tpc/get-selected-candidates`)
            .then(response => {
                setApplications(response.data.placed_data); // Assuming response.data contains array of applications
            })
            .catch(error => {
                console.error("Error fetching applications: ", error);
            });
    }, [selectedUid]);

    // Function to handle form submission
    const handleSubmit = () => {
        if (!selectedUid || !selectedCompanyId || !packageOffered) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const placementData = {
            uid: selectedUid,
            company_id: selectedCompanyId,
            CTC: packageOffered
        };

        axios.post(`${connString}/tpc/add-placement-data`, placementData)
            .then(response => {
                Alert.alert('Success', 'Placement data added successfully');
                // Clear form after successful submission
                setSelectedUid('');
                setSelectedCompanyId('');
                setPackageOffered('');

            })
            .catch(error => {
                console.error('Error adding placement data: ', error);
                Alert.alert('Error', 'Failed to add placement data');
            });
    };

    return (
        <View style={styles.container}>
            {applications.length > 0 ?
                <>
                    <Text style={styles.label}>Select Student (UID):</Text>
                    <Picker
                        selectedValue={selectedUid}
                        style={styles.picker}
                        onValueChange={(itemValue) => { setSelectedUid(itemValue.split('@')[0]); setSelectedCompanyId(itemValue.split('@')[1]) }}
                    >
                        {applications?.map((app) => (
                            <Picker.Item key={app.uid} label={app.uid.toString() + "\t\t\t\t\t\t\t\t\t" + app.name.toString()} value={app.uid + "@" + app.company_id} />
                        ))}
                    </Picker>


                    <Text style={styles.label}>Package Offered:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={packageOffered}
                        onChangeText={(itemValue) => setPackageOffered(itemValue)}
                    />
                    <Button title="Add Placement" onPress={handleSubmit} />
                </> :
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.noData}>No Students Available</Text>
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 16,
        marginVertical: 10
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    noData: {
        color: 'gray',
        fontSize: 36
    }
});

export default AddPlacementScreen;
