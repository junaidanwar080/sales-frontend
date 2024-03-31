
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";

import ProfileInfo from './ProfileInfo';



export const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));



  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>



      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Link to="/" className="font-bold text-inherit">Home</Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                
                  radius="sm"
                  variant="light"
                >
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
              // startContent={icons.scale}
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              // startContent={icons.activity}
              >
                Usage Metrics
              </DropdownItem>

              <DropdownItem
                key="supreme_support"
                description="Overcome any challenge with a supporting team ready to respond."
              // startContent={icons.user}
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Link color="foreground" to="/party">
              Party
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link to="/odres" aria-current="page">
              Orders
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="/employees">
              Employee
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link to="/payment" aria-current="page">
              Payment
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {user && user.access ?
              <ProfileInfo />
          :
            <>
              <NavbarItem className="hidden lg:flex">
                <Link to="/login">Login</Link>
              </NavbarItem>

              <NavbarItem>
                <Button as={Link} color="primary" to="/signup" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          }
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>

  )
}
