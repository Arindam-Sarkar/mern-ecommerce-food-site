import './App.css';
import NavbarComp from './components/navbar/NavbarComp';
import { Route, Routes } from "react-router-dom";
import Pizza from './pages/pizza/Pizza'
import Sides from './pages/sides/Sides'
import Desserts from './pages/desserts/Desserts'
import Drinks from './pages/drinks/Drinks';


import Payment from './pages/payment/Payment';
import Cart from './pages/cart/Cart';
import OrderDetails from './pages/orderDetails/OrderDetails';


import Product from './components/product/Product';
import Search from './pages/search/Search';



function App() {
  return (
    <>
      <div>
        <NavbarComp />

        <Routes >
          <Route path='/' element={< Pizza />} />
          <Route path='/pizza' element={< Pizza />} />
          <Route path='/sides' element={< Sides />} />
          <Route path='/desserts' element={< Desserts />} />
          <Route path='/drinks' element={< Drinks />} />
          <Route path='/search' element={< Search />} />
        </Routes>
      </div>


    </>
  );
}

export default App;
