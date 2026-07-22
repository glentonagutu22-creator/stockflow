import { FiEdit2, FiTrash2 } from "react-icons/fi";

const CategoryRow = ({
  category,
  onEdit,
  onDelete,
}) => {

  return (
    <tr>

      <td>
        <strong>
          {category.name}
        </strong>
      </td>


      <td>
        {category.description || "-"}
      </td>


      <td>

        <span
          className={
            category.status === "active"
              ? "category-status active"
              : "category-status inactive"
          }
        >
          {category.status}
        </span>

      </td>


      <td>

        <div className="category-actions">

          <button
            className="category-edit-btn"
            onClick={() => onEdit(category)}
          >
            <FiEdit2 />
          </button>


          <button
            className="category-delete-btn"
            onClick={() =>
              onDelete(category._id)
            }
          >
            <FiTrash2 />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default CategoryRow;