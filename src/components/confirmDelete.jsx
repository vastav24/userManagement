import Swal from "sweetalert2";
export function ConfirmDelete(
  message = "Are you sure you want to delete this?"
) {
  return Swal.fire({
    title: "Confirm Delete",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it",
  }).then((result) => result.isConfirmed);
}
