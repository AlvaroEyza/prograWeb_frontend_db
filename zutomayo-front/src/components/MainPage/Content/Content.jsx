import './Content.css'
import Slider from './Slider.jsx'
import Gif from '../../../assets/zutomayogif.gif'
import Card from '../../../assets/card.png'
import Music from '../../../assets/music.png'
import Carta from '../../../assets/carta.jpg'
import ProductSection from './Product/ProductSection.jsx'

const Content = () => {
    return(
        <div className='Contenido'>
            <Slider/>
            <img src={Gif} className='gif'/>
            <div className='info'>
                <h4>Yakiyaki Yankee Tour 2</h4>
                <h4>~ Polishing finish by Sunaneko Construction ~</h4>
                <h4>Venue pickup (advance online order) reception-3</h4>
                <h4>Tickets will be accepted from 18:00 on Saturday, October 19th until</h4>
                <h4>23:59 on the day before the first performance of each performance.</h4>
                <span>*Premium members only priority sale: until 17:59 on Sunday, October 20th</span>
                <p>Product receipt</p>
                <h5>10/22 (Tue) 23 (Wed) Shizuoka Act City Hamamatsu Large Hal</h5>
                <h5>10/25 (Fri) Gifu Nagaragawa International Conference Center Main Hall</h5>
                <h5>10/28 (Mon) 29 (Tue) Osaka festival hall</h5>
                <h3>How to order / receive items {'>'}</h3>
                <div className='cuadro'>
                    <p>The total purchase amount of eligible products per transaction</p>
                    <p><h3>Free Shopping Bag</h3> (<span>paper</span> / <span>transparent</span>) (while stocks last) </p>
                </div>
                <h3>Tour merchandise list {'>'}</h3>
            </div>
            <div className='botones'>
                <img src={Card} className='card'/>
                <img src={Music} className='music'/>
            </div>
            <ProductSection/>
            <br/>
            <img src={Carta} className='carta'/>
        </div>
        

    )
}

export default Content;