import SettingsHeader from "../../components/settings/SettingsHeader/SettingsHeader";
import BusinessProfile from "../../components/settings/BusinessProfile/BusinessProfile";
import StoreSettings from "../../components/settings/StoreSettings/StoreSettings";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-page">

      <SettingsHeader />

      <BusinessProfile />

       <StoreSettings />

    </div>
  );
};

export default Settings;