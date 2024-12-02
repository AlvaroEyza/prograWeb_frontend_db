import './LoginBody.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginBody = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('https://zutomayo-2024-backend.azurewebsites.net/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Login successful ${data.role}`);
                login(data.role);
                localStorage.setItem('userId', data.idUser);
                navigate('/');
            } else {
                alert(`Login failed, please try again.`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='Loginbody'>
            <p>Please enter your email address that you can contact to sign in or sign up.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='xxxxxxx@gmail.com' 
                    name='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    name='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <p><a href='/sign-up'>Sign up</a></p>
                <p><span>This is a separate account from the ZUTOMAYO PREMIUM account.</span></p>
                <a href="/"><button type='button' className='return'>return</button></a>
                <button type='submit' className='next'>login</button>
            </form>
        </div>
    );
}

export default LoginBody;