import "./PurchaseModal.css";
import PurchaseForm from "../PurchaseForm/PurchaseForm";

const PurchaseModal = ({
  isOpen,
  onClose,
  purchase,
  onSubmit,
}) => {

  if (!isOpen) return null;


  return (
    <div className="purchase-modal-overlay">

      <div className="purchase-modal">

        <button
          className="purchase-modal-close"
          onClick={onClose}
        >
          ×
        </button>


        <PurchaseForm
          purchase={purchase}
          onSubmit={onSubmit}
        />

      </div>

    </div>
  );
};


export default PurchaseModal;