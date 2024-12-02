import './PurchaseBody.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';

const PurchaseBody = () => {
    const [carrito, setCarrito] = useState({ items: [], subtotal: 0 });
    
    const { isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const profileDefault = {
        id: 0,
        street: '',
        city: '',
        country: '',
        zipCode: '',
        cardholderName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    }

    const [usuario, setUsuario] = useState(profileDefault);

    useEffect(() => {
        if (userId && userId > 0)
        {
            fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${userId}`)
                .then(response => response.json())
                .then(data => setUsuario(data));
            }
    },[userId])
    

    const cargarDatosUsuario = async () => {
        await fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${userId}`)
            .then(response => response.json())
            .then(data => setUsuario({
                ...data,
                cardNumber: formatCardNumber(data.cardNumber),
                expiry: formatExpiryDate(data.expiry)
            }));
    };

    const fetchItemsCarrito = async () => {
        const response = await fetch('https://zutomayo-2024-backend.azurewebsites.net/carrito');
        const data = await response.json();
        setCarrito(data);
    };

    const onLoad = async () => {
        fetchItemsCarrito();
        cargarDatosUsuario();
    };

    const formatCardNumber = (value) => {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (value) => {
        const cleaned = value.replace(/\D/g, ''); // Elimina todo lo que no sea dígito
        const match = cleaned.match(/^(\d{0,2})(\d{0,2})$/);
        if (match) {
            let part1 = match[1];
            let part2 = match[2];

            if (part1.length === 2) {
                const month = parseInt(part1, 10);
                if (month < 1 || month > 12) {
                    part1 = '12'; // Ajusta el mes a 12 si es inválido
                }
            }

            if (part2.length === 2) {
                const year = parseInt(part2, 10);
                if (year < 25) {
                    part2 = '25'; // Ajusta el año a 25 si es inválido
                } else if (year > 31) {
                    part2 = '31'; // Ajusta el año a 31 si es inválido
                }
            }

            if (part2) {
                return `${part1}/${part2}`;
            }
            return part1;
        }
        return value;
    };

    useEffect(() => {
        if (userId && userId > 0) {
            fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${userId}`)
                .then(response => response.json())
                .then(data => setUsuario({
                    ...data,
                    cardNumber: formatCardNumber(data.cardNumber),
                    expiry: formatExpiryDate(data.expiry)
                }));
        }
    }, [userId]);

    const actualizarStock = async (carrito) => {
        const items = carrito.items;
        for (const index in items) {
            const item = items[index];
            const payload = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cantidadComprada: item.cantidad })
            };
            try {
                const result = await fetch(`https://zutomayo-2024-backend.azurewebsites.net/music_movie/${item.id}`, payload);
                if (!result.ok) {
                    console.error(`Error al actualizar el stock del producto ${item.id}`);
                }
            } catch (error) {
                console.error(`Error de red al actualizar el stock del producto ${item.id}:`, error);
            }
        }
    };

    const handleDeleteCarrito = async () => {
        const payload = { method: 'DELETE' };
        const result = await fetch(`https://zutomayo-2024-backend.azurewebsites.net/carrito`, payload);

        if (result) {
            console.log(result);
        }
    };

    const handleSubmit = async () => {

        const payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }

        const result = await fetch('https://zutomayo-2024-backend.azurewebsites.net/usuario',payload);

        console.log({result})
    }

    const handlePurchase = async (carrito) => {

        if (isAuthenticated){

        const orden = {
            id: 0,
            items: carrito.items,
            subtotal: carrito.subtotal,
            idUsuario: userId 
        };
        
        const payload = { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orden)
        };

        const result = await fetch(`https://zutomayo-2024-backend.azurewebsites.net/orden`, payload);

        if (result.ok) {
            actualizarStock(carrito);
            handleDeleteCarrito();
            handleSubmit();
            console.log(result);
            alert('Compra realizada correctamente');
            await fetchItemsCarrito();
            navigate('/MyAccount/Order-History');
        }
        }else{
            alert('You need to be loged in to make a purchase.');
            navigate('/Login');
        }

    };

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <div className='PBody'>
        <div className='Purchasebody'>
            <div className='Purchaseinfo'>
                <h3>Shipping Address</h3>
                <p>Please register customer shipping information to finish your purchase.</p>
            </div>
            <br/>
            <form onSubmit={(e) => { e.preventDefault(); handlePurchase(carrito); }}>
            <div className='Pdatos'>
                <div className='ShippingInfor'>
                <label>Street <span>* required</span></label>
                <br/>
                <input type="text" name="street" placeholder='Street' required
                    value={usuario.street} onChange={e => setUsuario({...usuario, street: e.target.value})}/>
                <br/><br/>
                <label>City <span>* required</span></label>
                <br/>
                <input type="text" name="city" placeholder='City' required
                    value={usuario.city} onChange={e => setUsuario({...usuario, city: e.target.value})}/>
                <br/><br/>
                <label>Country <span>* required</span></label>
                <br/>
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
                <br/><br/>
                <label>Zip Code <span>* required</span></label>
                <br/>
                <input type="text" name="zipCode" placeholder='Zip Code' required pattern="\d{1,9}" maxLength="5"
                    value={usuario.zipCode} onChange={e => setUsuario({...usuario, zipCode: e.target.value})}/>
                <br/><br/>
                </div>
                <div className='Purchaseinfo'>
                    <h3>Payment method</h3>
                </div>
                <label>Cardholder name <span>* required</span></label>
                <br/>
                <input type="text" name="cardholderName" placeholder='Name' required
                    value={usuario.cardholderName} onChange={e => setUsuario({...usuario, cardholderName: e.target.value})}/>
                <br/><br/>
                <label>CardNumber <span>* required</span></label>
                <br/>
                <input type="text" name="cardNumber" placeholder='1234 5678 2716 1101' required maxLength="19"
                        value={usuario.cardNumber} onChange={e => setUsuario({ ...usuario, cardNumber: formatCardNumber(e.target.value) })} />
                <br/><br/>
                <div className='pcard'>
                    <label>Expiry Date <span>* required</span></label>
                    <label>CVV <span>* required</span></label>
                </div>
                <div className='Pdoble'>
                <input type="text" name="expiry" placeholder='MM/YY' required maxLength="5"
                            value={usuario.expiry} onChange={e => setUsuario({ ...usuario, expiry: formatExpiryDate(e.target.value) })} />
                    <input type="text" name="cvv" placeholder='123' required pattern="\d{1,9}" maxLength="3"
                    value={usuario.cvv} onChange={e => setUsuario({...usuario, cvv: e.target.value})}/>
                </div>
            </div>
            <br/><br/><button className='return' type='button' onClick={() => navigate('/cart')}>return</button>
            
            <button className='bPurchase' type = "submit">Purchase</button>
            </form>
        </div>
        <div className='Summary'>
            <h4>Order Summary</h4>
            <hr></hr>
        {carrito.items?.map((item) => {
                let subtotal = parseInt(item.precio) * parseInt(item.cantidad);
                let subtotalformato = subtotal.toLocaleString('en-US');

                return (
                    <div>
                        <div className='SummaryCart'>
                            <img src={item.imagen} />
                            <div className="SummaryInfo">
                                <p>x {item.cantidad}</p>  
                                <p>Subtotal: ¥ {subtotalformato} </p>
                            </div>
                        </div>
                        <hr />
                    </div>
                );
            })}
            <p>Total: ¥ {carrito.subtotal.toLocaleString('en-US')}</p>
        </div>
        </div>
    );
}

export default PurchaseBody;