import { useState, useEffect } from 'react';
import './PasswordForm.css';

const PasswordForm = ({ id, onClose }) => {
    const profileDefault = {
        id: 0,
        password: ''
    };

    const [usuario, setUsuario] = useState(profileDefault);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mostrarCurrentPassword, setMostrarCurrentPassword] = useState(false);
    const [mostrarNewPassword, setMostrarNewPassword] = useState(false);
    const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);

    useEffect(() => {
        if (id && id > 0) {
            fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${id}`)
                .then(response => response.json())
                .then(data => setUsuario(data));
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (currentPassword !== usuario.password) {
            alert('La contraseña actual no es correcta');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Las nuevas contraseñas no coinciden');
            return;
        }

        const payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...usuario, password: newPassword })
        };

        const result = await fetch('https://zutomayo-2024-backend.azurewebsites.net/usuario', payload);

        console.log({ result });

        alert('Información guardada correctamente');
        onClose(); // Cierra el formulario después de guardar
    };

    return (
        <div className='PasswordForm'>
            <form onSubmit={handleSubmit} action="/MyAccount/password">
                <label>Contraseña actual: </label>
                <br />
                <input
                    type={mostrarCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    required
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                />
                <button type="button" className='mostrar' onClick={() => setMostrarCurrentPassword(!mostrarCurrentPassword)}>
                    {mostrarCurrentPassword ? 'Ocultar' : 'Mostrar'}
                </button>
                <br /><br />
                <label>Nueva contraseña: </label>
                <br />
                <input
                    type={mostrarNewPassword ? "text" : "password"}
                    name="newPassword"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <button type="button" className='mostrar' onClick={() => setMostrarNewPassword(!mostrarNewPassword)}>
                    {mostrarNewPassword ? 'Ocultar' : 'Mostrar'}
                </button>
                <br /><br />
                <label>Confirmar nueva contraseña: </label>
                <br />
                <input
                    type={mostrarConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button type="button" className='mostrar' onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}>
                    {mostrarConfirmPassword ? 'Ocultar' : 'Mostrar'}
                </button>
                <br /><br />
                <button type="submit">GUARDAR</button>
            </form>
        </div>
    );
};

export default PasswordForm;