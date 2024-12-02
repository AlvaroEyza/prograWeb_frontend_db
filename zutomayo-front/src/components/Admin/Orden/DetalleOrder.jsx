import './DetalleOrder.css';
import { useState, useEffect } from 'react';

const DetalleOrder = ({ id }) => {
    const [orden, setOrden] = useState(null);
    const [usuario, setUsuario] = useState(null);

    const cargarOrden = async () => {
        await fetch(`https://zutomayo-2024-backend.azurewebsites.net/orden/${id}`)
            .then(response => response.json())
            .then(data => {
                setOrden(data);
                cargarDatosUsuario(data.idUsuario); // Cargar datos del usuario después de obtener la orden
            });
    };

    const cargarDatosUsuario = async (idUsuario) => {
        await fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${idUsuario}`)
            .then(response => response.json())
            .then(data => setUsuario(data));
    };

    useEffect(() => {
        cargarOrden();
    }, [id]);

    return (
        orden && (
            <div className="DetalleOrden">
                <div className='Order'>
                    <a href='/administrador/orders'><h2>Order: {orden.id}</h2></a>
                    <h3>Total: ¥ {parseInt(orden.subtotal, 10).toLocaleString('en-US')}</h3>
                </div>
                <div className='OrderTabla'>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID Item</th>
                                <th>Nombre Item</th>
                                <th>Imagen Item</th>
                                <th>Tipo Item</th>
                                <th>Precio x Item</th>
                                <th>Cantidad Item</th>
                                <th>Precio total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orden.items?.map(item => {
                                let subtotal = parseInt(item.precio) * parseInt(item.cantidad);
                                let subtotalformato = subtotal.toLocaleString('en-US');
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nombre}</td>
                                        <td><img src={item.imagen} alt={item.nombre} /></td>
                                        <td>{item.tipo}</td>
                                        <td>¥ {parseInt(item.precio, 10).toLocaleString('en-US')}</td>
                                        <td>{item.cantidad}</td>
                                        <td>¥ {subtotalformato}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className='InfoUsuario'>
                    <h4>User Info</h4>
                    <hr></hr>
                    {usuario && (
                        <div className='UsuarioIn'>
                            <div className='DatosUsuario'>
                                <h4>Email: </h4>
                                <p>{usuario.email}</p>
                            </div>
                            <div className='DatosUsuario'>
                                <h4>Surname: </h4>
                                <p>{usuario.surname}</p>
                            </div>
                            <div className="DatosUsuario">
                                <h4>Name: </h4>
                                <p>{usuario.name}</p>
                            </div>
                            <div className="DatosUsuario">
                                <h4>Phone Prefix: </h4>
                                <p>{usuario.prefijo}</p>
                            </div>
                            <div className="DatosUsuario">
                                <h4>Phone Number: </h4>
                                <p>{usuario.telefono}</p>
                            </div>
                        </div>
                    )}
                </div>
                <br /><br />
            </div>
        )
    );
};

export default DetalleOrder;