import './AdminBody.css'
import {useState, useEffect} from 'react';
import AdminForm from './AdminForm';

const AdminBody = () => {

    const [productos, setProductos] = useState()
    const [verFormulario, setVerFormulario] = useState(false)
    const [idEditar, setIdEditar] = useState(0)

    const handleVerFormulario = () => {
        setVerFormulario(!verFormulario)
    }

    const cargarProductos = async () => {
        await fetch('https://zutomayo-2024-backend.azurewebsites.net/music_movie')
            .then(response => response.json())
            .then(data => setProductos(data))
    }

    const handleDelete = async (id) => {
        const payload = { method: 'DELETE' };
        const result = await fetch(`https://zutomayo-2024-backend.azurewebsites.net/music_movie/${id}`, payload);

        if (result) {
            console.log(result);
            alert('Producto eliminado correctamente');
            await cargarProductos();
        }
    };

    const handleEditar = async (id) => {
        setIdEditar(id)
        setVerFormulario(true)
    }

    useEffect(() => {
        cargarProductos();
    },[])


    return (
        <div className='Admin'>
        <div className="AdminBody">
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos?.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td><img src={producto.imagen}/></td>                                
                                <td>{producto.tipo}</td>
                                <td>{parseInt(producto.precio, 10).toLocaleString('en-US')}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
                                    &nbsp;<button onClick={() => handleEditar(producto.id)} className='editar'>Editar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
                <br/><br/>        
        </div>
            <button onClick={() => handleVerFormulario()} className='agregar'>AGREGAR NUEVO</button>
                {
                    verFormulario && <AdminForm id={idEditar} />
                }
        </div>
    );
}

export default AdminBody