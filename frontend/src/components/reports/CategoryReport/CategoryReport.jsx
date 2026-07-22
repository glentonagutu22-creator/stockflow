import "../ReportCommon.css";

const CategoryReport = ({ data }) => {

  const categories = Array.isArray(data)
    ? data
    : [];


  return (

    <div className="report-card">

      <h2>
        Category Report
      </h2>


      <div className="report-table-wrapper">

        <table className="report-table">

          <thead>

            <tr>
              <th>Category</th>
              <th>Products</th>
              <th>Stock</th>
              <th>Inventory Value</th>
            </tr>

          </thead>


          <tbody>

            {
              categories.length > 0 ? (

                categories.map((category)=>(

                  <tr
                    key={
                      category._id ||
                      category.category
                    }
                  >

                    <td>
                      {category.category}
                    </td>


                    <td>
                      {category.totalProducts || 0}
                    </td>


                    <td>
                      {category.totalStock || 0}
                    </td>


                    <td>
                      Ksh{" "}
                      {Number(
                        category.inventoryValue ?? 0
                      ).toLocaleString()}
                    </td>


                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      textAlign:"center"
                    }}
                  >
                    No category records found.
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


export default CategoryReport;