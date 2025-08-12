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
      <button
        onClick={() => onView(user)}
        className="text-green-600 hover:underline cursor-pointer"
      >
        View
      </button>
      <button
        onClick={() => onEdit(user)}
        className="pl-2.5 pr-2.5 text-blue-600 hover:underline cursor-pointer"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(user)}
        className="text-rose-600 hover:underline cursor-pointer"
      >
        Delete
      </button>
    </td>
  </>
);
