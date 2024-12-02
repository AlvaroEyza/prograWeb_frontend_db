import './MyAccountBody.css';
import Profile from '../../assets/perfil.png';
import Password from '../../assets/password.png';
import Orders from '../../assets/ordenes.png';
import { useAuth } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyAccountBody = () => {
    const navigate = useNavigate();
    const { isAuthenticated, userRole, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className='MyAccountBody'>
            <div className='MyAccountSection'>
                <img src={Profile} className='Profile' />
                <a href='/MyAccount/profile'><p>Profile</p></a>
            </div>
            <hr />
            <div className='MyAccountSection'>
                <img src={Password} className='Password' />
                <a href='/MyAccount/password'><p>Password</p></a>
            </div>
            <hr />
            {isAuthenticated && userRole === "user" && (
                <>
                    <div className='MyAccountSection'>
                        <img src={Orders} className='Orders' />
                        <a href='/MyAccount/Order-History'><p>Order History</p></a>
                    </div>
                    <hr />
                </>
            )}
            <div className='sesion'>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </div>
    );
}

export default MyAccountBody;