import './MyAccount.css'
import MyAccountHeader from './MyAccountHeader';
import MyAccountBody from './MyAccountBody';

const MyAccount = () => {
    return(
        <div className='MyAccount'>
            <MyAccountHeader/>
            <MyAccountBody/>
        </div>
    )
}

export default MyAccount;