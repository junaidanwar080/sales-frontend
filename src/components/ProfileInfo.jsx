import React from "react"
import { Link } from "react-router-dom"
import { NavbarItem, Button } from "@nextui-org/react";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";


const ProfileInfo = () => {
    return (

        <>
            <NavbarItem className="hidden lg:flex">
            <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  // endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Profile Info
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
             
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
              // startContent={icons.scale}
              >
                Profile Setting
              </DropdownItem>
             

              <DropdownItem
                key="supreme_support"
                description="Overcome any challenge with a supporting team ready to respond."
              // startContent={icons.user}
              >
                <Link to="/logout">Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
                
            </NavbarItem>
        </>
    )

}

export default ProfileInfo