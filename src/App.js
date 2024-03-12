import './App.css';
// import './assets/css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NavBar } from './components/NavBar';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
// import VoucherType from './pages/Finance/Vouchers/VoucherType/VoucherType';

import { NextUIProvider } from "@nextui-org/react";
import Orders from './pages/ProjectManagement/OrdersPlaced/Orders';
import Party from './pages/ProjectManagement/Party/Party';
import AddOrder from './pages/ProjectManagement/OrdersPlaced/AddOrder';
import Employees from './pages/ProjectManagement/Employee/Employees';


function App() {
  return (
    <>
      <NextUIProvider>
        <BrowserRouter>
          <NavBar />
          <Routes >
            <Route path='' element={<Home />} />
            {/* Parties */}
            <Route path='party' element={<Party />} />

            {/* Orders */}
            <Route path='odres' element={<Orders />} />
            <Route path='place-odres' element={<AddOrder />} />

            {/* Employees */}
            <Route path='employees' element={<Employees />} />



            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>

    </>


  );
}

export default App;
