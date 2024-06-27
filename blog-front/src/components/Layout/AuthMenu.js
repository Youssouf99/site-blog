import {
  ArrowRightStartOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";
import { MenuItem, Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const authMenuItems = [
  {
    label: "Log In",
    icon: ArrowRightStartOnRectangleIcon,
    path: "/login",
  },
  {
    label: "Sign Up",
    icon: UserPlusIcon,
    path: "/signup",
  },
];

const AuthMenu = ({ closeMenu }) => {
  const navigate = useNavigate();

  return (
    <>
      {authMenuItems.map(({ label, icon: Icon, path }, key) => (
        <MenuItem
          key={key}
          onClick={() => {
            closeMenu();
            navigate(path);
          }}
          className="flex items-center gap-2 rounded"
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
          <Typography as="span" variant="small" className="font-normal">
            {label}
          </Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default AuthMenu;
