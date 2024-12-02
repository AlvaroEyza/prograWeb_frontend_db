import { useState, useEffect } from "react"
import './ProfileBody.css'
import ProfileForm from "./ProfileForm";

const ProfileBody = () => {
    const [usuario, setUsuario] = useState();
    const [verFormulario, setVerFormulario] = useState(false)

    const handleVerFormulario = () => {
        setVerFormulario(!verFormulario)
    }

    const userId = localStorage.getItem('userId');

    const cargarDatosUsuario = async () => {
        await fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${userId}`)
            .then(response => response.json())
            .then(data => setUsuario(data));
    };

    useEffect(() => {
        cargarDatosUsuario();
    }, [userId]);

    return(<div className="Perf">{
        usuario && (
            <div className="UsuarioPerfil">
                <div className="datosPerfil">
                    <h4>Email: </h4>
                    <p>{usuario.email}</p>
                </div>
                <div className="datosPerfil">
                    <h4>Surname: </h4>
                    <p>{usuario.surname}</p>
                </div>
                <div className="datosPerfil">
                    <h4>Name: </h4>
                    <p>{usuario.name}</p>
                </div>
                <div className="datosPerfil">
                    <h4>Phone Prefix: </h4>
                    <p>{usuario.prefijo}</p>
                </div>
                <div className="datosPerfil">
                    <h4>Phone Number: </h4>
                    <p>{usuario.telefono}</p>
                </div>
                <div className="datosPerfil">
                    <h4>Birthday: </h4>
                    <p>{usuario.cumple}</p>
                </div>
                <div className="datosPerfil">
                    <h4>Sex: </h4>
                    <p>{usuario.sexo}</p>
                </div>

            </div>
        )}
        <button onClick={() => handleVerFormulario()} className='agregar'>EDITAR INFORMACION</button>
                {
                    verFormulario && <ProfileForm id={userId} />
                }
        </div>
    )
}

export default ProfileBody

