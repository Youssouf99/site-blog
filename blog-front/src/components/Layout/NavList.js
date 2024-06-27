import { NewspaperIcon } from "@heroicons/react/16/solid";
import { MenuItem, Typography } from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

const NavList = () => {
  const navListItems = [
    {
      label: "Blog",
      icon: NewspaperIcon,
      path: `/blog`,
    },
  ];

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon: Icon, path }) => (
        <Typography
          key={label}
          as="div"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500"
            }
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              <Icon className="h-5 w-5" />{" "}
              <span className="text-gray-900">{label}</span>
            </MenuItem>
          </NavLink>
        </Typography>
      ))}
    </ul>
  );
};

export default NavList;
