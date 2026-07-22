import { FiSearch, FiPlus } from "react-icons/fi";
import "./CustomerToolbar.css";

const CustomerToolbar = ({
  search,
  setSearch,
  onAdd,
}) => {
  return (
    <div className="customer-toolbar">

      <div className="customer-search">

        <FiSearch className="customer-search-icon" />

        <input
          type="text"
          placeholder="Search customers by name, phone or code..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      <button
        className="add-customer-btn"
        onClick={onAdd}
      >

        <FiPlus />

        Add Customer

      </button>


    </div>
  );
};

export default CustomerToolbar;