import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

const Login = () => {
  return (
    <>

      <Card className="max-w-[400px] mx-auto my-36">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="">
            <h3 className="text-md">Log in</h3>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="email" label="Email" />
              <Input type="pasword" label="Password" />
              <Button color="primary" className='w-full' variant="solid">
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