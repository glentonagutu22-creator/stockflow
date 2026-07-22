import { useEffect, useState } from "react";
import "./Purchases.css";
import toastService from "../../services/toastService";
import PurchaseToolbar from "../../components/purchases/PurchaseToolbar/PurchaseToolbar";
import PurchaseTable from "../../components/purchases/PurchaseTable/PurchaseTable";
import PurchaseModal from "../../components/purchases/PurchaseModal/PurchaseModal";

import {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "../../services/purchaseService";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const fetchPurchases = async () => {
    try {
      setLoading(true);

      const response = await getPurchases({ search });

      console.log("Purchases API:", response);

      setPurchases(response.data?.purchases || []);
    } catch (error) {
      console.error("Failed to fetch purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [search]);

  const handleAdd = () => {
    setSelectedPurchase(null);
    setIsModalOpen(true);
  };

  const handleEdit = (purchase) => {
    setSelectedPurchase(purchase);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    console.log("Purchases.jsx received:", formData);

    try {
      console.log("About to call API...");

      let response;

      if (selectedPurchase) {
        console.log("Updating purchase...");

        response = await updatePurchase(
          selectedPurchase._id,
          formData
        );
      } else {
        console.log("Creating purchase...");

        response = await createPurchase(formData);
      }

      console.log("API Response:", response);

      setIsModalOpen(false);
      setSelectedPurchase(null);

      await fetchPurchases();
    } catch (error) {
      toastService.error("Purchase save failed:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this purchase?"
      )
    ) {
      return;
    }

    try {
      await deletePurchase(id);
      await fetchPurchases();
    } catch (error) {
      toastService.error("Delete failed:", error);

      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="purchases-page">
      <div className="page-header">
        <h1>Purchases</h1>
      </div>

      <PurchaseToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
      />

      {loading ? (
        <p>Loading purchases...</p>
      ) : (
        <PurchaseTable
          purchases={purchases}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPurchase(null);
        }}
        purchase={selectedPurchase}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Purchases;