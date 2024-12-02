import './CartBody.css'

const CartBody = () => {
    return(
        <div className='Cartbody'>
            <p>There are currently no items in the cart</p>
            <a href="/"><button>Continue shopping</button></a>
        </div>
    )
}

export default CartBody