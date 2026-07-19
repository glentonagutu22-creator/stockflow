const CategoryRow = ({ category, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{category.name}</td>

      <td>{category.description}</td>

      <td>{category.status}</td>

      <td>
        <button onClick={() => onEdit(category)}>
          Edit
        </button>

        <button
          onClick={() => onDelete(category._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;