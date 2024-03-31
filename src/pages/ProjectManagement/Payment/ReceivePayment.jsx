import React, { useState, useEffect } from 'react'
import { Input, Select, SelectItem, Textarea, Button } from "@nextui-org/react";
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';


export const method_list = [
    {label: "Cash", value: "cash"},
  {label: "Bank", value: "bank"},
    // {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
  ];

const ReceivePayment = () => {

    const [employees, setEmployees] = useState([])


    const [addPayment, setAddPayment] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/sales/employee/')
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const party_list = useQuery({
        queryKey: ["party_list"],
        queryFn: () => {
            return axios.get(
                'http://127.0.0.1:8000/sales/party/party_list/'
            );
        },
    })



    const addPaymentMutation = useMutation({
        mutationFn: (data) => {
            return axios.post(`http://127.0.0.1:8000/sales/payment/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        },
        onSuccess: () => {
            console.log(`Data added successfully`);
        },
        onError: (error) => {
            console.error(`Failed to add data`, error);
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
    console.log("form Data: ",addPayment)
        addPaymentMutation.mutate(addPayment)
    };

    const addorderhandler = (e) => {
        const { name, value } = e.target;
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        setAddPayment((prevData) => ({ ...prevData, [name]: value,date: currentDate}));
    };

    console.log("form Data: ",addPayment)

    if (party_list.isLoading) {
        return <div>Loading</div>
    }


        return (
            <>

                <h2 className="font-bold underline text-center">Place Order</h2>
                <div className="ml-96 mr-96 mt-10">

                    <form>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                           
                        
                            <Select
                                size="sm"
                                label="Party"
                                name='party'
                                className="max-w"
                                onChange={addorderhandler}

                            >
                                {party_list.data.data.data.map((part) => (
                                    <SelectItem key={part.id} value={part.id}>
                                        {part.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        
                            <Input
                                type="text"
                                label="Amount"
                                name='amount'
                                size='sm'
                                onChange={addorderhandler}

                            />
                            <Select
                                size="sm"
                                label="Methd"
                                name='method'
                                className="max-w"
                                onChange={addorderhandler}

                            >
                                {method_list.map((method) => (
                                    <SelectItem key={method.value} value={method.value}>
                                        {method.label}
                                    </SelectItem>
                                ))}
                            </Select>
                           

                            <Textarea
                                label="Refference / Description"
                                placeholder="Write your description"
                                className="max-w"
                                name='description'
                                onChange={addorderhandler}

                            />

                            <Button
                                color='primary'
                                type='submit'
                                onClick={onSubmit}

                            >Save</Button>
                        </div>
                    </form>
                </div>
            </>
        )

    }

    export default ReceivePayment