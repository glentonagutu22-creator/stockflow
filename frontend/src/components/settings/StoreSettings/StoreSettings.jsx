import { useState } from "react";
import {
  MdLanguage,
  MdCalendarMonth,
  MdOutlineStore,
  MdInventory,
} from "react-icons/md";

import "./StoreSettings.css";

const StoreSettings = () => {
  const [settings, setSettings] = useState({
    currency: "KES",
    timezone: "Africa/Nairobi",
    dateFormat: "DD/MM/YYYY",
    lowStockAlert: 10,
    language: "English",
  });

  const handleChange = (e) => {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(settings);

    // Save to backend later
  };

  return (
    <div className="store-settings">

      <div className="section-header">

        <h2>Store Settings</h2>

        <p>
          Configure your store preferences.
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="settings-grid">

          <div className="settings-input">

            <label>
              <MdOutlineStore />
              Currency
            </label>

            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option value="KES">
                Kenyan Shilling (KES)
              </option>

              <option value="USD">
                US Dollar (USD)
              </option>

              <option value="EUR">
                Euro (EUR)
              </option>
            </select>

          </div>

          <div className="settings-input">

            <label>
              <MdCalendarMonth />
              Time Zone
            </label>

            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
            >
              <option value="Africa/Nairobi">
                Africa/Nairobi
              </option>

              <option value="UTC">
                UTC
              </option>
            </select>

          </div>

          <div className="settings-input">

            <label>
              <MdCalendarMonth />
              Date Format
            </label>

            <select
              name="dateFormat"
              value={settings.dateFormat}
              onChange={handleChange}
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>

          </div>

          <div className="settings-input">

            <label>
              <MdInventory />
              Low Stock Alert
            </label>

            <input
              type="number"
              min="1"
              name="lowStockAlert"
              value={settings.lowStockAlert}
              onChange={handleChange}
            />

          </div>

          <div className="settings-input full-width">

            <label>
              <MdLanguage />
              Language
            </label>

            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option>English</option>
              <option>Swahili</option>
            </select>

          </div>

        </div>

        <button
          className="save-settings-btn"
          type="submit"
        >
          Save Store Settings
        </button>

      </form>

    </div>
  );
};

export default StoreSettings;