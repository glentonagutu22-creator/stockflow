import "./CategoryTable.css";
import CategoryRow from "../CategoryRow/CategoryRow";

const CategoryTable = ({
  categories,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!categories.length) {
    return <p>No categories found.</p>;
  }

  return (
    <div className="category-table-container">
      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th width="170">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <CategoryRow
              key={category._id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;