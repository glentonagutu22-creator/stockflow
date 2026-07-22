import { FiSearch } from "react-icons/fi";
import "./SaleSearch.css";

const SaleSearch = ({
  search,
  setSearch,
}) => {
  return (
    <div className="sale-search">

      <FiSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search products by name or SKU..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </div>
  );
};

export default SaleSearch;