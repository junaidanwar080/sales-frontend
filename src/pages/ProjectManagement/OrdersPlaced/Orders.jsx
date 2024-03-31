import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input,Button } from "@nextui-org/react";
// import EditIcon from '@mui/icons-material/Edit';


const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sales/placed_orders/")
      .then(response => response.json())
      .then(data => setOrders(data))
      .then(error => console.error("Error: ", error))

  }, []);

  console.log(orders)
  return (
    <>
      <div className="mt-7 text-center">
        <h2>Orders</h2>
      </div>

      <div className="mr-3 ml-3">
        <div className="flex justify-between">

          <Input type="text" className="w-96" label="Order Number" size='sm' />
          <Link to="/place-odres" >Place New Order</Link>
        </div>

        <Table aria-label="Example static collection table" className="mt-7">
          <TableHeader>
            <TableColumn>Order no</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Start Date</TableColumn>
            <TableColumn>Submission Date</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Action</TableColumn>


          </TableHeader>
          <TableBody>
            {orders.map(employee => (
              <TableRow key={employee.id}>
                <TableCell>{employee.order_number}</TableCell>
                <TableCell>{employee.title}</TableCell>
                <TableCell>{employee.start_date}</TableCell>
                <TableCell>{employee.estimated_date}</TableCell>
                <TableCell>
                  {employee.project_status === "Pending" ? <Button color='danger'>{employee.payment_status}</Button> : <Button color='success'>{employee.payment_status}</Button>}
               
                  </TableCell>
                <TableCell><Link to={`/edit-order/${employee.id}`}><Button>Edit</Button></Link></TableCell>
              </TableRow>
            ))}


          </TableBody>
        </Table>


      </div>






    </>
  )
}

export default Orders