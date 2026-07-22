import { FiSearch, FiPlus } from "react-icons/fi";
import "./CategoryToolbar.css";

const CategoryToolbar = ({
  search,
  setSearch,
  onAdd,
}) => {
  return (
    <div className="category-toolbar">

      <div className="category-search">

        <FiSearch className="category-search-icon" />

        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      <button
        className="add-category-btn"
        onClick={onAdd}
      >

        <FiPlus />

        Add Category

      </button>


    </div>
  );
};

export default CategoryToolbar;