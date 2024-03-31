import React from 'react'
import { Link } from 'react-router-dom'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Payment = () => {
const payment_list = useQuery({
  queryKey: ["payment_list"],
  queryFn: ()=>{
    return axios.get('http://127.0.0.1:8000/sales/payment/')
  }
});


if(payment_list.isLoading){
  return <div>Loading</div>
}
console.log(payment_list.data.data)
  return (
    <>
      <div className="mt-7 text-center">
        <h2>Payment </h2>
      </div>

      <div className="mr-3 ml-3">
        <div className="flex justify-between">

            <Input type="text" className="w-96" label="Voucher Number" size='sm'/>
            <Link to="/recieve-payment" >Recieve Payment</Link>
        </div>

        <Table aria-label="Example static collection table" className="mt-7">
          <TableHeader>
            <TableColumn>Payment Reference</TableColumn>
            <TableColumn>Party</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Payment Method</TableColumn>
            <TableColumn>Status</TableColumn>

            <TableColumn>Action</TableColumn>


          </TableHeader>
          <TableBody>
            {payment_list.data.data.map((payments) => (

            <TableRow key={payments.id}>
              <TableCell>{payments.id}</TableCell>
              <TableCell>{payments.party}</TableCell>
              <TableCell>{payments.amount}</TableCell>
              <TableCell>{payments.method}</TableCell>
              <TableCell>rcvd</TableCell>
              <TableCell><Button>view</Button></TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>


      </div>





     
    </>
  )
}

export default Payment