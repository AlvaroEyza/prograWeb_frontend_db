import { useState, useEffect } from "react";
import './OrderHistBody.css';
import ShippingForm from "./ShippingForm";

const OrderHistBody = () => {
    const [usuario, setUsuario] = useState();
    const [ordenes, setOrdenes] = useState([]);
    const [verFormulario, setVerFormulario] = useState(false);

    const handleVerFormulario = () => {
        setVerFormulario(!verFormulario);
    };

    const userId = localStorage.getItem('userId');

    const cargarDatosUsuario = async () => {
        await fetch(`https://zutomayo-2024-backend.azurewebsites.net/usuario/${userId}`)
            .then(response => response.json())
            .then(data => setUsuario(data));
    };

    const cargarOrdenes = async () => {
        await fetch('https://zutomayo-2024-backend.azurewebsites.net/orden')
            .then(response => response.json())
            .then(data => {const ordenesUsuario = data.filter(orden => orden.idUsuario === userId);
                setOrdenes(ordenesUsuario);
            });
    };

    useEffect(() => {
        cargarDatosUsuario();
    }, [userId]);

    useEffect(() => {
        cargarOrdenes();
    }, []);

    return (
        <div className="OrdenesUsuario">
            <div className='TablaOrdenesUsuario'>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID Orden</th>
                            <th>Nombre Item</th>
                            <th>Imagen</th>
                            <th>Tipo</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad Item</th>
                            <th>Precio Total</th>
                            <th>Total Orden</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes?.map(orden => (
                            orden.items?.map((item, index) => {
                                let subtotal = parseInt(item.precio) * parseInt(item.cantidad);
                                let subtotalformato = subtotal.toLocaleString('en-US');
                                return (
                                    <tr>
                                        {index === 0 && (
                                            <td rowSpan={orden.items.length}>{orden.id}</td>
                                        )}
                                        <td>{item.nombre}</td>
                                        <td><img src={item.imagen} alt={item.nombre} /></td>
                                        <td>{item.tipo}</td>
                                        <td>¥ {parseInt(item.precio, 10).toLocaleString('en-US')}</td>
                                        <td>{item.cantidad}</td>
                                        <td>¥ {subtotalformato}</td>
                                        {index === 0 && (
                                            <td rowSpan={orden.items.length}>¥ {parseInt(orden.subtotal, 10).toLocaleString('en-US')}</td>
                                        )}
                                    </tr>
                                );
                            })
                        ))}
                    </tbody>
                </table>
                <br /><br />
            </div>
            {usuario &&(
            <div className="UsuarioOrdenes">
            <div className="datosEnvio">
                    <h4>Street: </h4>
                    <p>{usuario.street}</p>
                </div>
                <div className="datosEnvio">
                    <h4>City: </h4>
                    <p>{usuario.city}</p>
                </div>
                <div className="datosEnvio">
                    <h4>Country: </h4>
                    <p>{usuario.country}</p>
                </div>
                <div className="datosEnvio">
                    <h4>Zip Code: </h4>
                    <p>{usuario.zipCode}</p>
                </div>
            </div>
            )}
            <button onClick={() => handleVerFormulario()} className='agregar'>EDITAR INFORMACION</button>
                {
                    verFormulario && <ShippingForm id={userId} />
                }
        </div>
    );
};

export default OrderHistBody;