const LandlordFees = () => {
  return (
    <>
      <h2 className="content-header text-textValueColor ">Landlords Insurance Package</h2>
      <p className="content-title font-light mb-6">
        The Landlords Insurance Package which is 25% of the Monthly Rental Value consist of Insurance Premium and
        Processing Fee and is Renewable Yearly. The Insurance package covers the following benefits to the Landlord
        subject to terms and conditions:
      </p>
      <ul className=" flex flex-col gap-4 ml-11">
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">Loss of Rent coverage of up to 2 months Rental.</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">Damage to Household Content coverage up to $ 60,000/-</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">Fixture Reinstatement that was damaged up to $ 90,000/-</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">Legal Cost and Expenses up to 1 months rent or $ 5,000/-</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">Cleaning Services up to $ 1000/-</span>
        </li>
      </ul>
      <h2 className="content-header text-textValueColor mt-7">Realezy Managed Service Fee</h2>
      <p className="content-title font-light mb-6">
        RealEzy will deduct 4% Managed Service Fee of the monthly rental fee, for services to be provided such as:
      </p>
      <ul className=" flex flex-col gap-4 ml-11">
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">Processing collections & transferring rental,</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">updating Statement of Accounts,</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">following up on late payment,</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">following the protocol for eviction, if required,</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">arranging for maintenance of property, when required by Landlord,</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">assisting in insurance claims.</span>
        </li>
        <li>
          <div className=" li-marker-shape"></div>
          <span className="li-text">advising on fees payable for maintenance to be carried out by contractors,</span>
        </li>
      </ul>

      <p className=" content-title font-bold mt-6">
        Real Ezy Pte Ltd giving away a 50% discount on the 4% Managed Service Fee. We will only be charging 2% till 31st
        December 2023.
      </p>
    </>
  )
}
export default LandlordFees
