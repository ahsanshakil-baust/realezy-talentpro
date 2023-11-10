import { Icon, Logo } from '@/components/shared'
import { useGetStatementDetailsQuery } from '@/store'
import { StoreState, UserType } from '@/types'
import { getStatementName, toTitleCase } from '@/util'
import { Button, Drawer, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import useDownloader from 'react-use-downloader'

interface TransactionInvoiceProps {
  show: boolean
  handelClose: () => void
  statementId: string
  paymentStatus: string
  link: string
  month: string
  year: string
}

const TransactionInvoice = ({
  show,
  handelClose,
  statementId,
  paymentStatus,
  link,
  month,
  year,
}: TransactionInvoiceProps) => {
  const { type: userType }: { type: UserType } = useSelector((state: StoreState) => state.entities.user)
  // const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader()
  const { download } = useDownloader()

  const fileUrl = link
  const filename = `${getStatementName(paymentStatus)}_of_${month}_${year}.pdf`

  const {
    data: statementData,
    isLoading: statementLoading,
    isError: statementError,
  } = useGetStatementDetailsQuery({ statementId, userType }, { skip: !statementId || !userType || !show })

  const {
    // receipt_status,
    // receipt_for,
    receipt_no,
    receipt_due_date,
    receipt_paid_date,
    tenant_name,
    tenant_email,
    tenant_phone,
    // landlord_name,
    // landlord_email,
    // landlord_phone,
    property_name,
    property_address,
    property_type,
    property_postal_code,
    rental_type,
    rental_period,
    start_date,
    // payment_mode,
    monthly_rental,
    admin_fee,
    // stamp_duty_fee,
    sub_total,
    total_amount,
    total_amount_text,
    // invoice,
  } = statementData || {}

  return (
    <Drawer anchor="right" open={show} onClose={handelClose} className="!transaction-invoice">
      <div className="transaction-invoice-header bg-userRole">
        <IconButton aria-label="close" color="light" className="text-4xl p-0 mr-3" onClick={handelClose}>
          <Icon name="modalClose" />
        </IconButton>
        <p className="font-medium text-white text-2xl">{getStatementName(paymentStatus)}</p>

        <Button
          onClick={() => download(fileUrl, filename)}
          variant="outlined"
          color="light"
          className="!ml-auto !text-base !py-2 !px-5">
          Download
        </Button>
      </div>
      <div className="transaction-invoice-navigator">
        <div className="flex items-center text-2xl">
          <Icon name="chevronLeft" className="mr-3" />
          <Icon name="calendar" />
          <p className="text-lg font-medium ml-3">{`${month} - ${year}`}</p>
          <Icon name="chevronRight" className="ml-3" />
        </div>
        <div className="flex items-center">
          <p className="text-lg">Status :</p>
          <p className="text-userRole text-lg font-medium ml-3">{toTitleCase(paymentStatus)}</p>
        </div>
      </div>
      {!statementId || !userType ? (
        <p className="py-5 px-12">No Data...</p>
      ) : statementLoading || !statementData ? (
        <p className="py-5 px-12">Loading...</p>
      ) : statementError ? (
        <p className="py-5 px-12">Something went wrong...</p>
      ) : (
        <div className="transaction-invoice-body">
          {/* transaction-invoice-body-header */}
          <div className="flex items-center justify-between mb-4">
            <div className="bg-userRole py-4 pl-12 pr-32 rounded-br-full">
              <p className="text-white text-3xl font-bold">{getStatementName(paymentStatus).toUpperCase()}</p>
            </div>
            <div className="bg-lavender py-1 pr-12 pl-16 rounded-bl-full">
              <Logo width="190px" />
            </div>
          </div>
          {/* /transaction-invoice-body-header */}
          <div className="text-textValueColor flex justify-between px-12 mb-3">
            <div className="">
              <p className="text-userRole">Receipt No</p>
              <p className="text-userRole text-xl font-bold">{receipt_no}</p>
            </div>
            <div className=" text-right">
              <p className="text-userRole">Total Amount</p>
              <p className="text-userRole text-xl font-bold">{total_amount_text}</p>
            </div>
          </div>
          <div className="flex justify-between px-12 mb-3">
            <div className="">
              <p className="font-medium">Receipt For</p>
              <p className="text-xl font-bold">{tenant_name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Due Date</p>
              <p className="">{receipt_due_date}</p>
            </div>
          </div>
          <div className="flex justify-between px-12 mb-3">
            <div className="text-sm">
              <p className="mb-1">{tenant_email}</p>
              <p className="mb-1">{tenant_phone}</p>
            </div>
            {receipt_paid_date && (
              <div className="text-right">
                <p className="font-medium">Pay Date</p>
                <p className="">{receipt_paid_date}</p>
              </div>
            )}
          </div>
          {/* Booking Details */}
          <div className="px-12 mb-4">
            <h3 className="text-userRole text-lg font-bold">Booking Details</h3>
          </div>
          <div className="text-textValueColor text-sm grid gap-3 px-12 mb-5">
            <div className="flex">
              <div className="w-2/3 grid grid-cols-2">
                <p className="">Property Name</p>
                <p className="font-medium">{property_name}</p>
              </div>
              <div className="w-1/3 grid grid-cols-2">
                <p className="">Rental Type</p>
                <p className="font-medium">{rental_type}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/3 grid grid-cols-2">
                <p className="">Address</p>
                <p className="font-medium">{property_address}</p>
              </div>
              <div className="w-1/3 grid grid-cols-2">
                <p className="">Monthly Rental</p>
                <p className="font-medium">{monthly_rental}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/3 grid grid-cols-2">
                <p className="">Property Type</p>
                <p className="font-medium">{property_type}</p>
              </div>
              <div className="w-1/3 grid grid-cols-2">
                <p className="">Unit No</p>
                <p className="font-medium">02-16</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/3 grid grid-cols-2">
                <p className="">Postal Code</p>
                <p className="font-medium">{property_postal_code}</p>
              </div>
              <div className="w-1/3 grid grid-cols-2">
                <p className="">Period</p>
                <p className="font-medium">{rental_period}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/3 grid grid-cols-2">
                <p className="">Start Date</p>
                <p className="font-medium">{start_date}</p>
              </div>
            </div>
          </div>
          {/* /Booking Details */}
          {/* Payment Details */}
          <div className="transaction-invoice-body-card">
            <div className="transaction-invoice-body-card-header bg-userRole">
              <p>Description</p>
              <p>Amount</p>
            </div>
            <div className="transaction-invoice-body-card-entry">
              <div className="">
                <p className="font-medium">Month Rent</p>
                <p className="text-sm">{`${month} month rent`}</p>
              </div>
              <p className="font-medium">{monthly_rental}</p>
            </div>
            <div className="transaction-invoice-body-card-entry">
              <div className="">
                <p className="font-medium">Admin Fee</p>
                <p className="text-sm">RealEzy Admin Fee</p>
              </div>
              <p className="font-medium">{admin_fee}</p>
            </div>
          </div>
          <div className="text-textValueColor px-12 mb-4">
            <div className="transaction-invoice-body-bottom-entry">
              <div className="w-1/2 grid gap-3">
                <p className="font-bold">Payment Method</p>
                <p className="">Cash</p>
              </div>
              <div className="w-1/2 grid gap-3">
                <div className="flex justify-between">
                  <p className="font-bold">Sub Total</p>
                  <p className="">{sub_total}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Tax 0%</p>
                  <p className="">$ 0</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-7/12 bg-userRole text-white py-3 pl-14 pr-12 rounded-full ml-3 flex justify-between">
                <p>Total</p>
                <p>{total_amount}</p>
              </div>
            </div>
          </div>
          {/* /Payment Details */}
          {/* Refund Policy Terms & Condition */}
          <div className="px-12">
            <h3 className="text-userRole text-lg font-bold mb-3">Refund Policy, Terms & Condition</h3>
            <ul className="text-sm list-disc list-inside mb-5">
              <li>Amount Is In Local Singapore Currency</li>
              <li>
                If Tenant's Non-Deposit Eligibility Check IS Not Approved OR If Landlord Does, Not Complete The Deal OR
                Cancels Deal Prior To Tenancy, Agreement Commencement Date. Tenant Will Receive Full Refund Of Amount
                Paid. Amount Will Be Refunded Manually TO Tenant's Payment, Bank Account Within 10 Business Days.
              </li>
              <li>
                If Tenant Cancels Deal Prior To Tenancy Agreement Commencement Date, Tenant Will Receive Refund Of
                Advance 1 St Month Rent Paid And Advance Tenancy Agreement Stamp Duty Fee Paid, However RealEzy Admin
                Fee paid IS Non-Refundable.
              </li>
              <li>
                If You Have Any Queries About This Receipt, Please Contact Us At Support@Real-Ezy.Com Quoting Your
                Receipt Number. This Is A Computer-Generated Document. No Signature Is Required.
              </li>
            </ul>
            <h3 className="text-userRole text-center text-lg font-bold">Thank you for using RealEzy!</h3>
          </div>
          {/* /Refund Policy Terms & Condition */}
        </div>
      )}
    </Drawer>
  )
}
export default TransactionInvoice
