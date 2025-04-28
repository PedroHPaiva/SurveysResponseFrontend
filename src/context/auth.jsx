/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, useState } from 'react';
import { createSession } from '../services/usersSurveysResponses/sessions';

export const AuthContext = createContext({});

export const AuthProvider = ({ children, redirect }) => {
  const [data, setData] = useState(() => {
    const user = localStorage.getItem('@SurveysData:user');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  const signIn = useCallback(async (email, password) => {
    const response = await createSession(email, password);
    localStorage.setItem('@SurveysData:user', JSON.stringify(response));
    setData(response);
    return response;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SurveysData:user');
    setData({});

    redirect('/');
  }, [redirect]);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`Não existe contexto de autenticação`);
  }

  return context;
}
