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
import Payment from './pages/ProjectManagement/Payment/Payment';
import EditOrder from './pages/ProjectManagement/OrdersPlaced/EditOrder';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LogOut from './pages/LogOut';
import ReceivePayment from './pages/ProjectManagement/Payment/ReceivePayment';
import EmployeePayment from './pages/ProjectManagement/Employee/EmployeePayment';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>

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
              <Route path='edit-order/:order_id' element={<EditOrder />} />

              {/* Employees */}
              <Route path='employees' element={<Employees />} />
              <Route path='payment' element={<Payment />} />
              <Route path='employee-payment/:employee_id' element={<EmployeePayment />} />


              <Route path='signup' element={<SignUp />} />
              <Route path='login' element={<Login />} />
              <Route path='logout' element={<LogOut />} />
              <Route path='recieve-payment' element={<ReceivePayment/>} />

            </Routes>
          </BrowserRouter>
        </NextUIProvider>
      </QueryClientProvider>

    </>


  );
}

export default App;
