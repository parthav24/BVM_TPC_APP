import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Image, TouchableOpacity } from 'react-native';

const studentData = [
  { id: '1', srNo: '1', student: 'Dhruv Italiya', branch: 'CP', placedIn: 'Google', package: '20 LPA', offerLetter: 'View' },
  { id: '2', srNo: '2', student: 'Parthav Chodvadiya', branch: 'CP', placedIn: 'Amazon', package: '18 LPA', offerLetter: 'View' },
  // Add more student data here...
];

export default function GuestScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOfferLetterClick = () => {
    setSelectedImage(require('../assets/tpc_logo.png'));
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.srNo}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.student}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.branch}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.placedIn}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.package}</Text>
      </View>
      <TouchableOpacity onPress={handleOfferLetterClick} style={styles.cell}>
        <Text style={[styles.cellText, { color: 'blue' }]}>{item.offerLetter}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Placement Information</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Sr No.</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Student</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Branch</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Placed In</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Package</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Offer Letter</Text>
          </View>
        </View>
        <FlatList
          data={studentData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={selectedImage} style={styles.modalImage} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    backgroundColor: "#841584",
    padding:10,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    justifyContent: '',
    alignItems: '',
    paddingVertical: 15,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
  },
  cellText: {
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
