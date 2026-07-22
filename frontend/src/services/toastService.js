import { toast } from "react-toastify";

const toastService = {
  success(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 2500,
    });
  },

  error(error) {
    const message =
      typeof error === "string"
        ? error
        : error?.response?.data?.message ||
          "Something went wrong.";

    toast.error(message, {
      position: "top-right",
      autoClose: 3500,
    });
  },

  warning(message) {
    toast.warning(message, {
      position: "top-right",
      autoClose: 3000,
    });
  },

  info(message) {
    toast.info(message, {
      position: "top-right",
      autoClose: 2500,
    });
  },

  loading(message = "Please wait...") {
    return toast.loading(message);
  },

  updateSuccess(id, message) {
    toast.update(id, {
      render: message,
      type: "success",
      isLoading: false,
      autoClose: 2500,
      closeButton: true,
    });
  },

  updateError(id, error) {
    const message =
      typeof error === "string"
        ? error
        : error?.response?.data?.message ||
          "Something went wrong.";

    toast.update(id, {
      render: message,
      type: "error",
      isLoading: false,
      autoClose: 3500,
      closeButton: true,
    });
  },
};

export default toastService;