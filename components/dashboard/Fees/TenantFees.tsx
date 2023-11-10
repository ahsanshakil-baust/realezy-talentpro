const TenantFees = () => {
  return (
    <>
      <h2 className="content-header">Tenants Reservation Fee</h2>
      <div className="grid xl:grid-cols-2 gap-16">
        <div className="">
          <table className="table-fees w-full">
            <tbody>
              <tr>
                <th>Monthly Rental Range</th>
                <th>Reservation Fee</th>
                <th>Fee Payable</th>
                <th>Total Fee Payable</th>
              </tr>
              <tr>
                <td rowSpan={3}>≤ $1K to ≤ $1.5K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>160</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>20</td>
              </tr>
              <tr>
                <td rowSpan={3}>&gt; $1.5K to ≤ $2K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>210</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>70</td>
              </tr>
              <tr>
                <td rowSpan={3}>&gt; $2K to ≤ $2.5K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>260</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>120</td>
              </tr>
              <tr>
                <td rowSpan={3}>&gt; $2.5K to ≤ $3K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>310</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>170</td>
              </tr>
              <tr>
                <td rowSpan={3}>&gt; $3K to ≤ $3.5K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>360</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>220</td>
              </tr>
              <tr>
                <td rowSpan={3}>&gt; $3.5K to ≤ $4K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>410</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>270</td>
              </tr>
              <tr>
                <td rowSpan={3}>&gt; $4K to ≤ $4.5K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>460</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>320</td>
              </tr>
              <tr>
                <td rowSpan={3}>&gt; $4.5K to ≤ $5K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>510</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>370</td>
              </tr>
              <tr>
                <td rowSpan={3}>&gt; $5K</td>
                <td>Platform Fee</td>
                <td>100</td>
                <td rowSpan={3}>610</td>
              </tr>
              <tr>
                <td>AR Processing Fee</td>
                <td>40</td>
              </tr>
              <tr>
                <td>eSigning Fee</td>
                <td>470</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <h2 className="content-header mb-5">Platform Fee:</h2>
          <p className=" text-lg font-light mb-5">
            Is for Usage of Platform and covers the cost associated with running and maintaining the secured platform
          </p>
          <h2 className="content-header">AR Processing Fee:</h2>
          <p className=" text-lg font-light mb-5">
            Is service provided by Aardvark Pte Ltd for the complete verification of procedures and documentation and
            ensuring that all Government regulations are complied with.
          </p>
          <h2 className="content-header">E-Signing Fee:</h2>

          <p className=" text-lg font-light mb-5">
            Is for preparations of E-Tenancy Agreement on a secured platform with provision for the electronic stamping
            of the E- Tenancy Agreement and tiered to the value of the undertaking.
          </p>
          <p className=" text-lg font-light mb-3">
            In the event that the E-Tenancy agreement is not signed, only the AR Processing Fee and E-signing Fee will
            be refunded to the Tenant.
          </p>
        </div>
      </div>
    </>
  )
}
export default TenantFees
