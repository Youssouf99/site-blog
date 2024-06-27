import {
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { createElement, useEffect, useState } from "react";
import AuthMenu from "./AuthMenu";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/AuthUtils";

const profileMenuItems = [
  {
    label: "Mon Profil",
    icon: UserCircleIcon,
    path: (id) => `/users/${id}`,
  },
  {
    label: "Éditer Profil",
    icon: Cog6ToothIcon,
    path: (id) => `/users/${id}/edit`,
  },
  {
    label: "Liste des Utilisateurs",
    icon: UserCircleIcon,
    path: "/users",
  },
  {
    label: "Créer Utilisateur",
    icon: LifebuoyIcon,
    path: "/users/create",
  },
  {
    label: "Déconnexion",
    icon: PowerIcon,
    path: "/login",
  },
];

const ProfileMenu = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  const closeMenu = () => setIsMenuOpen(false);
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="user avatar"
            className="border border-gray-900 p-0.5"
            src={
              user?.imageUrl ||
              "https://thumbs.dreamstime.com/z/emoji-d-un-visage-bonhomme-de-neige-125271249.jpg"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {isAuthenticated ? (
          profileMenuItems.map(({ label, icon, path }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  closeMenu();
                  const destination =
                    typeof path === "function" ? path(user?.id) : path;
                  navigate(destination);
                  if (isLastItem) {
                    setIsAuthenticated(false);
                    localStorage.removeItem("token");
                  }
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })
        ) : (
          <AuthMenu closeMenu={closeMenu} />
        )}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
