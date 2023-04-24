import { useAuth } from '../context/Auth';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
	const { user } = useAuth();
    if (!user) {
        return <Navigate to='/' />
    }

    return children;
}

export default ProtectedRoute;
