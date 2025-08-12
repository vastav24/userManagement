import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import Select from "react-select"; // <-- added
import useUserStore from "../store/store";
import { showAlert } from "../components/ShowAlert";
import { useNavigate, useParams } from "react-router-dom";
import { validationSchema } from "../validation";
import CommonButton from "../components/CommonButton";
import { fileToBase64, hobbiesOptions } from "../helpers";

const AddEditUser = () => {
  const updateUser = useUserStore((state) => state.updateUser);
  const addUser = useUserStore((state) => state.addUser);
  const usersLists = useUserStore((state) => state.usersLists);
  const removeImageFromUser = useUserStore(
    (state) => state.removeImageFromUser
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);
  const user = useMemo(() => {
    return usersLists?.find((obj) => String(obj?.id) === String(id));
  }, [usersLists, id]);

  const initialValues = {
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    address: user?.address?.city || "",
    phone: user?.phone || "",
    website: user?.website || "",
    company: user?.company?.name || "",
    gender: user?.gender || "",
    photo: user?.photo || "",
    hobbies: user?.hobbies || [],
    id: user?.id || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        ...values,
        ...(!id && { id: Date.now() }),
        address: { city: values.address },
        company: { name: values.company },
        photo: values.photo,
      };
      if (id) {
        updateUser(newUser);
        showAlert("User updated successfully", "success");
      } else {
        addUser(newUser);
        resetForm();
        setPreviewImage("");
        showAlert("User added successfully", "success");
      }
      navigate("/");
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setPreviewImage(base64);
      formik.setFieldValue("photo", base64);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    formik.setFieldValue("photo", "");
    if (id) {
      removeImageFromUser(id);
    }
  };

  useEffect(() => {
    const user = usersLists?.find((obj) => String(obj?.id) === String(id));
    if (user) {
      const flatUser = {
        name: user?.name,
        username: user?.username,
        email: user?.email,
        address: user?.address?.city || "",
        phone: user?.phone,
        website: user?.website,
        company: user?.company?.name || "",
        id: user?.id,
        gender: user?.gender || "",
        photo: user?.photo || "",
        hobbies: user?.hobbies || [],
      };
      setPreviewImage(user?.photo || "");
      formik.setValues(flatUser);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">
          {id ? "Update" : "Add"} User
        </h1>
      </header>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow rounded-xl p-6 space-y-6 w-full max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-28 h-28 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition"
              onClick={() => fileInputRef.current.click()}
            >
              {previewImage || formik?.values?.photo ? (
                <img
                  src={previewImage || formik?.values?.photo}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs text-center">
                  Click to Upload
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />

            {(previewImage || formik?.values?.photo) && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "name", label: "Name" },
              { name: "username", label: "Username" },
              { name: "email", label: "Email" },
              { name: "address", label: "Address" },
              { name: "phone", label: "Phone" },
              { name: "website", label: "Website" },
              { name: "company", label: "Company" },
            ]?.map(({ name, label }) => (
              <div key={name} className="flex flex-col">
                <label
                  htmlFor={name}
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik?.values[name]}
                  className={`border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
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

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"]?.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formik?.values?.gender === option}
                      onChange={formik.handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>

              {formik.touched.gender && formik.errors.gender && (
                <span className="text-red-500 text-xs mt-1">
                  {formik.errors.gender}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Hobbies
              </label>
              <Select
                isMulti
                name="hobbies"
                options={hobbiesOptions}
                className="text-sm"
                classNamePrefix="select"
                value={hobbiesOptions?.filter((option) =>
                  formik?.values?.hobbies?.includes(option?.value)
                )}
                onChange={(selected) =>
                  formik.setFieldValue(
                    "hobbies",
                    selected?.map((opt) => opt?.value)
                  )
                }
                menuPlacement="top"
              />
              {formik.touched?.hobbies && formik.errors?.hobbies && (
                <span className="text-red-500 text-xs mt-1">
                  {formik.errors?.hobbies}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <CommonButton
              type="button"
              onClick={() => navigate("/")}
              label="Cancel"
              className="cursor-pointer bg-gray-200 !text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-white hover:border-gray-500 focus:outline-none transition"
            />
            <CommonButton
              isDisabled={!formik.dirty}
              type="submit"
              label={`${id ? "Update" : "Add"} User`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(AddEditUser);
