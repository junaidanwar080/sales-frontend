import React, { useState, useEffect } from 'react'
import { Input, Select, SelectItem, Textarea, Button } from "@nextui-org/react";
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const projectStatus = [
  {label: "Pending", value: "pending"},
  {label: "In Progress", value: "in_progress"},
  {label: "Rejected", value: "rejected"},
  {label: "Completed", value: "completed"},


  // {
  //   'Pending': 'Pending',
  //   'partially_completed': 'Partially completed',
  //   '': 'Completed',
    
  // }
]
const EditOrder = () => {

  const { order_id } = useParams();


  const employee_list = useQuery({
    queryKey: ["employee_list"],
    queryFn: () => {
      return axios.get(
        `http://127.0.0.1:8000/sales/employee/`
      );
    },
    // enabled: get_order_detail !== undefined,

  });


  const get_order_detail = useQuery({
    queryKey: ["get_order_detail"],
    queryFn: () => {
      return axios.get(
        `http://127.0.0.1:8000/sales/placed_orders/${order_id}/`
      );
    },
    // enabled: get_order_detail !== undefined,

  });

  const updateOrderMutation = useMutation({
    mutationFn: (data) => {
      return axios.put(`http://127.0.0.1:8000/sales/placed_orders/${order_id}/`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    },
    onSuccess: () => {
      console.log(`Order updated successfully`);
      // Optionally, you can redirect the user to another page after successful update
      // history.push('/orders');
    },
    onError: (error) => {
      console.error(`Failed to update order`, error);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedOrderData = {
      order_number: e.target.order_number.value,
      title: e.target.title.value,
      total_amount: e.target.total_amount.value,
      start_date: e.target.start_date.value,
      estimated_date: e.target.e_date.value,
      description: e.target.description.value,
      employee: e.target.employee.value,
      project_status: e.target.project_status.value
    };
    console.log(updatedOrderData)
    updateOrderMutation.mutate(updatedOrderData)
  };


  if (get_order_detail.isLoading || employee_list.isLoading) {
    return <div>Loading</div>
  }

  console.log(get_order_detail.data?.data)


  return (
    <>
      <h2 className="font-bold underline text-center">Edit Place Order</h2>
      <div className="ml-96 mr-96 mt-10">

        <form onSubmit={onSubmit} >
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text"
              label="Order Number"
              size="sm"
              name="order_number"
              readOnly
              value={get_order_detail.data?.data?.order_number || ''}
            // onChange={editorderhandler}
            />
            <Input
              type="text"
              label="Title"
              size="sm"
              name="title"
              defaultValue={get_order_detail.data?.data?.title || ''}
            // onChange={editorderhandler}
            />

            <Input
              type="text"
              label="Amount"
              name='total_amount'
              size='sm'
              defaultValue={get_order_detail.data?.data?.total_amount || ''}

            // onChange={editorderhandler}

            />
            <Select
              size="sm"
              label="Assign To"
              className="max-w"
              name='employee'
              defaultValue={get_order_detail.data?.data?.employee || ''}
            >
              {employee_list.data.data.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Start Date"
              name='start_date'
              defaultValue={get_order_detail.data?.data?.start_date || ''}

              // onChange={editorderhandler}
              size='sm' />

            <Input
              type="text"
              label="Estimated dated"
              size='sm'
              name='e_date'
              defaultValue={get_order_detail.data?.data?.estimated_date || ''}
            // onChange={editorderhandler}
            />
            <Select
              size="sm"
              label="Assign To"
              className="max-w"
              name='project_status'
              defaultValue={get_order_detail.data?.data?.project_status || ''}
            >
              {projectStatus.map((status) => (
                <SelectItem key = {status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              label="Description"
              placeholder="Enter your description"
              className="max-w"
              name='description'
              defaultValue={get_order_detail.data?.data?.description || ''}

            // onChange={editorderhandler}

            />
            <Button
              color='primary'
              type='submit'


            >Save</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditOrder