import './App.css';
import NavbarComp from './components/navbar/NavbarComp';
import { Route, Routes } from "react-router-dom";
import Pizza from './pages/pizza/Pizza'
import Pasta from './pages/pasta/Pasta'
import Burger from './pages/burger/Burger'
import Beverage from './pages/beverage/Beverage'
import Payment from './pages/payment/Payment';

function App() {
  return (
    <>

      <Routes >
        <Route path='/' element={< Payment />} />
        {/* <Route path='/pizza' element={< Pizza />} />
        <Route path='/pasta' element={< Pasta />} />
        <Route path='/burger' element={< Burger />} />
        <Route path='/beverage' element={< Beverage />} /> */}
      </Routes>

    </>
  );
}

export default App;
