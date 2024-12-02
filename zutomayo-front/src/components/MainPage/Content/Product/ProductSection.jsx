import { useEffect, useState } from 'react'
import Product from "./ProductItem/Product.jsx";
import './ProductSection.css';

const ProductSection = () => {
    const [productos, setProductos] = useState()

    const cargarProductos = async () => {
        await fetch('https://zutomayo-2024-backend.azurewebsites.net/music_movie')
            .then(response => response.json())
            .then(data => setProductos(data))
    }

    useEffect(() => {
        cargarProductos();
    },[])


    return(
        <div className='productos'>                                                                                                 
                {
                    productos?.map(producto => 
                        <Product key = {producto.id}
                        producto ={producto}
                        />                  
                )
                }
        </div>
    )
}

export default ProductSection

