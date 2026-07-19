import "./CategoryToolbar.css";

const CategoryToolbar = ({ search, setSearch, onAdd }) => {
  return (
    <div className="category-toolbar">
      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={onAdd}>
        + Add Category
      </button>
    </div>
  );
};

export default CategoryToolbar;