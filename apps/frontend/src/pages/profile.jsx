import { useAuth } from '../context/Auth';

function profile() {
	const { user } = useAuth();
	return (
		<div>
			<h1>Profile</h1>
			<h2>
				{user.firstName} {user.lastName}
			</h2>
		</div>
	);
}

export default profile;
