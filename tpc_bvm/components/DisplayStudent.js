import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, ScrollView } from 'react-native';
import connString from './connectionString';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const StudentDataModal = ({ student, modalVisible, setModalVisible, selectedTab, navigation }) => {
    const approveStudent = async (id) => {
        try {
            const response = await axios.post(`${connString}/tpc/approveUser`, { uid: student?.uid });
            setModalVisible(false);
            Toast.show({
                type: "success",
                text1: `${student?.uid} approved!`,
            });
        } catch (erro) {
            Toast.show({
                type: "error",
                text1: `Something went wrong!`,
            });
        }
    };
    const rejectStudent = async (id) => {
        try {
            const response = await axios.post(`${connString}/tpc/rejectUser`, { uid: student?.uid });
            setModalVisible(false);
            Toast.show({
                type: "success",
                text1: `${student?.uid} rejected!`,
            });
        } catch (erro) {
            Toast.show({
                type: "error",
                text1: `Something went wrong!`,
            });
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Student Details</Text>
                <ScrollView style={styles.scrollViewContent}>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Personal Details</Text>
                    </View>
                    <Text style={styles.modalText}>ID: {student?.uid}</Text>
                    <Text style={styles.modalText}>First Name: {student?.f_name}</Text>
                    <Text style={styles.modalText}>Middle Name: {student?.m_name}</Text>
                    <Text style={styles.modalText}>Last Name: {student?.l_name}</Text>
                    <Text style={styles.modalText}>Email: {student?.email}</Text>
                    <Text style={styles.modalText}>Mobile: {student?.mobile}</Text>
                    <Text style={styles.modalText}>Address: {student?.address}</Text>
                    <Text style={styles.modalText}>DOB: {student?.dob}</Text>
                    <Text style={styles.modalText}>Gender: {student?.gender}</Text>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Result Details</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                        <Text style={styles.textView}>Sem1: {student?.sem1}</Text>
                        <Text style={styles.textView}>Sem2: {student?.sem2}</Text>
                        <Text style={styles.textView}>Sem3: {student?.sem3}</Text>
                        <Text style={styles.textView}>Sem4: {student?.sem4}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                        <Text style={styles.textView}>Sem5: {student?.sem5 === 0 ? 'NA' : student?.sem5}</Text>
                        <Text style={styles.textView}>Sem6: {student?.sem6 === 0 ? 'NA' : student?.sem6}</Text>
                        <Text style={styles.textView}>Sem7: {student?.sem7 === 0 ? 'NA' : student?.sem7}</Text>
                        <Text style={styles.textView}>Sem8: {student?.sem8 === 0 ? 'NA' : student?.sem8}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                        <Text style={styles.textView}>CPI: {student?.cpi}</Text>
                        <Text style={styles.textView}>Diploma: {student?.diploma_cpi === 0 ? 'NA' : student?.deploma_cpi}</Text>
                        <Text style={styles.textView}>HSC: {student?.hsc_percentage === 0 ? 'NA' : student?.hsc_percentage}</Text>
                        <Text style={styles.textView}>SSC: {student?.ssc_percentage}</Text>
                    </View>
                    <Text style={styles.modalText}>Passout Year: {student?.passout_year}</Text>
                    <Text style={styles.modalText}>No. of Active Backlogs: {student?.no_active_backlog}</Text>
                    <Text style={styles.modalText}>No. of Dead Backlogs: {student?.no_dead_backlog}</Text>
                    <View style={styles.line} />
                </ScrollView>
                {selectedTab === 'pending' && <View style={styles.buttonView}>
                    <Button title="Approve" color={"green"} onPress={() => approveStudent()} />
                    <Button title="Reject" color={"red"} onPress={() => rejectStudent()} />
                    <Button title="Edit" color={"#e1ad01"} onPress={() => { setModalVisible(false); navigation.navigate("EditStudentDetails",{student}) }} />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>}
                {selectedTab === 'approved' && <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button title="Close" color={"#e1ad01"} onPress={() => setModalVisible(false)} />
                </View>}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 7,
        paddingBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '100%', // Adjust height as necessary
    },
    textView: {
        borderWidth: 1,
        alignItems: 'center',
        padding: 4,
        borderRadius: 5
    },
    modalTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'left',
        fontSize: 16,
    },
    scrollViewContent: {
        width: "100%",
        paddingVertical: 15, // Adjust if needed
        paddingHorizontal: 0, // Ensure no horizontal padding
    },
    buttonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    line: {
        height: 1, // height of the line
        backgroundColor: '#ccc', // color of the line
        marginVertical: 10, // space above and below the line
        width: '100%', // width of the line (100% of parent)
    }
});

export default StudentDataModal;
