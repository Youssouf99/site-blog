import {
  Card,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import NavList from "./NavList";
import ProfileMenu from "./ProfileMenu";
import { Bars2Icon } from "@heroicons/react/24/outline";
import "./Header.css";

const Header = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="max-w-full h-screen overflow-scroll mt-2 gradient-background">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium gradient-text"
          >
            MES-BLOCKS
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <ProfileMenu
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
          <NavList />
        </MobileNav>
      </Navbar>
      <div className="items-center justify-center h-full mx-auto max-w-screen-md lg:max-w-screen-lg py-12 px-4 lg:px-0">
        {children}
      </div>
    </div>
  );
};

export default Header;
