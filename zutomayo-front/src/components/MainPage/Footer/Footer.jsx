import './Footer.css'
import Logo from '../../../assets/title_foot.svg'

const Footer= () =>{
    return(
        <footer>
            <img src={Logo} className='LogoFooter'/>
            <div className="superior">
                <ul>
                    <li>terms of service</li>
                    <li>shopping guide</li>
                    <li>Frequently Asked Questions Inquiries</li>
                    <li>privacy policy</li>
                    <li>Notation based on the Specified Commercial Transactions Law</li>
                </ul>
            </div>
            <div className="inferior">
            <p>Copyright (c) 2024 Copyright ETB RIGHTS (operated by <span>RENI</span> ) All Rights Reserved All Rights Reserved</p>
            </div>

        </footer>
    )
}

export default Footer;