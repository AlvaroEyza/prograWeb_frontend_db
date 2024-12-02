import './SearchHeader.css'
import Cerrar from '../../assets/X.png'

const SearchHeader = () => {
    return(
        <div className='search'>
            <a href='/'><img src={Cerrar}/></a>
            <h2>Search by tag</h2>
            <p> </p>
        </div>
    )
}

export default SearchHeader