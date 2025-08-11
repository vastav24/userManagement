import React, { useEffect, useMemo, useState } from "react";
import useUserStore from "../store/store";
import Table from "../components/Table";
import { userRowRenderer, userTableHeaders } from "../helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { confirmDelete } from "../components/confirmDelete";
import { showAlert } from "../components/ShowAlert";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const usersLists = useUserStore((state) => state.usersLists);
  const setUsersLists = useUserStore((state) => state.setUsersLists);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const navigate = useNavigate();

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(usersLists)) return [];

    return usersLists.filter((u) => {
      const name = u?.name?.toLowerCase() || "";
      const searchTerm = search?.toLowerCase() || "";
      const matchesSearch = name.includes(searchTerm);
      const matchesRole = roleFilter === "all" || u?.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [usersLists, search, roleFilter]);

  const handleView = (user) => {
    navigate(`/view-user/${user?.id}`);
  };

  const handleEdit = (user) => {
    navigate(`/edit-user/${user?.id}`);
  };

  const handleDelete = async (user) => {
    const confirmed = await confirmDelete(
      "This will permanently delete the user."
    );
    if (confirmed) {
      deleteUser(user?.id);
      showAlert("User has been deleted.", "success");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();

        setUsersLists(data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        showAlert("Failed to fetch users:", "error");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    if (usersLists?.length === 0) {
      setLoading(true);
      fetchUsers();
    }
  }, [usersLists]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="mb-6 justify-end flex">
            <button
              type="button"
              className=" cursor-pointer text-white hover:text-white bg-violet-500 hover:bg-indigo-500 transition font-medium rounded text-sm13 px-2.5 py-0.5"
              onClick={() => {
                navigate("/add-user");
              }}
            >
              + Add user
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="🔍 Search users.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <Table
              data={filteredUsers}
              headers={userTableHeaders}
              rowRenderer={userRowRenderer}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      <Loader className={"w-10 text-violet-500 "} />
    </div>
  );
};

export default Dashboard;
