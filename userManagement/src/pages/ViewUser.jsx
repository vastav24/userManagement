import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserStore from "../store/store"; // adjust path

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const usersLists = useUserStore((state) => state.usersLists);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = usersLists?.find((u) => String(u.id) === String(id));
    setUser(foundUser);
  }, [id, usersLists]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">User Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="border cursor-pointer border-gray-300 hover:border-indigo-500 text-gray hover:text-white bg-white hover:bg-indigo-500 transition font-medium rounded text-sm13 px-2.5 py-0.5 mr-2"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-500">City</p>
            <p className="font-medium">{user.address?.city}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{user.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">Website</p>
            <p className="font-medium">{user.website}</p>
          </div>
          <div>
            <p className="text-gray-500">Company</p>
            <p className="font-medium">{user.company?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
