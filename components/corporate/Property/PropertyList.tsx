import React from 'react'
import { Tab, TablePagination, Typography } from '@mui/material'
import { Box } from '@mui/material'
import Image from 'next/image'
import { Tabs } from '@mui/material'

import BulkUploadIcon from 'public/corporate-icon/bulk.svg'
import FilterCogIcon from 'public/corporate-icon/filtercog.svg'
import PropertyAddIcon from 'public/corporate-icon/propertyadd.svg'
import UploadCsvIcon from 'public/corporate-icon/uploadcsv.svg'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'
import { hideModal, showModal, useGetCorporatePropertyListQuery } from '@/store'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload'
import { Button } from '@mui/material'
import PropertyAdd from './AddSingleProperty'
import UploadBulkProperty from './UploadBulkProperty'
import AddSingleProperty from './AddSingleProperty'
import PublishedPropertyTable from './PublishedPropertyTable'
import { useSession } from 'next-auth/react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  )
}

function createData(
  name: any,
  representative: any,
  amount: any,
  propertyType: any,
  updateDate: any,
  status: any,
  action: any
): any {
  return {
    name,
    representative,
    amount,
    propertyType,
    updateDate,
    status,
    action,
  }
}

const rows = [
  createData(
    'Normanton Park Residence Normanton',
    'Chris Aying',
    '$2200',
    'Whole Unit',
    '01-Apr-2023',
    'Awaiting For Tenant Signature',
    <button className="cursor-pointer border border-[#00ADEE] rounded-md text-[#00ADEE] text-sm bg-transparent px-5 py-1">
      Details
    </button>
  ),
]

function PropertyList() {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const [value, setValue] = React.useState(0)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const { data: session }: any = useSession()
  const {
    data: propertyList,
    isLoading: propertyLoading,
    refetch: refetchCorporateProperties,
  }: any = useGetCorporatePropertyListQuery(session?.user?.id) //session?.user?.id

  //session?.user?.id

  console.log('propertyList', propertyList)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleBulkUpload = () => {
    dispatch(
      showModal({
        open: true,
        children: <UploadBulkProperty />,
        name: 'Bulk Property Upload',
      })
    )
  }
  const handleAddProperty = () => {
    dispatch(
      showModal({
        name: 'Add A New Property',
        open: true,
        size: 'large',
        children: <AddSingleProperty refetchCorporateProperties={refetchCorporateProperties} />,
      })
    )
  }

  return (
    <>
      <Box sx={{ px: 3 }}>
        <Box
          sx={{
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2,
          }}>
          <Box>
            <Typography sx={{ color: '#505050', fontSize: '20px', fontWeight: '500' }}>Property List (455)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', pl: '10px' }}>
                <Image alt="" src={BulkUploadIcon} />
              </Box>
              <button
                onClick={handleBulkUpload}
                className="bg-[#D4E8FF] rounded-md text-lg text-[#034EA1] font-medium px-10 pr-6 py-3 cursor-pointer ml-2">
                Bulk Property Upload
              </button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', pl: '16px' }}>
                <Image alt="" src={PropertyAddIcon} />
              </Box>
              <button
                type="button"
                className="bg-[#00ADEE] rounded-md font-medium text-lg text-white pl-16 pr-10 py-3 cursor-pointer"
                onClick={handleAddProperty}>
                Add Property
              </button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Box>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Publish(155)" />
                <Tab label="Unpublish(20)" />
                <Tab label="Draft(90)" />
                <Tab label="Reserved(10)" />
                <Tab label="Rented Out(170)" />
                <Tab label="Pending(10)" />
              </Tabs>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #D1D1D1',
              borderRadius: 1,
              px: 1.5,
              py: 1,
              cursor: 'pointer',
            }}>
            <Box>
              <Image alt="" src={FilterCogIcon} />
            </Box>
            <button className="bg-transparent cursor-pointer">Filters</button>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              backgroundColor: '#F1F7FF',
              mt: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {['Assign Owner', 'Publish', 'Unpublish', 'Delete'].map((btnName, index) => (
                <button
                  key={btnName}
                  className="text-[#999999] bg-transparent text-base border border-[#D1D1D1] px-6 py-1 rounded-lg cursor-pointer">
                  {btnName}
                </button>
              ))}
            </Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
          <CustomTabPanel value={value} index={0}>
            {/* <AllPropertiesTable
                          rowsPerPage={rowsPerPage}
                          page={page}
                          setRowsPerPage={setRowsPerPage}
                          setPage={setPage}
                          rows={rows}
                      /> */}
            <PublishedPropertyTable propertyList={propertyList} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PublishedPropertyTable propertyList={propertyList} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <PublishedPropertyTable propertyList={propertyList} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <PublishedPropertyTable propertyList={propertyList} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <PublishedPropertyTable propertyList={propertyList} />
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  )
}

export default PropertyList
