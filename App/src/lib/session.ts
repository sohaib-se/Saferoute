import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_STORAGE_KEY = '@saferoute_user_session';

export interface UserSession {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  role: 'driver' | 'parent';
  schoolId?: string;
  loginId?: string;
  profile?: any;
}

export const saveUserSession = async (session: UserSession): Promise<void> => {
  try {
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Failed to save user session:', error);
  }
};

export const getUserSession = async (): Promise<UserSession | null> => {
  try {
    const raw = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Failed to get user session:', error);
    return null;
  }
};

export const clearUserSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear user session:', error);
  }
};
