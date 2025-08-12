import React, { useEffect, useMemo, useState } from "react";
import useUserStore from "../store/store";
import Table from "../components/Table";
import { userRowRenderer, userTableHeaders } from "../helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ConfirmDelete } from "../components/confirmDelete";
import { showAlert } from "../components/ShowAlert";
import Loader from "../components/Loader";
import Select from "react-select";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [filterdValue, setFilterdValue] = useState({
    city: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const usersLists = useUserStore((state) => state.usersLists);
  const setUsersLists = useUserStore((state) => state.setUsersLists);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const navigate = useNavigate();

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(usersLists)) return [];

    return usersLists.filter((obj) => {
      const name = obj?.name?.toLowerCase() || "";
      const city = obj?.address?.city?.toLowerCase() || "";
      const company = obj?.company?.name?.toLowerCase() || "";
      const searchTerm = search?.toLowerCase() || "";

      const matchesSearch = name.includes(searchTerm);

      const filterCity = filterdValue?.city?.toLowerCase() || "";
      const matchCity = filterCity ? city.includes(filterCity) : true;

      const filterCompany = filterdValue?.company?.toLowerCase() || "";
      const matchCompany = filterCompany
        ? company.includes(filterCompany)
        : true;

      return matchesSearch && matchCity && matchCompany;
    });
  }, [usersLists, search, filterdValue]);

  const companyOptions = useMemo(() => {
    return usersLists?.map((obj) => {
      return {
        value: obj?.company?.name,
        label: obj?.company?.name,
      };
    });
  }, [usersLists]);

  const addressOptions = useMemo(() => {
    return usersLists?.map((obj) => {
      return {
        value: obj?.address?.city,
        label: obj?.address?.city,
      };
    });
  }, [usersLists]);

  const handleView = (user) => {
    navigate(`/view-user/${user?.id}`);
  };

  const handleEdit = (user) => {
    navigate(`/edit-user/${user?.id}`);
  };

  const handleDelete = async (user) => {
    const confirmed = await ConfirmDelete(
      "This will permanently delete the user."
    );
    if (confirmed) {
      deleteUser(user?.id);
      showAlert("User has been deleted.", "success");
    }
  };

  const handleOnFilter = (e) => {
    setFilterdValue((pre) => {
      return {
        ...pre,
        [e.name]: e?.target?.value || "",
      };
    });
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
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        showAlert("Failed to fetch users:", "error");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    if (usersLists?.length === 0) {
      setLoading(true);
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLists]);

  return loading ? (
    <Loader className={"w-10 text-blue-600 "} />
  ) : (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="mb-6 justify-end flex">
            <button
              type="button"
              className="cursor-pointer bg-blue-600  text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
              className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />

            <div className="sm-w-1/2 w-full">
              <Select
                placeholder="Companies"
                name="company"
                closeMenuOnSelect={true}
                options={companyOptions}
                isClearable={true}
                onChange={(e) => {
                  let event = {
                    name: "company",
                    target: e,
                  };
                  handleOnFilter(event);
                }}
              />
            </div>
            <div className="sm-w-1/2 w-full">
              <Select
                placeholder="City"
                name="city"
                closeMenuOnSelect={true}
                options={addressOptions}
                isClearable={true}
                onChange={(e) => {
                  let event = {
                    name: "city",
                    target: e,
                  };
                  handleOnFilter(event);
                }}
              />
            </div>
          </div>

          <div className="mb-2">
            <span className="font-medium">
              {filteredUsers?.length || 0} Users
            </span>
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
    </div>
  );
};

export default Dashboard;
