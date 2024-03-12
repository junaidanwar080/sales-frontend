import React from 'react'
import { Link } from 'react-router-dom'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@nextui-org/react";

const Orders = () => {
  return (
    <>
    



      <div className="mt-7 text-center">
        <h2>Orders</h2>
      </div>

      <div className="mr-3 ml-3">
        <div className="flex justify-between">

            <Input type="text" className="w-96" label="Voucher Number" size='sm'/>
            <Link to="/place-odres" >Place New Order</Link>
        </div>

        <Table aria-label="Example static collection table" className="mt-7">
          <TableHeader>
            <TableColumn>Order no</TableColumn>
            <TableColumn>Head</TableColumn>
            <TableColumn>Sub Head</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Status</TableColumn>

            <TableColumn>Action</TableColumn>


          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>01</TableCell>
              <TableCell>asset</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>edit</TableCell>


            </TableRow>
            <TableRow key="2">
              <TableCell>02</TableCell>
              <TableCell>Liability</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>edit/delete</TableCell>


            </TableRow>


          </TableBody>
        </Table>


      </div>





     
    </>
  )
}

export default Orders