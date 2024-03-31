import React, { useState } from 'react';
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider, Image,
  Button
} from "@nextui-org/react";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const navigate = useNavigate()

  const [formData, setFormData] = useState([])

  const loginMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`http://127.0.0.1:8000/auth/login/`, data, {
        headers: { 
          'Content-Type': 'application/json',
        }
      });
    },
    onSuccess: (response) => {
      console.log(`Loged in successfully: `,response.data.access);
      if(response.data.access){
        console.log(`Data get successfully: `,JSON.stringify(response.data));
        localStorage.setItem('user',JSON.stringify(response.data))
        navigate("/");

      } else {
      console.log('Some thing Went Erong. Please Try Again.');
        
      }
    },
    onError: (error) => {
      console.error(`Failed to add data`, error);
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData)
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  return (
    <>
      <Card className="max-w-[400px] mx-auto my-36">
        <CardHeader className="flex gap-3">
          {/* <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          /> */}
          <div className="">
            <h3 className="text-md">Log in</h3>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="email"
                label="Email"
                name='email'
                onChange={changeHandler}

              />
              <Input
                type="pasword"
                label="Password"
                name='password'
                onChange={changeHandler}
              />
              <Button 
              color="primary" 
              className='w-full' 
              variant="solid"
              onClick={submitHandler}
              >
                Log in
              </Button>

            </div>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>

        </CardFooter>
      </Card>



    </>
  )
}

export default Login