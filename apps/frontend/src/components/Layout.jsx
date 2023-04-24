import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/Auth';

function Layout() {
	const { user, logoutUser } = useAuth();
	const date = new Date();
	const currentYear = date.getFullYear();

	return (
		<main className='layoutMain'>
			<nav className='navNav'>
				{user ? (
					<button
						className='navBtnLogout navNavLink'
						onClick={() => logoutUser()}>
						Logout
					</button>
				) : (
					<NavLink
						className='navNavLink'
						to='registration'>
						Registration
					</NavLink>
				)}
			</nav>
			<Outlet />
			<footer className='layoutFooter'>
				<small className='layoutFooterSmall'>
					Zak Fixer, {currentYear} &copy;.
				</small>
			</footer>
		</main>
	);
}

export default Layout;
