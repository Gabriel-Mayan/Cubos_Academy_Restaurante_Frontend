import { createContext } from 'react';
import useAuthProvider from '../hooks/useAuthProvider';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const auth = useAuthProvider();

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthContext;