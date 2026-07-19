import "./CustomerToolbar.css";

const CustomerToolbar = ({ search, setSearch, onAdd }) => {
  return (
    <div className="customer-toolbar">

      <div className="customer-toolbar-left">
        <input
          type="text"
          placeholder="Search by name, phone or customer code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="customer-toolbar-right">
        <button
          className="add-customer-btn"
          onClick={onAdd}
        >
          + Add Customer
        </button>
      </div>

    </div>
  );
};

export default CustomerToolbar;