import { FiSearch, FiPlus } from "react-icons/fi";
import "./SupplierToolbar.css";

const SupplierToolbar = ({
  search,
  setSearch,
  onAdd,
}) => {
  return (
    <div className="supplier-toolbar">

      <div className="supplier-search">

        <FiSearch className="supplier-search-icon" />

        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      <button
        className="add-supplier-btn"
        onClick={onAdd}
      >

        <FiPlus />

        Add Supplier

      </button>


    </div>
  );
};

export default SupplierToolbar;