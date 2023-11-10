import React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'
import { useRentalOfferDetailsQuery } from '@/store'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const TenantDetails = () => {
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const { data: rentalDetails } = useRentalOfferDetailsQuery({
    propertyId: payload?.threadInfo?.property_id,
    userId: payload?.threadInfo?.sender_id,
  }) // , isLoading: rentalDetailsLoading
  console.log('🚀 ~ file: TenantDetails.tsx:41 ~ TenantDetails ~ rentalDetails:', rentalDetails)
  return (
    <div className="max-h-[560px] 2xl:max-h-[700px] w-full flex flex-col px-[3.25rem] py-4 overflow-auto bg-inherit rounded-b-[20px]">
      <h1 className="text-xl font-bold my-3">Information On Rental</h1>
      <p>Rental / Month : S$ {rentalDetails?.makeOfferInfo?.offer_amount}</p>
      <p>Proposed Effective Date of Rental : {rentalDetails?.makeOfferInfo?.commencement_date}</p>
      <p>Rental Period : {parseInt(rentalDetails?.makeOfferInfo?.tenancy_period) * 12} Month</p>
      <h1 className="text-xl font-bold my-3">Details of Tenants</h1>
      <p>Type of Tenants : {rentalDetails?.makeOfferInfo?.occupiers_list[0].tenant_type}</p>
      <p>Total Number of Tenant : {rentalDetails?.makeOfferInfo?.occupiers_list?.length}</p>
      {rentalDetails?.makeOfferInfo?.occupiers_list.map((val: any, ind: any) => {
        return (
          <div key={ind}>
            <h1 className="text-xl font-bold my-3">Tenant {ind + 1} Info</h1>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      NRIC/FIN Number
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.idNumber}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Name
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.name}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Date of Birth
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.dateOfBirth}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Sex
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.gender}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Citizenship
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.citizenShip}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Nationality
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.nationality}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Race
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.race}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Pass Type
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.pass_type}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Sector
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.occupation}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Relationship with Main Tenant
                    </StyledTableCell>
                    <StyledTableCell align="right">{val?.relationship}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )
      })}
    </div>
  )
}

export default TenantDetails
