import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import CheckBox from 'react-native-check-box';
import connString from './connectionString';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplyModal = ({ modalVisible, setModalVisible, selectedDrive }) => {
    const [roles, setRoles] = useState([{ name: "1" }, { name: "2" }]);
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
            console.log("Resume");

            const result = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.pdf],
            });
            console.log("Hello");

            console.log(result);
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log(error);

            }
        }
    };

    const handleApplySubmit = async () => {
        try {
            // const formData = new FormData();
            // if (resume) {
            //     formData.append('resumeFile', {
            //         uri: resume.uri,
            //         name: resume.name,
            //         type: resume.mimeType || 'application/octet-stream', // Set a default MIME type
            //     });
            // }
            // formData.append('roles', JSON.stringify(selectedRoles)); // Convert roles array to JSON string
            const response = await axios.post(`${connString}/user/submit-application`, { uid: userData.uid, roleIds: selectedRoles, company_id: selectedDrive.company_id });
            alert(response.data.message);
            setModalVisible(false); // Close modal on success
        } catch (error) {
            alert("Already Applied for Drive");
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
                    {selectedDrive?.role && <Text style={styles.modalText}>Select Roles:</Text>}
                    <ScrollView style={styles.rolesContainer}>
                        {roles.map((role) => (
                            <View key={role.id}>
                                <CheckBox
                                    isChecked={selectedRoles?.includes(role.role_id)}
                                    rightText={role.role_name}
                                    onClick={() => handleRoleSelect(role.role_id)}
                                />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Resume Upload */}
                    {/* <Text style={styles.modalText}>Upload Resume:</Text>
                    <Button title="Select Resume" onPress={handleResumeUpload} />
                    {resume && <Text style={styles.modalText}>Selected Resume: {resume.name}</Text>} */}

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
        marginVertical: 10,
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
