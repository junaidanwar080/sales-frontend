import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";

export const animals = [
{label: "Cat", value: "cat", description: "The second most popular pet in the world"},
{label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
{label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
];

const Employees = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>




      <div className="mt-7 text-center">
        <h2>Employees</h2>
      </div>

      <div className="mr-3 ml-3">
        <div className="flex justify-between">
            <Input type="text" className="w-96" label="Search Account" size='sm'/>
            <Button onPress={onOpen}>Open Modal</Button>
        </div>

        <Table aria-label="Example static collection table" className="mt-7">
          <TableHeader>
            <TableColumn>Account no</TableColumn>
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





      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Open Account</ModalHeader>
              <ModalBody>
                <div>

                  <form>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Select
                        size="sm"
                        label="Select Main Head"
                        className="max-w-xs"
                      >
                        {animals.map((animal) => (
                          <SelectItem key={animal.value} value={animal.value}>
                            {animal.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Select
                        size="sm"
                        label="Select Sub Head"
                        className="max-w-xs"
                      >
                        {animals.map((animal) => (
                          <SelectItem key={animal.value} value={animal.value}>
                            {animal.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input type="text" label="Account No" size='sm' />
                      <Input type="text" label="Name" size="sm" />

                    </div>
                  </form>

                </div>


              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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