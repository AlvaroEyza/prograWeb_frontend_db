import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './components/Login/AuthContext.jsx'
import CartPage from './routes/CartPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import SearchPage from './routes/SearchPage.jsx'
import SignupPage from './routes/SingupPage.jsx'
import ProductPage from './routes/ProductPage.jsx'
import PurchasePage from './routes/PurchasePage.jsx'
import AdminPage from './routes/AdminPage.jsx'
import AdminPageOrders from './routes/AdminPageOrders.jsx'
import OrderDetailPage from './routes/OrderDetailPage.jsx'
import MyAccountPage from './routes/MyAccountPage.jsx'
import ProfilePage from './routes/ProfilePage.jsx'
import PasswordPage from './routes/PasswordPage.jsx'
import OrderHistPage from './routes/OrderHistPage.jsx'

const router = createBrowserRouter([
  {
     path: "/",
     element: <App />
  },
  {
    path: "/cart",
    element: <CartPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/search",
    element: <SearchPage/>
  },
  {
    path: "/sign-up",
    element: <SignupPage/>
  },
  {
    path: "/product/:id",
    element: <ProductPage/>
  },
  {
    path: "/purchase",
    element: <PurchasePage/>
  },
  {
    path: "/administrador",
    element: <AdminPage/>
  },
  {
    path: "/administrador/orders",
    element: <AdminPageOrders/>
  },
  {
    path: "/administrador/orders/:id",
    element: <OrderDetailPage/>
  },
  {
    path: "/MyAccount",
    element: <MyAccountPage/>
  },
  {
    path: "/MyAccount/profile",
    element: <ProfilePage />
  },
  {
    path: "/MyAccount/password",
    element: <PasswordPage />
  }
  ,
  {
    path: "/MyAccount/Order-History",
    element: <OrderHistPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);