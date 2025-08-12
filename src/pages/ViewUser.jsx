import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserStore from "../store/store";

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
            className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400   transition"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <div className="w-full border p-2.5 mt-2 rounded border-gray-300">
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">Username</p>
            <div className="w-full border p-2.5 mt-2 rounded border-gray-300">
              <p className="font-medium">{user.username}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <div className="w-full border p-2.5 mt-2 rounded border-gray-300">
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">City</p>
            <div className="w-full border p-2.5 mt-2 rounded border-gray-300">
              <p className="font-medium">{user.address?.city}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <div className="w-full border p-2.5 mt-2 rounded border-gray-300">
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">Website</p>
            <div className="w-full border p-2.5 mt-2 rounded border-gray-300">
              <p className="font-medium">{user.website}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">Company</p>
            <div className="w-full border p-2.5 mt-2 rounded border-gray-300">
              <p className="font-medium">{user.company?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
