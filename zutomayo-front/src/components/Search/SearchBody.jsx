import './SearchBody.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBody = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const cargarProductos = async () => {
        await fetch('https://zutomayo-2024-backend.azurewebsites.net/music_movie')
            .then(response => response.json())
            .then(data => setProductos(data));
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            alert('Please enter a search term.');
            return;
        }

        let foundProduct;
        if (isNaN(searchTerm)) {
            foundProduct = productos.find(product => 
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            foundProduct = productos.find(product => 
                product.id.toString() === searchTerm
            );
        }

        if (foundProduct) {
            navigate(`/product/${foundProduct.id}`);
        } else {
            alert('Product not found');
        }
    };

    return (
        <div className='searchbody'>
            
            <p>Please write down and press the search button.</p>
            <div className='makeSearch'>
            <input 
                type='text' 
                placeholder='Free word input' 
                value={searchTerm} 
                onChange={handleInputChange} 
            />
            <button onClick={handleSearch}>Search</button>
            </div>
            <hr />
            
        </div>
    );
};

export default SearchBody;