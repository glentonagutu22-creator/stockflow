import "./SupplierToolbar.css";

const SupplierToolbar = ({
  search,
  setSearch,
  onAdd,
}) => {
  return (
    <div className="supplier-toolbar">

      <input
        type="text"
        placeholder="Search suppliers..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <button onClick={onAdd}>
        + Add Supplier
      </button>

    </div>
  );
};

export default SupplierToolbar;