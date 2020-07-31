import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}
interface AuthState {
  token: string;
  user: User;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  singIn(credentials: SignInCredentials): Promise<void>;
  singOut(): void;
  loading: boolean;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({token: token[1], user: JSON.parse(user[1])});
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);
  const singIn = useCallback(async ({email, password}) => {
    console.log(email);
    console.log(password);

    const response = await api.post('sessions', {
      email,
      password,
    });
    console.log(email);
    const {token, user} = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({token, user});
  }, []);
  const singOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{user: data.user, loading, singIn, singOut}}>
      {children}
    </AuthContext.Provider>
  );
};
function userAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('use Auth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, userAuth};
