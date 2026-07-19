import { useEffect, useState } from "react";
import "./PurchaseForm.css";

import { getSuppliers } from "../../../services/supplierService";
import { getProducts } from "../../../services/productService";

const initialState = {
  supplier: "",
  items: [
    {
      product: "",
      quantity: 1,
      buyingPrice: 0,
      subtotal: 0,
    },
  ],
  subtotal: 0,
  discount: 0,
  tax: 0,
  totalAmount: 0,
  status: "Received",
  notes: "",
};


const PurchaseForm = ({
  purchase,
  onSubmit,
}) => {

  const [formData, setFormData] =
    useState(initialState);

  const [suppliers, setSuppliers] =
    useState([]);

  const [products, setProducts] =
    useState([]);


  useEffect(() => {

    loadSuppliers();
    loadProducts();

  }, []);


  useEffect(() => {

    if (purchase) {

      setFormData({

        supplier:
          purchase.supplier?._id ||
          purchase.supplier ||
          "",

        items:
          purchase.items?.map(item => ({
            product:
              item.product?._id ||
              item.product ||
              "",

            quantity:
              item.quantity,

            buyingPrice:
              item.buyingPrice,

            subtotal:
              item.subtotal,

          })) || [],


        subtotal:
          purchase.subtotal || 0,

        discount:
          purchase.discount || 0,

        tax:
          purchase.tax || 0,

        totalAmount:
          purchase.totalAmount || 0,

        status:
          purchase.status || "Received",

        notes:
          purchase.notes || "",

      });

    } else {

      setFormData(initialState);

    }

  }, [purchase]);



 const loadSuppliers = async () => {

  try {

    const response = await getSuppliers();


    console.log("Suppliers response:", response);


    setSuppliers(
      Array.isArray(response.data)
        ? response.data
        : response.data?.suppliers || []
    );


  } catch (error) {

    console.log(
      "Failed loading suppliers",
      error
    );

  }

};



  const loadProducts = async () => {

    try {

      const response =
        await getProducts({
          limit: 1000,
        });

     setProducts(
  Array.isArray(response.data)
    ? response.data
    : response.data?.products || []
);

    } catch (error) {

      console.log(error);

    }

  };



  const calculateTotals = (items) => {

    const subtotal =
      items.reduce(
        (sum, item) =>
          sum + item.subtotal,
        0
      );


    const totalAmount =
      subtotal -
      Number(formData.discount) +
      Number(formData.tax);


    setFormData(prev => ({
      ...prev,
      items,
      subtotal,
      totalAmount,
    }));

  };



  const handleProductChange = (
    index,
    productId
  ) => {


    const selectedProduct =
      products.find(
        product =>
          product._id === productId
      );


    const updatedItems =
      [...formData.items];


    updatedItems[index] = {

      ...updatedItems[index],

      product: productId,

      buyingPrice:
        selectedProduct?.buyingPrice || 0,

      subtotal:
        updatedItems[index].quantity *
        (selectedProduct?.buyingPrice || 0)

    };


    calculateTotals(updatedItems);

  };



  const handleItemChange = (
    index,
    field,
    value
  ) => {


    const updatedItems =
      [...formData.items];


    updatedItems[index][field] =
      Number(value);


    updatedItems[index].subtotal =
      updatedItems[index].quantity *
      updatedItems[index].buyingPrice;


    calculateTotals(updatedItems);

  };



  const addItem = () => {

    setFormData(prev => ({
      ...prev,

      items:[
        ...prev.items,

        {
          product:"",
          quantity:1,
          buyingPrice:0,
          subtotal:0
        }

      ]

    }));

  };



  const removeItem = (index) => {

    const updatedItems =
      formData.items.filter(
        (_,i)=>i!==index
      );


    calculateTotals(updatedItems);

  };



  const handleSubmit = (e)=>{

    e.preventDefault();
console.log("Submitting purchase:", formData);
    onSubmit(formData);

  };



  return (

    <form
      className="purchase-form"
      onSubmit={handleSubmit}
    >

      <h2>
        {purchase
          ? "Edit Purchase"
          : "Add Purchase"}
      </h2>


      <select
        value={formData.supplier}
        onChange={(e)=>
          setFormData({
            ...formData,
            supplier:e.target.value
          })
        }
        required
      >

        <option value="">
          Select Supplier
        </option>


        {suppliers.map(supplier=>(

          <option
            key={supplier._id}
            value={supplier._id}
          >
            {supplier.businessName}
          </option>

        ))}

      </select>


      <h3>Products</h3>


      {formData.items.map(
        (item,index)=>(

        <div
          className="purchase-item-row"
          key={index}
        >

          <select
            value={item.product}
            onChange={(e)=>
              handleProductChange(
                index,
                e.target.value
              )
            }
            required
          >

            <option value="">
              Select Product
            </option>


            {products.map(product=>(

              <option
                key={product._id}
                value={product._id}
              >
                {product.name}
              </option>

            ))}

          </select>


          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e)=>
              handleItemChange(
                index,
                "quantity",
                e.target.value
              )
            }
          />


          <input
            type="number"
            value={item.buyingPrice}
            onChange={(e)=>
              handleItemChange(
                index,
                "buyingPrice",
                e.target.value
              )
            }
          />


          <span>
            {item.subtotal}
          </span>


          <button
            type="button"
            onClick={()=>
              removeItem(index)
            }
          >
            Remove
          </button>


        </div>

      ))}


      <button
        type="button"
        onClick={addItem}
      >
        + Add Product
      </button>


      <input
        type="number"
        placeholder="Discount"
        value={formData.discount}
        onChange={(e)=>
          setFormData({
            ...formData,
            discount:Number(e.target.value)
          })
        }
      />


      <input
        type="number"
        placeholder="Tax"
        value={formData.tax}
        onChange={(e)=>
          setFormData({
            ...formData,
            tax:Number(e.target.value)
          })
        }
      />


      <h3>
        Total:
        KSh {formData.totalAmount}
      </h3>


      <select
        value={formData.status}
        onChange={(e)=>
          setFormData({
            ...formData,
            status:e.target.value
          })
        }
      >

        <option>
          Pending
        </option>

        <option>
          Received
        </option>

        <option>
          Cancelled
        </option>

      </select>


      <textarea
        placeholder="Notes"
        value={formData.notes}
        onChange={(e)=>
          setFormData({
            ...formData,
            notes:e.target.value
          })
        }
      />


      <button type="submit">
        {purchase
          ? "Update Purchase"
          : "Create Purchase"}
      </button>


    </form>

  );

};


export default PurchaseForm;