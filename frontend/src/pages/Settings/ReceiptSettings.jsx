import { useEffect, useState } from "react";
import "./ReceiptSettings.css";
import {
  getReceiptSettings,
  updateReceiptSettings,
} from "../../services/receiptSettingsService";
import { uploadLogo } from "../../services/cloudinaryService";


const ReceiptSettings = () => {
  const [formData, setFormData] = useState({
    logo: "",
    businessName: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    receiptHeader: "",
    footerMessage: "",
    showLogo: true,
    showAddress: true,
    paperSize: "80",
  });


  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getReceiptSettings();
      setFormData(data);
    } catch (error) {
      console.error("Failed to fetch receipt settings:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleLogoUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const imageUrl = await uploadLogo(file);

    setFormData((prev) => ({
      ...prev,
      logo: imageUrl,
    }));
  } catch (error) {
    console.error(error);
    alert("Logo upload failed.");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateReceiptSettings(formData);
      alert("Receipt settings saved successfully.");
    } catch (error) {
      console.error("Failed to save receipt settings:", error);
      alert("Failed to save receipt settings.");
    }
  };

  return (
    <div className="receipt-settings">
      <div className="settings-card">
        <h2>Receipt Settings</h2>

        <form onSubmit={handleSubmit}>
            <label>Business Logo</label>

<input
  type="file"
  accept="image/*"
  onChange={handleLogoUpload}
/>

{formData.logo && (
  <img
    src={formData.logo}
    alt="Business Logo"
    className="logo-preview"
  />
)}
          <label>Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
          />

          <label>Business Address</label>
          <input
            type="text"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
          />

          <label>Business Phone</label>
          <input
            type="text"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={handleChange}
          />

          <label>Business Email</label>
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
          />

          <label>Receipt Header</label>
          <textarea
            rows="2"
            name="receiptHeader"
            value={formData.receiptHeader}
            onChange={handleChange}
          />

          <label>Footer Message</label>
          <textarea
            rows="3"
            name="footerMessage"
            value={formData.footerMessage}
            onChange={handleChange}
          />

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="showLogo"
                checked={formData.showLogo}
                onChange={handleChange}
              />
              Show Logo
            </label>

            <label>
              <input
                type="checkbox"
                name="showAddress"
                checked={formData.showAddress}
                onChange={handleChange}
              />
              Show Address
            </label>
          </div>

          <label>Paper Size</label>

          <select
            name="paperSize"
            value={formData.paperSize}
            onChange={handleChange}
          >
            <option value="80">80 mm</option>
            <option value="58">58 mm</option>
          </select>

          <button type="submit" className="save-btn">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReceiptSettings;