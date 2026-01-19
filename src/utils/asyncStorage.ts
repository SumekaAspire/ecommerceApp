import AsyncStorage from '@react-native-async-storage/async-storage';

//structure for session user object
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER'; //type
}

/**
 * StoreUserData - Function to store the data
 * @param key -  key under which data will be stored
 * @param value - value to be stored
 */
const storeUserData = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error in storing the user data:', error);
  }
};

/**
 * getUserDat - Function to get user data
 * @param key - key under which data is stored
 * @returs parsed value from AsyncStorage or null if not found
 */
const getUserData = async (key: string): Promise<SessionUser | null> => {
  try {
    const userData = await AsyncStorage.getItem(key);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.log('Error in getting the user data:', error);
    return null;
  }
};

/**
 * RemoveUserData - Function to remove data
 */

const removeUserData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error in removing the user data:', error);
  }
};

//exporting to use in other parts os application
export { storeUserData, getUserData, removeUserData };
