import "../ReportCommon.css";

const LowStockReport = ({ data }) => {

  const products = Array.isArray(data)
    ? data
    : [];


  return (

    <div className="report-card">

      <h2>
        Low Stock Products
      </h2>


      <div className="report-table-wrapper">

        <table className="report-table">

          <thead>

            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Current Stock</th>
              <th>Minimum Stock</th>
              <th>Status</th>
            </tr>

          </thead>


          <tbody>

            {
              products.length > 0 ? (

                products.map((product)=>(

                  <tr
                    key={
                      product._id ||
                      product.sku
                    }
                  >

                    <td>
                      {product.sku}
                    </td>


                    <td>
                      {product.name}
                    </td>


                    <td>
                      {product.quantity}
                    </td>


                    <td>
                      {product.minimumStock}
                    </td>


                    <td>

                      <span className="status-warning">
                        Low Stock
                      </span>

                    </td>


                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    style={{
                      textAlign:"center"
                    }}
                  >
                    No low stock products.
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


export default LowStockReport;