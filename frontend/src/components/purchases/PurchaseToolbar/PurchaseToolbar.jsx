import "./PurchaseToolbar.css";

const PurchaseToolbar = ({
  search,
  setSearch,
  onAdd,
}) => {
  return (
    <div className="purchase-toolbar">

      <input
        type="text"
        placeholder="Search purchases..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      <button onClick={onAdd}>
        + New Purchase
      </button>

    </div>
  );
};


export default PurchaseToolbar;