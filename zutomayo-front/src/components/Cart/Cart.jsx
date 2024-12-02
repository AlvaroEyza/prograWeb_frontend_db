import './Cart.css';
import { useState } from 'react';
import CartHeader from './CartHeader';
import CartBody from './CartBody';
import ProdContent from './Content/ProdContent';

const Cart = () => {
    const [carritoVacio, setCarritoVacio] = useState(true);

    const handleUpdateCart = (newCarrito) => {
        setCarritoVacio(newCarrito.items.length === 0);
    };

    return (
        <div className='Cart'>
            <CartHeader />
            <ProdContent onUpdateCart={handleUpdateCart} />
            {carritoVacio && <CartBody />}
        </div>
    );
};

export default Cart;