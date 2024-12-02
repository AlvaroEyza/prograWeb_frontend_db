import './OrderHistory.css'
import OrderHistHeader from './OrderHistHeader';
import OrderHistBody from './OrderHistBody';

const OrderHistory = () => {
    return(
        <div className='OrderHistory'>
            <OrderHistHeader/>
            <OrderHistBody/>
        </div>
    )
}

export default OrderHistory;