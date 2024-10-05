// NotificationButton.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const notifications = [
    "Notification 1",
    "Notification 2",
    "Notification 3"
  ]; // Sample notifications

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="bell-o" size={25} color="" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            {notifications.map((notification, index) => (
              <Text key={index} style={styles.notificationText}>{notification}</Text>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1000, // Ensure it's above other components
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationText: {
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
  },
});

export default NotificationButton;
