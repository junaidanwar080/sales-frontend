import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Textarea } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from 'axios';
import { useMutation, useQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const method_list = [
  { label: "Cash", value: "cash" },
  { label: "Bank", value: "bank" },
  // {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
];


const Employees = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [employees, setEmployees] = useState([])
  const [designations, setDesignations] = useState([])
  const [reportTo, setReportTo] = useState([])
  const [transferPayment, setTransferPayment] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/sales/employee/')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sales/designations/designation_list/")
      .then(response => response.json())
      .then(data => setDesignations(data))
      .catch(error => console.error("Error: ", error))

  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sales/employee/employee_list/")
      .then(response => response.json())
      .then(data => setReportTo(data))
      .catch(error => console.error("Error: ", error))
  }, []);



  const addPaymentMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`http://127.0.0.1:8000/sales/employee-payment/`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    },
    onSuccess: () => {
    },
    onError: (error) => {
        console.error(`Failed to add data`, error);
    }
  });
  

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form Data: ", transferPayment)
    addPaymentMutation.mutate(transferPayment)
  };

  const transfer_payment_handler = (e) => {
    const { name, value } = e.target;
    setTransferPayment((prevData) => ({ ...prevData, [name]: value, }));
  };

  console.log("form Data: ",transferPayment)
  return (
    <>
      <div className="mt-7 text-center">
        <h2>Employees</h2>
      </div>

      <div className="mr-3 ml-3">
        <div className="flex justify-between">
          <Input type="text" className="w-96" label="Search Employee" size='sm' />
          {/* <Button onPress={onOpen}>Add Employee</Button> */}
        </div>

        <Table aria-label="Example static collection table" className="mt-7">
          <TableHeader>
            <TableColumn>Sr no</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Designation</TableColumn>
            <TableColumn>Report To</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {employees.map(employee => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.report_to}</TableCell>
                <TableCell>{employee.status}</TableCell>

                <TableCell> 
                  <Button>Edit</Button> 
                  <Button value={employee.id} onPress={onOpen} name="employee" onClick={transfer_payment_handler}>Transfer Payment</Button>
                  <Button><Link to={`/employee-payment/${employee.id}`}>View</Link></Button> 

                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


 



      {/* transfer Employee Payment */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Employee Payeble</ModalHeader>
              <ModalBody>
                <div>

                  <form>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">




                      <Input
                        type="text"
                        label="Amount"
                        name='amount'
                        size='sm'
                        onChange={transfer_payment_handler}

                      />
                      <Select
                        size="sm"
                        label="Payment Methd"
                        name='payment_method'
                        className="max-w"
                        onChange={transfer_payment_handler}

                      >
                        {method_list.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </Select>


                      <Textarea
                        label="Description"
                        placeholder="Write your description"
                        className="max-w"
                        name='description'
                        onChange={transfer_payment_handler}

                      />

                    </div>
                  </form>

                </div>


              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}  onClick={onSubmit}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  )
}

export default Employees