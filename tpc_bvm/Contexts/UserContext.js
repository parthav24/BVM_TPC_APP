import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
