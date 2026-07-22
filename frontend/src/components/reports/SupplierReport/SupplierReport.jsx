import "../ReportCommon.css";

const SupplierReport = ({ data }) => {

  const suppliers = Array.isArray(data)
    ? data
    : [];


  return (

    <div className="report-card">

      <h2>
        Supplier Report
      </h2>


      <div className="report-table-wrapper">

        <table className="report-table">

          <thead>

            <tr>
              <th>Supplier</th>
              <th>Purchases</th>
              <th>Total Amount</th>
            </tr>

          </thead>


          <tbody>

            {
              suppliers.length > 0 ? (

                suppliers.map((supplier)=>(

                  <tr
                    key={
                      supplier._id ||
                      supplier.supplierId
                    }
                  >

                    <td>
                      {supplier.supplierName || "-"}
                    </td>


                    <td>
                      {supplier.totalPurchases || 0}
                    </td>


                    <td>
                      Ksh{" "}
                      {Number(
                        supplier.totalAmount ?? 0
                      ).toLocaleString()}
                    </td>


                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    style={{
                      textAlign:"center"
                    }}
                  >
                    No supplier records found.
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


export default SupplierReport;