import './Login.css'
import LoginBody from './LoginBody.jsx';
import LoginHeader from './LoginHeader.jsx';

const Login = () => {
    return(
        <div className='Login'>
            <LoginHeader/>
            <LoginBody/>
        </div>
    )
}

export default Login;