import NavbarComp from './components/navbar/NavbarComp';
import { Route, Routes } from "react-router-dom";
import Pizza from './pages/pizza/Pizza'
import Sides from './pages/sides/Sides'
import Desserts from './pages/desserts/Desserts'
import Drinks from './pages/drinks/Drinks';

import Payment from './pages/payment/Payment';
import Cart from './pages/cart/Cart';

import Product from './components/product/Product';
import Search from './pages/search/Search';
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp';

import './App.css';
import PaymentPortal from './pages/paymentPortal/PaymentPortal';
import UserAccount from './pages/userAccount/UserAccount';
import PastOrderDetails from './components/pastOrderDetails/PastOrderDetails';
function App() {
  return (
    <>
      <div>
        <NavbarComp />

        <Routes >
          <Route path='/' element={<PastOrderDetails />} />
          <Route path='/pizza' element={< Pizza />} />
          <Route path='/sides' element={< Sides />} />
          <Route path='/desserts' element={< Desserts />} />
          <Route path='/drinks' element={< Drinks />} />
          <Route path='/search' element={< Search />} />
          <Route path='/login' element={< Login />} />
          <Route path='/signup' element={< SignUp />} />
          <Route path='/cart' element={< Cart />} />
          <Route path='/payment' element={< Payment />} />
          <Route path='/paymentPortal' element={< PaymentPortal />} />
          <Route path='/userAccount' element={< UserAccount />} />
        </Routes>
      </div>


    </>
  );
}

export default App;
