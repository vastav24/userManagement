import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserStore from "../store/store";
import CommonButton from "../components/CommonButton";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const usersLists = useUserStore((state) => state.usersLists);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = usersLists?.find((u) => String(u?.id) === String(id));
    setUser(foundUser);
  }, [id, usersLists]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">User not found</p>
      </div>
    );
  }

  const fields = [
    { label: "Name", value: user?.name },
    { label: "Username", value: user?.username },
    { label: "Email", value: user?.email },
    { label: "City", value: user?.address?.city },
    { label: "Phone", value: user?.phone },
    { label: "Website", value: user?.website },
    { label: "Company", value: user?.company?.name },
    { label: "Gender", value: user?.gender },
    {
      label: "Hobbies",
      value: Array.isArray(user?.hobbies)
        ? user?.hobbies.join(", ")
        : user?.hobbies,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">User Details</h1>

          <CommonButton
            type="button"
            onClick={() => {
              navigate("/");
            }}
            label={`Back`}
            className="cursor-pointer bg-gray-200 !text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-white hover:border-gray-500 hover:border focus:outline-none  transition"
          />
        </div>

        <div>
          {user?.photo && (
            <div className="flex justify-center mb-6">
              <img
                src={user?.photo}
                alt={user?.name}
                className="w-32 h-32 rounded-full object-cover border"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {fields?.map((field, idx) => (
              <div key={idx}>
                <p className="text-gray-500">{field?.label}</p>
                <div className="w-full border p-2.5 mt-2 rounded border-gray-300">
                  <p className="font-medium">{field?.value || "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
