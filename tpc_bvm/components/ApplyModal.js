import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import CheckBox from 'react-native-check-box';
import * as DocumentPicker from 'expo-document-picker';
import connString from './connectionString';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplyModal = ({ modalVisible, setModalVisible, selectedDrive }) => {
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [userData, setUserData] = useState(null);
    const [resume, setResume] = useState(null); // To store the resume file

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                console.log(selectedDrive.company_id);
                const response = await axios.get(`${connString}/user/get-company-roles/${selectedDrive.company_id}`);
                setRoles(response.data);
                setUserData(JSON.parse(await AsyncStorage.getItem('userData')));
                console.log(response.data);

            } catch (error) {
                console.error('Failed to fetch roles:', error);
            }
        };

        if (selectedDrive) {
            fetchRoles();
        }
    }, [selectedDrive]);

    const handleRoleSelect = (role_id) => {
        if (selectedRoles?.includes(role_id)) {
            setSelectedRoles(selectedRoles?.filter((r) => r !== role_id));
        } else {
            setSelectedRoles([...selectedRoles, role_id]);
        }
    };

    const handleResumeUpload = async () => {
        try {
            // Document picker logic
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf", // All file types
            });

            if (result.canceled === false) {
                // Set the file details in your state
                setResume({
                    uri: result.assets[0].uri,
                    name: result.assets[0].name,
                    type: result.assets[0].mimeType,
                });
                console.log("File selected: ", result);
            }
        } catch (error) {
            console.error("Error picking document: ", error);
        }
    };

    const handleApplySubmit = async () => {
        try {
            if (selectedDrive.role && selectedRoles.length === 0) {
                throw new Error("Atleast One role is required!")
            }
            const formData = new FormData();
            formData.append('uid', userData.uid);
            formData.append('company_id', selectedDrive.company_id);
            formData.append('company_name', selectedDrive.name);
            formData.append('roles', JSON.stringify(selectedRoles)); // Convert roles array to JSON string
            if (resume) {
                console.log("Hello", resume.name);

                formData.append('resume', {
                    uri: resume.uri,
                    name: resume.name,
                    type: 'application/pdf'
                });
            }

            const response = await axios.post(`${connString}/user/submit-application`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Multipart form data is required for file upload
                },
            });
            setRoles([]);
            setSelectedRoles([]);
            setResume(null);
            // alert(response.data.message);
            console.log(response.data);

            alert("Applied")
            setModalVisible(false); // Close modal on success
            
        } catch (error) {
            alert(error.message);
            console.log(error);

            console.error('Error submitting application:', error.response ? error.response.data : error.message);
            setModalVisible(false); // Close modal on success
        }
    };

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Apply for {selectedDrive?.name}</Text>
                    {/* Role Selection */}
                    {selectedDrive?.role === 1 && <Text style={styles.modalText}>Select Roles:</Text>}
                    <ScrollView style={styles.rolesContainer}>
                        {roles.map((role) => (
                            <View key={role.role_id}>
                                <CheckBox
                                    isChecked={selectedRoles?.includes(role.role_id)}
                                    rightText={role.role_name}
                                    onClick={() => handleRoleSelect(role.role_id)}
                                />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Resume Upload */}
                    {selectedDrive?.resume === 1 && <>
                        <Text style={styles.modalText}>Upload Resume : {resume && <Text style={styles.modalText}>{resume.name}</Text>}</Text>
                        <TouchableOpacity style={styles.submitButton} onPress={handleResumeUpload} ><Text style={styles.buttonText} >Select Resume</Text></TouchableOpacity>
                    </>}

                    <TouchableOpacity style={styles.submitButton} onPress={handleApplySubmit}><Text style={styles.buttonText}>SUBMIT APPLICATION </Text></TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={() => setModalVisible(false)} ><Text style={styles.buttonText}>CANCLE </Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalText: {
        fontWeight: 'bold',
        marginVertical: 2,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    rolesContainer: {
        maxHeight: 150,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },

    submitButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10, // Margin between buttons
        width: '100%', // Button width
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ApplyModal;
