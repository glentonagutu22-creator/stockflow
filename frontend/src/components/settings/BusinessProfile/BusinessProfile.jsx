import { useState } from "react";
import {
  MdBusiness,
  MdPhone,
  MdEmail,
  MdLocationOn,
} from "react-icons/md";

import "./BusinessProfile.css";

const BusinessProfile = () => {

  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend comes next
  };

  return (
    <div className="business-profile">

      <div className="section-header">

        <h2>Business Profile</h2>

        <p>
          This information appears on
          receipts and reports.
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="settings-grid">

          <div className="settings-input">

            <label>
              <MdBusiness />
              Business Name
            </label>

            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="StockFlow Enterprises"
            />

          </div>

          <div className="settings-input">

            <label>
              <MdPhone />
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254..."
            />

          </div>

          <div className="settings-input">

            <label>
              <MdEmail />
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@business.com"
            />

          </div>

          <div className="settings-input">

            <label>
              <MdLocationOn />
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Business Address"
            />

          </div>

        </div>

        <button
          className="save-settings-btn"
          type="submit"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
};

export default BusinessProfile;