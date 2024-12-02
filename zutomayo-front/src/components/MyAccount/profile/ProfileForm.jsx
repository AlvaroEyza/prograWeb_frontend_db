import { useState, useEffect } from 'react'
import './ProfileForm.css'

const ProfileForm = ({id}) => {
    const profileDefault = {
        id: 0,
        email: '',
        surname: '',
        name: '',
        telefono: '',
        cumple: '',
        sexo: ''
    }

    const [usuario, setUsuario] = useState(profileDefault);

    useEffect(() => {
        if (id && id > 0)
        {
            fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${id}`)
                .then(response => response.json())
                .then(data => setUsuario(data));
            }
    },[id])

    const handleSubmit = async (event) => {

        const payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }

        const result = await fetch('https://zutomayo-2024-backend.azurewebsites.net/usuario',payload);

        console.log({result})

        alert('Información guardada correctamente')
        event.preventDefault()
    }

    return (
        <div className='ProfileForm'>
            <form onSubmit={() => handleSubmit()} action="/MyAccount/profile">
                <label>Email: </label>
                <br/>
                <input type="text" name="email" required
                    value={usuario.email} onChange={e => setUsuario({...usuario, email: e.target.value})}/><br/><br/>
                <label>Surname: </label>
                <br/>
                <input type="text" name="surname" required
                    value={usuario.surname} onChange={e => setUsuario({...usuario, surname: e.target.value})}/><br/><br/>
                <label>Name: </label>
                <br/>
                <input type="text" name="name" required 
                    value={usuario.name} onChange={e => setUsuario({...usuario, name: e.target.value})}/><br/><br/>
                <label>Phone Prefix:</label>
                <br/><br/>
                <select name='prefijo' value={usuario.prefijo} onChange={e => setUsuario({...usuario, prefijo: e.target.value})}>
                            <option value="1">US</option>
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
                <br/><br/>
                <label>Phone Number: </label>
                <br/>
                <input type="text" name="telefono" required
                    value={usuario.telefono} onChange={e => setUsuario({...usuario, telefono: e.target.value})} pattern="\d{1,9}" maxLength="9"/><br/><br/>
                <label>Birthday: </label>
                <br/>
                <input type="date" name="cumple" required
                    value={usuario.cumple} onChange={e => setUsuario({...usuario, cumple: e.target.value})}/><br/><br/>
                <br/>
                <label>Sex: </label>
                <br/>
                <input type="text" name="sexo" required
                    value={usuario.sexo} onChange={e => setUsuario({...usuario, sexo: e.target.value})}/><br/><br/>
                <br/>
                <button type="submit">GUARDAR</button>
            </form>
        </div>
    );
}

export default ProfileForm;