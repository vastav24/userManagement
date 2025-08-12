import { Tooltip } from "react-tooltip";
import { EditIcon, RemoveIcon, ViewIcon } from "./assets";

export const userTableHeaders = [
  "Name",
  "Username",
  "Email",
  "Address",
  "Phone",
  "Website",
  "Company",
  "Actions",
];

export const userRowRenderer = (user, onView, onEdit, onDelete) => (
  <>
    <td className="px-6 py-4">{user?.name}</td>
    <td className="px-6 py-4">{user?.username}</td>
    <td className="px-6 py-4">{user?.email}</td>
    <td className="px-6 py-4">{user?.address?.city}</td>
    <td className="px-6 py-4">{user?.phone}</td>
    <td className="px-6 py-4">{user?.website}</td>
    <td className="px-6 py-4">{user?.company?.name}</td>
    <td className="px-6 py-4">
      <div className="flex items-center w-full">
        <button
          onClick={() => onView(user)}
          className="text-green-600 hover:underline cursor-pointer"
          id={`view-${user?.id}`}
        >
          <ViewIcon className={"w-5 fill-green-500 "} />
          <Tooltip
            anchorId={`view-${user?.id}`}
            content="View"
            place="top"
            variant="light"
            className="!bg-white !opacity-100 !py-0.5 !px-1.5 !text-xs font-medium z-10"
          />
        </button>
        <button
          onClick={() => onEdit(user)}
          className="pl-2.5 pr-2.5 text-blue-600 hover:underline cursor-pointer"
          id={`edit-${user?.id}`}
        >
          {/* Edit */}
          <EditIcon className={"w-5 fill-blue-500 "} />
          <Tooltip
            anchorId={`edit-${user?.id}`}
            content="Edit"
            place="top"
            variant="light"
            className="!bg-white !opacity-100 !py-0.5 !px-1.5 !text-xs font-medium z-10"
          />
        </button>
        <button
          onClick={() => onDelete(user)}
          className="text-rose-600 hover:underline cursor-pointer"
          id={`delete-${user?.id}`}
        >
          <RemoveIcon className={"w-5 fill-rose-500 "} />
          <Tooltip
            anchorId={`delete-${user?.id}`}
            content="Delete"
            place="top"
            variant="light"
            className="!bg-white !opacity-100 !py-0.5 !px-1.5 !text-xs font-medium z-10"
          />
        </button>
      </div>
    </td>
  </>
);

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

export const hobbiesOptions = [
  { value: "Reading", label: "Reading" },
  { value: "Traveling", label: "Traveling" },
  { value: "Gaming", label: "Gaming" },
  { value: "Cooking", label: "Cooking" },
  { value: "Sports", label: "Sports" },
];
