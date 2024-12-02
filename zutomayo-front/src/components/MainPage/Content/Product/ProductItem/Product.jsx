import './Product.css'

const Product = ({producto}) =>{

    return(

            <>
                <a href={`/product/${producto.id}`}>
                <article key={producto.id}>
                    <img src={producto.imagen}/>
                    <h3>{producto.nombre}</h3>
                    <p>¥ {parseInt(producto.precio, 10).toLocaleString('en-US')}</p>
                </article>
                </a>
            </>
    )
}
export default Product