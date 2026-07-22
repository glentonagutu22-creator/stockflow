import api from "./api";


export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/uploads/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};



export const uploadLogo = async (file) => {
  const formData = new FormData();

  formData.append("logo", file);

  const response = await api.post(
    "/settings/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};