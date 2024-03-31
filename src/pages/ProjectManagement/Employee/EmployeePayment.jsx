import React from "react"
import { useParams } from "react-router-dom"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




const EmployeePayment = () => {

    const { employee_id } = useParams()
    const employee_payment = useQuery({
        queryKey: ["employee_payment"],
        queryFn: () => {
            return axios.get(`http://127.0.0.1:8000/sales/employee-payment/get_emp_payment/?employee=${employee_id}`)
        }
    });
    if (employee_payment.isLoading) {
        return (
            <>Loading</>
        )
    }
    console.log(employee_payment.data.data.data)


    return (
        <>

            <div className="mt-7 text-center">
                <h2>Employee Payment </h2>
            </div>
            <div className="mr-3 ml-3">
                <div className="flex justify-between">
                    <Input type="text" className="w-96" label="Voucher Number" size='sm' />
                </div>
                <Table aria-label="Example static collection table" className="mt-7">
                    <TableHeader>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Time</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        <TableColumn>Payment Method</TableColumn>
                        <TableColumn>Description</TableColumn>
                    </TableHeader>
                    <TableBody>

                        {employee_payment.data.data.data.map((payments) => (
                            <TableRow key={payments.id}>
                                <TableCell>{new Date(payments.created_at).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell>10:00</TableCell>
                                <TableCell>{payments.amount}</TableCell>
                                <TableCell>{payments.payment_method}</TableCell>
                                <TableCell>{payments.description}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>


            </div>






        </>
    )

}

export default EmployeePayment