import { useState, useEffect } from 'react';
import { useAuth } from '../../Login/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProdContent.css';

const ProdContent = ({ onUpdateCart }) => {
    const [carrito, setCarrito] = useState({ items: [], subtotal: 0 });
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const fetchItemsCarrito = async () => {
        const response = await fetch('https://zutomayo-2024-backend.azurewebsites.net/carrito');
        const data = await response.json();
        setCarrito(data);
        onUpdateCart(data); 
    };

    const onLoad = async () => {
        fetchItemsCarrito();
    };

    const handleDelete = async (id) => {
        const payload = { method: 'DELETE' };
        const result = await fetch(`https://zutomayo-2024-backend.azurewebsites.net/carrito/${id}`, payload);

        if (result) {
            console.log(result);
            alert('Producto eliminado correctamente');
            await fetchItemsCarrito();
        }
    };

    const handleUpdate = async (id, cantidad) => {
        const payload = { 
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cantidad })
        };

        const result = await fetch(`https://zutomayo-2024-backend.azurewebsites.net/carrito/${id}`, payload);

        if (result) {
            await fetchItemsCarrito();
        }
    };

    const aumentar = async (item) => {
        const nuevaCantidad = parseInt(item.cantidad) + 1;
        await handleUpdate(item.id, nuevaCantidad);
    };

    const disminuir = async (item) => {
        const nuevaCantidad = parseInt(item.cantidad) > 1 ? parseInt(item.cantidad) - 1 : 1;
        await handleUpdate(item.id, nuevaCantidad);
    };

    const handleContinuePurchase = () => {
        if (isAuthenticated) {
            navigate('/purchase');
        } else {
            alert('You need to be loged in to make a purchase.');
            navigate('/login');
        }
    };

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <>
            {carrito.items?.map((item) => {
                let subtotal = parseInt(item.precio) * parseInt(item.cantidad);
                let subtotalformato = subtotal.toLocaleString('en-US');

                return (
                    <div key={item.id}>
                        <div className='ProductoCart'>
                            <img src={item.imagen} />
                            <div className="ProdCartInfo">
                                <p>{item.nombre}</p>
                                <p>¥ {parseInt(item.precio, 10).toLocaleString('en-US')}</p>
                                <div className='Subtotal'>
                                    <div className='cant'>
                                        <button className='menos' onClick={() => disminuir(item)}>-</button>
                                        <p>Cantidad: {item.cantidad}</p>
                                        <button onClick={() => aumentar(item)}>+</button>
                                    </div>
                                    <p>Subtotal: ¥ {subtotalformato} </p>
                                </div>
                                <div className='eliminar'>
                                    <button onClick={() => handleDelete(item.id)}>delete</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                );
            })}
            {carrito.items.length > 0 && (
                <>
                    <div className='Total'>
                        <p>Total: </p>
                        <p>¥ {carrito.subtotal.toLocaleString('en-US')}</p>
                    </div>
                    <div className='additionalInfo'>
                        <div className='ships'>
                            <h3>Ships within 1-7 business days from the day after the order is confirmed</h3>
                        </div>
                        <p>* Until the order is confirmed, the stock is not secured even if the item is in the cart. Please note the following in advance.</p>
                        <p>・ Items that are low in stock may be out of stock during the ordering process.</p>
                        <p>・ If the sales period of the ordered product has expired during the order procedure, you will not be able to place an order.</p>
                    </div>
                    <div className='botones'>
                        <a href="/"><button className='shopping'>Continue shopping</button></a>
                        <button className='purchase' onClick={handleContinuePurchase}>Continue Purchase</button>
                    </div>
                </>
            )}
        </>
    );
};

export default ProdContent;