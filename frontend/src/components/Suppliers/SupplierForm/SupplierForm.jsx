import { useEffect, useState } from "react";
import "./SupplierForm.css";

const initialState = {
  businessName: "",
  contactPerson: "",

  contact: {
    phone: "",
    alternativePhone: "",
    email: "",
  },

  kraPin: "",

  address: {
    county: "",
    town: "",
    street: "",
    postalCode: "",
  },

  notes: "",

  status: "active",
};

const SupplierForm = ({ supplier, onSubmit }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (supplier) {
      setFormData({
        businessName: supplier.businessName || "",

        contactPerson: supplier.contactPerson || "",

        contact: {
          phone: supplier.contact?.phone || "",
          alternativePhone:
            supplier.contact?.alternativePhone || "",
          email: supplier.contact?.email || "",
        },

        kraPin: supplier.kraPin || "",

        address: {
          county: supplier.address?.county || "",
          town: supplier.address?.town || "",
          street: supplier.address?.street || "",
          postalCode:
            supplier.address?.postalCode || "",
        },

        notes: supplier.notes || "",

        status: supplier.status || "active",
      });
    } else {
      setFormData(initialState);
    }
  }, [supplier]);

  const handleChange = (section, field, value) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="supplier-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {supplier
          ? "Edit Supplier"
          : "Add Supplier"}
      </h2>

      <div className="supplier-grid">

        <input
          type="text"
          placeholder="Business Name"
          required
          value={formData.businessName}
          onChange={(e) =>
            handleChange(
              null,
              "businessName",
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Contact Person"
          value={formData.contactPerson}
          onChange={(e) =>
            handleChange(
              null,
              "contactPerson",
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          required
          value={formData.contact.phone}
          onChange={(e) =>
            handleChange(
              "contact",
              "phone",
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Alternative Phone"
          value={formData.contact.alternativePhone}
          onChange={(e) =>
            handleChange(
              "contact",
              "alternativePhone",
              e.target.value
            )
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.contact.email}
          onChange={(e) =>
            handleChange(
              "contact",
              "email",
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="KRA PIN"
          value={formData.kraPin}
          onChange={(e) =>
            handleChange(
              null,
              "kraPin",
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="County"
          value={formData.address.county}
          onChange={(e) =>
            handleChange(
              "address",
              "county",
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Town"
          value={formData.address.town}
          onChange={(e) =>
            handleChange(
              "address",
              "town",
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Street"
          value={formData.address.street}
          onChange={(e) =>
            handleChange(
              "address",
              "street",
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Postal Code"
          value={formData.address.postalCode}
          onChange={(e) =>
            handleChange(
              "address",
              "postalCode",
              e.target.value
            )
          }
        />

        <select
          value={formData.status}
          onChange={(e) =>
            handleChange(
              null,
              "status",
              e.target.value
            )
          }
        >
          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>

      </div>

      <textarea
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) =>
          handleChange(
            null,
            "notes",
            e.target.value
          )
        }
      />

      <button type="submit">
        {supplier
          ? "Update Supplier"
          : "Create Supplier"}
      </button>
    </form>
  );
};

export default SupplierForm;