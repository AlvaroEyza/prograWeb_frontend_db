import { useState, useEffect } from 'react'
import './ShippingForm.css'

const ShippingForm = ({id}) => {
    const profileDefault = {
        id: 0,
        street: '',
        city: '',
        country: '',
        zipCode: ''
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
        <div className='ShippingForm'>
            <form onSubmit={() => handleSubmit()} action="/MyAccount/Order-History">
                <label>Street: </label>
                <br/>
                <input type="text" name="street" required
                    value={usuario.street} onChange={e => setUsuario({...usuario, street: e.target.value})}/><br/><br/>
                <label>City: </label>
                <br/>
                <input type="text" name="city" required
                    value={usuario.city} onChange={e => setUsuario({...usuario, city: e.target.value})}/><br/><br/>
                <label>Country: </label>
                <br/><br/>
                <select name="country" required 
                    value={usuario.country} onChange={e => setUsuario({...usuario, country: e.target.value})}>
                    <option value="">Select country</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Chile">Chile</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Great Britain">Great Britain</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Korea">Korea</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Norway">Norway</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Spain">Spain</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Thailand">Thailand</option>
                    <option value="United States">United States</option>
                </select>
                <br/> <br/>
                <label>Zip Code: </label>
                <br/>
                <input type="text" name="zipCode" required pattern="\d{1,9}" maxLength="5"
                    value={usuario.zipCode} onChange={e => setUsuario({...usuario, zipCode: e.target.value})}/><br/><br/>
                <button type="submit">GUARDAR</button>
            </form>
        </div>
    );
}

export default ShippingForm;