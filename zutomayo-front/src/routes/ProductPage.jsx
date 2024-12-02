import { useParams } from 'react-router-dom';
import Post from '../components/MainPage/Content/Product/ProductPost/Post.jsx';
import Header from '../components/MainPage/Header/Header.jsx'
import Footer from '../components/MainPage/Footer/Footer.jsx'

const ProductPage = () => {

    const params = useParams();

    const id = params.id;

    return(
        <>
            <Header/>
            <Post id={id} />
            <Footer/>
        </>
        
    )   
}

export default ProductPage;