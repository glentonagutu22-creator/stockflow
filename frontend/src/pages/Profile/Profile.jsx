import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProfile, updateProfile } from "../../services/profileService";
import "./Profile.css";
import placeholder from "../../assets/placeholder.png";
const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      setFormData({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
      });

      setPreview(response.data.profileImage);
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);

      if (image) {
        data.append("profileImage", image);
      }

      await updateProfile(data);

      toast.success("Profile updated successfully");

      fetchProfile();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  return (
  <div className="profile-page">

    <div className="profile-card">

      <div className="profile-header">
        <h2>My Profile</h2>
        <p>
          Manage your account information
        </p>
      </div>


      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >


        <div className="profile-image-section">

          <img
  src={preview || placeholder}
  alt="Profile"
  className="profile-image"
  onError={(e) => {
    e.target.src = placeholder;
  }}
/>

          <label className="image-upload">

            Change Photo

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

          </label>


        </div>



        <div className="profile-fields">


          <div className="form-group">

            <label>Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />

          </div>



          <div className="form-group">

            <label>Email</label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />

          </div>



          <div className="form-group">

            <label>Phone</label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

          </div>


        </div>



        <button
          className="save-profile-btn"
          type="submit"
        >
          Save Changes
        </button>


      </form>


    </div>


  </div>
);
};

export default Profile;