import './Post.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ id }) => {
    const [cant, setCant] = useState(1);
    const [receivingMethod, setReceivingMethod] = useState('');
    const navigate = useNavigate();

    const aumentar = () => {
        setCant(cant => cant + 1);
    };

    const disminuir = () => {
        setCant(cant > 1 ? cant - 1 : 1);
    };

    const [producto, setProducto] = useState();

    const cargarProducto = async () => {
        await fetch(`https://zutomayo-2024-backend.azurewebsites.net/music_movie/${id}`)
            .then(response => response.json())
            .then(data => setProducto(data));
    };

    useEffect(() => {
        cargarProducto();
    }, [id]);

    const handleReceivingMethodChange = (event) => {
        setReceivingMethod(event.target.value);
    };

    const addToCart = async (producto, cantidad) => {

        if (receivingMethod !== '1' && receivingMethod !== '2') {
            alert('Please select a valid receiving method.');
            return;
        }
        else{
        const item = {
            ...producto,
            cantidad: cantidad
        };

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        };

        const result = await fetch('https://zutomayo-2024-backend.azurewebsites.net/carrito', payload);
        console.log({result})
        alert('Producto añadido al carrito correctamente');
        navigate('/cart')
        }
    };

    return (
        producto && (
            <div className="Post">
                <img src={producto.imagen} key={producto.id} />
                <div className="postinfo">
                    <h2>{producto.nombre}</h2>
                    <p>{producto.tipo}</p>
                    <h3>¥ {parseInt(producto.precio, 10).toLocaleString('en-US')} <span>TAX IN</span></h3>
                    <hr />
                    <h4>How to receive the item</h4>
                    <select name="method" value={receivingMethod} onChange={handleReceivingMethodChange} required>
                        <option value>Please select a receiving method</option>
                        <option value="1">Delivery receipt</option>
                        <option value="2">Miyagi: Sendai Sun Plaza</option>
                    </select>
                    <hr />
                    <h4>Quantity</h4>
                    <div className='cantidad'>
                        <button className='menos' onClick={() => disminuir()}>-</button>
                        <h3>{cant}</h3>
                        <button onClick={() => aumentar()}>+</button>
                    </div>
                    <button className='cart' onClick={() => addToCart(producto, cant)}>Add to cart</button>
                </div>
            </div>
        )
    );
};

export default Post;