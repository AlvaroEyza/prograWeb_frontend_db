import { useState } from 'react';
import './HeaderContainer.css';
import Logo from '../../../assets/title.svg';
import Lupa from '../../../assets/busqueda.png';
import Carro from '../../../assets/carrito.png';
import Cerrar from '../../../assets/X.png';
import Barras from '../../../assets/barras.png';
import Drawer from '../Drawer/Drawer.jsx';
import { useAuth } from '../../Login/AuthContext.jsx';

const HeaderContainer = () => {
    const [verDrawer, setVerDrawer] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const imgs = [Barras, Cerrar];
    const { isAuthenticated, userRole } = useAuth();

    const cambioImagen = () => {
        setImgIndex(prevIndex => (prevIndex + 1) % imgs.length);
    };

    const handleVerDrawer = () => {
        setVerDrawer(!verDrawer);
        cambioImagen();
    }

    return (
        <section>
            <div className='izquierda'>
                <button onClick={handleVerDrawer}><img src={imgs[imgIndex]} className='Barras' /></button>
                {verDrawer && <Drawer />}
            </div>
            <div className='centro'>
                <a href='/'><img src={Logo} className='LogoZutomayo' /></a>
            </div>
            <div className='derecha'>
                <a href='/search'><img src={Lupa} className='BusquedaDerecha' /></a>
                {(!isAuthenticated || userRole === 'user') && (
                    <a href='/cart'><img src={Carro} className='BusquedaDerecha' /></a>
                )}
            </div>
        </section>
    );
}

export default HeaderContainer;