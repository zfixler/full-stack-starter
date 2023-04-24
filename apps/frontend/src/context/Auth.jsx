import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		(async function fetchUser() {
			if (user) return;
			try {
				const response = await fetch('/api/session', {
					method: 'POST',
				});
				const { user } = await response.json();
				if (user) {
					setUser(user);
					navigate('/profile');
				}
			} catch (err) {
				console.error(err);
			}
		})();

		return () => setUser(null);
	}, []);

	function loginUser(data) {
		setUser(data);
		navigate('/profile');
	}

	async function logoutUser() {
		try {
			await fetch('/api/logout', { method: 'DELETE' });
			setUser(null);
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	}

	const value = useMemo(() => ({ user, loginUser, logoutUser }), [user]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
