import './AdminHeader.css'

const AdminHeader = () => {
    return(
        <>
        <div className="AdminHeader">
            <h2>Administracion</h2>            
        </div>
        <hr></hr>
        <div className="AdminNav">
            <nav>
                <h4><a href='/administrador'>Productos</a></h4>
                <h4><a href='/administrador/orders'>Ordenes</a></h4>
            </nav>
        </div>
        <hr></hr>
        </>
    )
}

export default AdminHeader;