import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import {
  Avatar,
  Card,
  CardBody,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../api/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="body1" color="red">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center ">
      <Card className="w-full max-w-3xl">
        <CardBody>
          <Typography variant="h4" className="text-center mb-4">
            Liste des utilisateurs
          </Typography>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="w-1/4 py-2 text-left">Prénom</th>
                  <th className="w-1/4 py-2 text-left">Nom</th>
                  <th className="w-1/4 py-2 text-left">Email</th>
                  <th className="w-1/4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2 px-4">{user.firstName}</td>
                    <td className="py-2 px-4">{user.lastName}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <Link to={`/users/${user.id}`}>
                        <IconButton size="sm" color="blue" variant="text">
                          <EyeIcon className="h-5 w-5" />
                        </IconButton>
                      </Link>
                      <Link to={`/users/${user.id}/edit`}>
                        <IconButton size="sm" color="green" variant="text">
                          <PencilIcon className="h-5 w-5" />
                        </IconButton>
                      </Link>
                      <Link
                        to={`/users/${user.id}/delete?firstName=${user.firstName}?lastName=${user.lastName}`}
                      >
                        <IconButton size="sm" color="red" variant="text">
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                      </Link>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserList;
