import './AdminBodyOrd.css'
import {useState, useEffect} from 'react';


const AdminBodyOrd = () => {

    const [ordenes, setOrdenes] = useState()

    const cargarOrdenes = async () => {
        await fetch('https://zutomayo-2024-backend.azurewebsites.net/orden')
            .then(response => response.json())
            .then(data => setOrdenes(data))
    }

    useEffect(() => {
        cargarOrdenes();
    },[])


    return (
        <div className='AdminBodyOrd'>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID Orden</th>
                        <th>Items</th>
                        <th>Subtotal</th>
                        <th>ID Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ordenes?.map(orden => (
                            <tr key={orden.id}>
                                <td><a href={`/administrador/orders/${orden.id}`}>{orden.id}</a></td>
                                <td>{orden.items.length}</td>
                                <td>{parseInt(orden.subtotal, 10).toLocaleString('en-US')}</td>
                                <td>{orden.idUsuario}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
                <br/><br/>        
        </div>

    );
}

export default AdminBodyOrd