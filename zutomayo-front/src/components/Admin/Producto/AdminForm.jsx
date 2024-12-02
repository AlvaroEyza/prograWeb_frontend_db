import { useState, useEffect } from 'react'
import './AdminForm.css'

const AdminForm = ({ id }) => {
    const productoDefault = {
        id: 0,
        nombre: '',
        imagen: '',
        tipo: '',
        precio: '',
        stock: ''
    }

    const [producto, setProducto] = useState(productoDefault)

    useEffect(() => {
        if (id && id > 0)
        {
            fetch(`https://zutomayo-2024-backend.azurewebsites.net/music_movie/${id}`)
                .then(response => response.json())
                .then(data => setProducto(data));
            }
    },[id])

    const handleSubmit = async (event) => {

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }

        if (producto.id > 0) {
            payload.method = 'PUT';
        }

        const result = await fetch('https://zutomayo-2024-backend.azurewebsites.net/music_movie',payload);

        console.log({result})

        alert('Producto guardado correctamente')
        event.preventDefault()
    }

    return (
        <div className='Form'>
            <h4>Complete los datos del producto: </h4>
            <form onSubmit={() => handleSubmit()} action="/administrador">
                <label>Nombre: </label>
                <br/>
                <input type="text" name="nombre" required
                    value={producto.nombre} onChange={e => setProducto({...producto, nombre: e.target.value})}/><br/><br/>
                <label>URL Imagen: </label>
                <br/>
                <input type="text" name="imagen" required
                    value={producto.imagen} onChange={e => setProducto({...producto, imagen: e.target.value})}/><br/><br/>
                <label>Tipo: </label>
                <br/>
                <input type="text" name="tipo" required 
                    value={producto.tipo} onChange={e => setProducto({...producto, tipo: e.target.value})}/><br/><br/>
                <label>Precio: </label>
                <br/>
                <input type="text" name="precio" required
                    value={producto.precio} onChange={e => setProducto({...producto, precio: e.target.value})}/><br/><br/>
                <label>Stock: </label>
                <br/>
                <input type="text" name="stock" required
                    value={producto.stock} onChange={e => setProducto({...producto, stock: e.target.value})}/><br/><br/>
                <br/>
                <button type="submit">AGREGAR</button>
            </form>
        </div>
    );
}

export default AdminForm;