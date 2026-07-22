import "../ReportCommon.css";

const InventoryReport = ({ data }) => {

  const products = Array.isArray(data) ? data : [];


  return (

    <div className="report-card">

      <h2>Inventory Report</h2>


      <div className="report-table-wrapper">

        <table className="report-table">

          <thead>

            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Status</th>
            </tr>

          </thead>


          <tbody>

          {
            products.length > 0 ? (

              products.map((product)=>(

                <tr key={product._id || product.sku}>

                  <td>
                    {product.sku}
                  </td>


                  <td>
                    {product.name}
                  </td>


                  <td>
                    {product.category}
                  </td>


                  <td>
                    {product.quantity}
                  </td>


                  <td>
                    Ksh{" "}
                    {Number(
                      product.buyingPrice ?? 0
                    ).toLocaleString()}
                  </td>


                  <td>
                    Ksh{" "}
                    {Number(
                      product.sellingPrice ?? 0
                    ).toLocaleString()}
                  </td>


                  <td>

                    <span
                      className={
                        product.quantity <= product.minimumStock
                        ? "status-warning"
                        : "status-success"
                      }
                    >

                      {
                        product.quantity <= product.minimumStock
                        ? "Low Stock"
                        : "Available"
                      }

                    </span>

                  </td>


                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign:"center"
                  }}
                >
                  No inventory records found.
                </td>

              </tr>

            )

          }


          </tbody>


        </table>

      </div>


    </div>

  );

};


export default InventoryReport;