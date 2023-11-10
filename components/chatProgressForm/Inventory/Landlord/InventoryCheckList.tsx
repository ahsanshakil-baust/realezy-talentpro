// import { useInventoryDetailsQuery } from '@/store'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const InventoryCheckList = ({ data }: any) => {
  const [marks, setRemark] = useState(true)
  const {
    register,
    // handleSubmit,
    // watch,
    // formState: { isValid, isDirty, errors },
  } = useForm()
  // const { progress: payload } = useSelector((state: any) => state.entities.userProgress)

  /* const { data: inventoryDetails, isLoading: inventoryLoading } = useInventoryDetailsQuery(
    payload.threadInfo?.property_id
  ) */
  const handleCommentCounter = (counterRemarks: any) => {

    return false
    // if (counterRemarks == 'living area') {
    //   setRemark(true)
    // } else if (counterRemarks == 'master_bedroom') {
    //   setRemark(true)
    // }
  }
  return (
    <>
      <div>
        <h5 className="font-semibold">Property Address</h5>
        <Paper className="!my-3">
          <TextField
            defaultValue={'property_address'}
            {...register('inventory_description')}
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            size="small"
          />
        </Paper>
      </div>

      <div>
        {!(
          data?.inventoryList?.attached_bathroom[0].description ===
            data?.inventoryList?.attached_bathroom[0].quantity &&
          data?.inventoryList?.attached_bathroom[0].quantity === data?.inventoryList?.attached_bathroom[0].remarks &&
          data?.inventoryList?.attached_bathroom[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">
              {data?.inventoryList?.attached_bathroom.length > 0 ? 'Attached Bathroom' : null}
            </h5>
            {data?.inventoryList?.attached_bathroom?.map(
              (item: any) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Qty" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}

        {!(
          data?.inventoryList?.bedroom2[0].description === data?.inventoryList?.bedroom2[0].quantity &&
          data?.inventoryList?.bedroom2[0].quantity === data?.inventoryList?.bedroom2[0].remarks &&
          data?.inventoryList?.bedroom2[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">{data?.inventoryList?.bedroom2.length > 0 ? 'bedroom two' : null}</h5>
            {data?.inventoryList?.bedroom2?.map(
              (item: any) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}

        {!(
          data?.inventoryList?.bedroom3[0].description === data?.inventoryList?.bedroom3[0].quantity &&
          data?.inventoryList?.bedroom3[0].quantity === data?.inventoryList?.bedroom3[0].remarks &&
          data?.inventoryList?.bedroom3[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">{data?.inventoryList?.bedroom2.length > 0 ? 'bedroom Three' : null}</h5>
            {data?.inventoryList?.bedroom3?.map(
              (item: any) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Qty" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}

        {!(
          data?.inventoryList?.common_toilet[0].description === data?.inventoryList?.common_toilet[0].quantity &&
          data?.inventoryList?.common_toilet[0].quantity === data?.inventoryList?.common_toilet[0].remarks &&
          data?.inventoryList?.common_toilet[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">{data?.inventoryList?.bedroom2.length > 0 ? 'common_toilet' : null}</h5>
            {data?.inventoryList?.common_toilet?.map(
              (item: any) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Qty" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}

        {!(
          data?.inventoryList?.dining_area[0].description === data?.inventoryList?.dining_area[0].quantity &&
          data?.inventoryList?.dining_area[0].quantity === data?.inventoryList?.dining_area[0].remarks &&
          data?.inventoryList?.dining_area[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">{data?.inventoryList?.bedroom2.length > 0 ? 'Dining area' : null}</h5>
            {data?.data?.inventoryList?.dining_area?.map(
              (item: any, _: number) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Qty" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}

        {!(
          data?.inventoryList?.keys[0].description === data?.inventoryList?.keys[0].quantity &&
          data?.inventoryList?.keys[0].quantity === data?.inventoryList?.keys[0].remarks &&
          data?.inventoryList?.keys[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">{data?.inventoryList?.bedroom2.length > 0 ? 'keys' : null}</h5>
            {data?.data?.inventoryList?.keys?.map(
              (item: any) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Qty" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}
        {!(
          data?.inventoryList?.kitchen[0].description === data?.inventoryList?.kitchen[0].quantity &&
          data?.inventoryList?.kitchen[0].quantity === data?.inventoryList?.kitchen[0].remarks &&
          data?.inventoryList?.kitchen[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">{data?.inventoryList?.bedroom2.length > 0 ? 'kitchen' : null}</h5>
            {data?.inventoryList?.kitchen?.map(
              (item: any) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Qty" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}
        {!(
          data?.inventoryList?.living_area[0].description === data?.inventoryList?.living_area[0].quantity &&
          data?.inventoryList?.living_area[0].quantity === data?.inventoryList?.living_area[0].remarks &&
          data?.inventoryList?.living_area[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">{data?.inventoryList?.living_area.length > 0 ? 'living area' : null}</h5>
            {data?.inventoryList?.living_area?.map(
              (item: any, index: any) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Qty" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <button
                              onClick={() => handleCommentCounter(index)}
                              className="bg-primary px-5 py-2 rounded-md text-white cursor-pointer">
                              comment
                            </button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {marks && (
                              <>
                                <textarea rows={3} cols={50}></textarea>
                                <input type="file" name="" id="" />
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}

        {!(
          data?.inventoryList?.master_bedroom[0].description === data?.inventoryList?.master_bedroom[0].quantity &&
          data?.inventoryList?.master_bedroom[0].quantity === data?.inventoryList?.master_bedroom[0].remarks &&
          data?.inventoryList?.master_bedroom[0].remarks === ''
        ) && (
          <div className="mb-3">
            <h5 className="occupier-title">{data?.inventoryList?.bedroom2.length > 0 ? 'master_bedroom' : null}</h5>
            {data?.inventoryList?.master_bedroom?.map(
              (item: any) =>
                !(item.description === item.quantity && item.quantity === item.remarks && item.remarks === '') && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell data-label="Description" component="th" scope="row">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.description}
                              type="text"
                              name="living_name"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Qty" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.quantity}
                              type="number"
                              name="living_qty"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <input
                              className="w-100 p-1 rounded border"
                              defaultValue={item.remarks}
                              type="text"
                              name="living_text"
                              id=""
                            />
                          </TableCell>
                          <TableCell data-label="Remarks" align="right">
                            <button
                              onClick={() => handleCommentCounter('lmaster_bedroom')}
                              className="bg-primary px-5 py-2 rounded-md text-white cursor-pointer">
                              comment
                            </button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {marks && (
                              <>
                                <textarea rows={3} cols={50}></textarea>
                                <input type="file" name="" id="" />
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default InventoryCheckList
