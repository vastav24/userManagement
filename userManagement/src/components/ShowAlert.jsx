import Swal from "sweetalert2";

export const showAlert = async (message, isError = "success", timer = 3000) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: isError,
    title: message,
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
  });
};
