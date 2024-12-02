import { useParams } from 'react-router-dom';
import Header from '../components/MainPage/Header/Header.jsx';
import Footer from '../components/MainPage/Footer/Footer.jsx';
import DetalleOrder from '../components/Admin/Orden/DetalleOrder.jsx';

const OrderDetailPage = () => {

    const params = useParams();

    const id = params.id;

    return(
        <>
            <Header/>
            <DetalleOrder id={id} />
            <Footer/>
        </>
        
    )   
}

export default OrderDetailPage;