import "./SaleSearch.css";

const SaleSearch = ({ search, setSearch }) => {
  return (
    <div className="sale-search">
      <input
        type="text"
        placeholder="Search by product name or SKU..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SaleSearch;