import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserStore from "../store/store";
import { showAlert } from "../components/ShowAlert";
import { useNavigate, useParams } from "react-router-dom";

const AddEditUser = () => {
  const updateUser = useUserStore((state) => state.updateUser);
  const addUser = useUserStore((state) => state.addUser);
  const usersLists = useUserStore((state) => state.usersLists);
  const navigate = useNavigate();
  const { id } = useParams();

  let initialValues = {
    name: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    website: "",
    company: "",
  };

  let validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("City is required"),
    phone: Yup.string().required("Phone number is required"),
    website: Yup.string().required("Website is required"),
    company: Yup.string().required("Company is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const user = {
        ...values,
        ...(!id && { id: Date.now() }),
        address: { city: values.address },
        company: { name: values.company },
      };
      if (id) {
        updateUser(user);
        showAlert("User updated successfully", "success");
      } else {
        addUser(user);
        resetForm();
        showAlert("User added successfully", "success");
      }
      setTimeout(() => {
        navigate("/");
      }, 0);
    },
  });

  useEffect(() => {
    const user = usersLists?.find((obj) => String(obj?.id) === String(id));

    if (user) {
      const flatUser = {
        name: user.name,
        username: user.username,
        email: user.email,
        address: user.address?.city || "",
        phone: user.phone,
        website: user.website,
        company: user.company?.name || "",
        id: user?.id,
      };

      formik.setValues(flatUser);
    }
  }, [id]);

  console.log(formik.dirty, "adad");

  return (
    <div className="min-h-screen overflow-y bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">
          {" "}
          {id ? "Update" : "Add"} user
        </h1>
      </header>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow rounded p-6 space-y-4 w-full max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "name", label: "Name" },
              { name: "username", label: "Username" },
              { name: "email", label: "Email" },
              { name: "address", label: "City" },
              { name: "phone", label: "Phone" },
              { name: "website", label: "Website" },
              { name: "company", label: "Company" },
            ]?.map(({ name, label }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="mb-1 text-sm font-medium">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                  className={`border px-3 py-2 rounded text-sm ${
                    formik.touched[name] && formik.errors[name]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched[name] && formik.errors[name] && (
                  <span className="text-red-500 text-xs mt-1">
                    {formik.errors[name]}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="text-right flex justify-end gap-2">
            <button
              type="button"
              className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400   transition"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancle
            </button>
            <button
              type="submit"
              disabled={!formik.dirty}
              className={` cursor-pointer px-4 py-2 rounded-lg text-white transition 
          ${
            formik.dirty && formik.isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400"
          }
        `}
            >
              {id ? "Update" : "Add"} user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(AddEditUser);
