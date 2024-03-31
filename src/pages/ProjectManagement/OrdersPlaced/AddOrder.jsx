import React, { useState, useEffect } from 'react'
import { Input, Select, SelectItem, Textarea, Button } from "@nextui-org/react";
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';


const AddOrder = () => {
  const [employees, setEmployees] = useState([])
  const [party, setParty] = useState([])

  const  get_order_number = useQuery({
    queryKey:[ "get_order_number"],
    queryFn: () => {
      return axios.get(
        `http://127.0.0.1:8000/sales/placed_orders/last_order_number/`
      );
    },
    // enabled: get_order_number !== undefined,
  });

  const [addOrder, setAddOrder] = useState()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/sales/employee/')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/sales/party/party_list/")
  //     .then(response => response.json())
  //     .then(data => setParty(data))
  //     .catch(error => console.error("Error: ", error))
  // }, []);


  const party_list = useQuery({
    queryKey: ["party_list"],
    queryFn: () => {
      return axios.get(
        'http://127.0.0.1:8000/sales/party/party_list/'
      );
    },
  })
  
  
  
  const addOrderMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`http://127.0.0.1:8000/sales/placed_orders/`, data, {
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
    addOrderMutation.mutate(addOrder)
  };
  
  const addorderhandler = (e) => {
    const { name, value } = e.target;
    setAddOrder((prevData) => ({ ...prevData, [name]: value, ...(get_order_number.data.data)}));
  };
  
  
  if(get_order_number.isLoading || party_list.isLoading){
    return <div>Loading</div>
  }

  console.log(get_order_number.data)
  
  
  return (
    <>
      <h2 className="font-bold underline text-center">Place Order</h2>
      <div className="ml-96 mr-96 mt-10">

        <form>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text"
              label="Order Number"
              size="sm"
              name="order_number"
              readOnly
              value={get_order_number?.data?.data?.order_number}
              onChange={addorderhandler}
              />
            <Input
              type="text"
              label="Title"
              size="sm"
              name="title"
              // value={get_order_number.data.data.msg.order_number+1}
              onChange={addorderhandler}
            />
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
            {/* <Select
              size="sm"
              label="Assign To"
              className="max-w"
              name='assign_to'
              onChange={addorderhandler}
            >
              {employees.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.name}
                </SelectItem>
              ))}
            </Select> */}
            <Input
              type="text"
              label="Amount"
              name='total_amount'
              size='sm'
              onChange={addorderhandler}

            />
            <Input
              type="text"
              label="Start Date"
              name='start_date'
              onChange={addorderhandler}
              size='sm' />

            <Input
              type="text"
              label="Estimated dated"
              size='sm'
              name='e_date'
              onChange={addorderhandler}

            />

            <Textarea
              label="Description"
              placeholder="Enter your description"
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

export default AddOrder