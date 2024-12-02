import { useState, useEffect } from "react";
import './PasswordBody.css';
import PasswordForm from "./PasswordForm";

const PasswordBody = () => {
    const [usuario, setUsuario] = useState();
    const [verFormulario, setVerFormulario] = useState(false);

    const handleVerFormulario = () => {
        setVerFormulario(!verFormulario);
    };

    const handleCerrarFormulario = () => {
        setVerFormulario(false);
    };

    const userId = localStorage.getItem('userId');

    const cargarContraseña = async () => {
        await fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${userId}`)
            .then(response => response.json())
            .then(data => setUsuario(data));
    };

    useEffect(() => {
        cargarContraseña();
    }, [userId]);

    return (
        <div className="Pass">
            {usuario && (
                <div className="UsuarioPassword">
                    <div className="passUsuario">
                        <h4>Password: </h4>
                        <p>********</p>
                    </div>
                </div>
            )}
            <button onClick={handleVerFormulario} className='agregar'>EDITAR INFORMACION</button>
            {verFormulario && <PasswordForm id={userId} onClose={handleCerrarFormulario} />}
        </div>
    );
};

export default PasswordBody;