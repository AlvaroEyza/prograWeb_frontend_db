import './Drawer.css';
import { useAuth } from '../../Login/AuthContext';

const Drawer = () => {
    const { isAuthenticated, userRole } = useAuth();

    return (
        <div className="drawer">
            <ul>
                {isAuthenticated ? (
                    <>
                        <li><a href="/MyAccount">Account</a></li>
                        {userRole === "admin" && <li><a href="/administrador">Administrar</a></li>}
                    </>
                ) : (
                    <li><a href="/login">Login</a></li>
                )}
                <li><a href="/">Terms of service</a></li>
                <li><a href="/">Shopping guide</a></li>
                <li><a href="/">Help</a></li>
            </ul>
        </div>
    );
}

export default Drawer;