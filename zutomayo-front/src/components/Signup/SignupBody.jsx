import './SignupBody.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupBody = () => {
    const navigate = useNavigate();
    const [registroUsuario, setRegistroUsuario] = useState({
        email: '',
        password: '',
        surname: '',
        name: '',
        prefijo: '',
        telefono: '',
        cumple: '',
        sexo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistroUsuario({
            ...registroUsuario,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!registroUsuario.prefijo) {
            alert('Please, select a valid phone prefix.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];

        if (registroUsuario.cumple > today) {
            alert('Please, enter a valid date');
            return;
        }

        const usersResponse = await fetch('https://zutomayo-2024-backend.azurewebsites.net/usuario');
        const users = await usersResponse.json();

        const emailExists = users.some(user => user.email === registroUsuario.email);
        const passwordExists = users.some(user => user.password === registroUsuario.password);

        if (emailExists) {
            alert('Email already in use. Please enter another email');
            return;
        }

        if (passwordExists) {
            alert('Password already in use. Please enter another password');
            return;
        }

        const response = await fetch('https://zutomayo-2024-backend.azurewebsites.net/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registroUsuario)
        });
        const result = await response.json();
        if (result) {
            alert('User registered successfully');
            navigate('/login');
        } else {
            alert('Something occurred during the sign up. Please, try again');
        }
    };

    return (
        <div className='Signbody'>
            <form onSubmit={handleSubmit}>
                <div className='signinfo'>
                    <p>Thank you for visiting us. Please register new customer information. You will be able to purchase it immediately from the next time.</p>
                    <p>* If you have already registered your customer information, your email address may be incorrect. Please try entering a different email address.</p>
                </div>
                <br />
                <div className='datos'>
                    <label>Email <span>* required</span></label>
                    <br />
                    <input type="text" placeholder='xxxxxxx@gmail.com' name='email' required onChange={handleChange} />
                    <br /><br />
                    <label>Password <span>* required</span></label>
                    <br />
                    <input type="password" placeholder='password' name='password' required onChange={handleChange} />
                    <br /><br />
                    <label>Name <span>* required</span></label>
                    <br />
                    <div className='doble'>
                        <input type="text" placeholder='Surname' name='surname' required onChange={handleChange} />
                        <input type="text" placeholder='Name' name='name' required onChange={handleChange} />
                    </div>
                    <br />
                    <label>Mobile phone number <span>* required</span></label>
                    <br />
                    <div className='doble2'>
                        <select name='prefijo' onChange={handleChange} defaultValue="">
                            <option value="" disabled>Country </option>
                            <option value="01">US</option>
                            <option value="31">NL</option>
                            <option value="33">FR</option>
                            <option value="34">ES</option>
                            <option value="351">PT</option>
                            <option value="358">FI</option>
                            <option value="39">IT</option>
                            <option value="44">GB</option>
                            <option value="45">DK</option>
                            <option value="46">SE</option>
                            <option value="47">NO</option>
                            <option value="49">DE</option>
                            <option value="51">PE</option>
                            <option value="52">MX</option>
                            <option value="54">AR</option>
                            <option value="55">BR</option>
                            <option value="56">CL</option>
                            <option value="57">CO</option>
                            <option value="63">PH</option>
                            <option value="65">SG</option>
                            <option value="66">TH</option>
                            <option value="81">JP</option>
                            <option value="82">KR</option>
                            <option value="852">HK</option>
                            <option value="886">TW</option>
                        </select>
                        <input type="tel" placeholder='08082016' name='telefono' required onChange={handleChange} pattern="\d{1,9}" maxLength="9"/>
                    </div>
                    <br />
                    <label>Birthday</label>
                    <br />
                    <input type="date" name='cumple' onChange={handleChange} />
                    <br /><br />
                    <label>Sex</label>
                    <br />
                    <select name='sexo' onChange={handleChange}>
                        <option value=""></option>
                        <option value="1">male</option>
                        <option value="2">woman</option>
                        <option value="3">others</option>
                    </select>
                    <br /><br />
                </div>
                <br />
                <div className='terminos'>
                    <input type='checkbox' value="1" name='checkbox' required />
                    <p>I agree to <span>the terms of use</span> and <span>privacy policy</span></p>
                </div>
                <br />
                <a href="/login"><button type='button' className='return'>return</button></a>
                <button type='submit' className='next'>Register</button>
            </form>
        </div>
    );
}

export default SignupBody;