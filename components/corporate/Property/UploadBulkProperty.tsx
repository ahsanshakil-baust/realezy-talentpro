import React from 'react'
import { hideModal, showModal } from '@/store'
import { useDispatch } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload'
import UploadCsvIcon from 'public/corporate-icon/uploadcsv.svg'
import { StoreThunkDispatch } from '@/types'
import Image from 'next/image'


function UploadBulkProperty() {
    const dispatch = useDispatch<StoreThunkDispatch>()

    const handleModalCancel = () => {
        dispatch(hideModal('Bulk Property Upload'))
    }
    return (
        <Box sx={{ px: 6, py: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box>
                        <PendingActionsIcon fontSize="large" />
                    </Box>
                    <Typography paragraph sx={{ m: 0 }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. {' '}
                    </Typography>
                </Box>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ position: 'absolute', ml: 1 }}>
                        <SimCardDownloadIcon style={{ color: '#034EA1' }} />
                    </Box>
                    <button className="rounded-lg pl-10 py-2 text-base pr-8 text-[#034EA1] cursor-pointer">Sample File</button>
                </Box>
            </Box>
            <Box
                sx={{
                    px: 3,
                    pt: 1,
                    pb: 2,
                    mt: 3,
                    backgroundColor: '#F8FBFF',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}>
                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: '#202020', fontWeight: 'bold', mb: 1 }} variant="subtitle1">
                        Upload Property file
                    </Typography>
                    <Box>
                        {/* <Image/>     */}
                        <Button
                            variant="text"
                            component="label"
                            sx={{
                                border: '1px dashed #00ADEE',
                                borderRadius: '10px',
                                backgroundColor: '#F1F7FF',
                                display: 'flex',
                                flexDirection: 'column',
                                py: 4,
                            }}>
                            <input accept=".jpeg,.jpg,.png,.pdf" hidden type="file" id="file" />

                            <Image src={UploadCsvIcon} alt="no-fall-back" width="71" height="71" />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Typography paragraph sx={{ color: '#505050', m: 0 }}>
                                    xlsx or csv
                                </Typography>
                                <Typography paragraph sx={{ color: '#A1A1A1', m: 0 }}>
                                    Upload your properties data file
                                </Typography>
                            </Box>
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ width: '2px', backgroundColor: '#D4E8FF', height: '180px', mt: '30px' }}></Box>
                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: '#202020', fontWeight: 'bold', mb: 1 }} variant="subtitle1">
                        Upload Property Images file
                    </Typography>
                    <Box>
                        {/* <Image/>     */}
                        <Button
                            variant="text"
                            component="label"
                            sx={{
                                border: '1px dashed #00ADEE',
                                borderRadius: '10px',
                                backgroundColor: '#F1F7FF',
                                display: 'flex',
                                flexDirection: 'column',
                                py: 4,
                            }}>
                            <input accept=".jpeg,.jpg,.png,.pdf" hidden type="file" id="file" />

                            <Image src={UploadCsvIcon} alt="no-fall-back" width="71" height="71" />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Typography paragraph sx={{ color: '#505050', m: 0 }}>
                                    Zip
                                </Typography>
                                <Typography paragraph sx={{ color: '#A1A1A1', m: 0 }}>
                                    Upload your properties images file
                                </Typography>
                            </Box>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 3, mt: 2, alignItems: 'center' }}>
                <button type="submit" className="text-white rounded-lg px-10 py-4 bg-[#00ADEE] cursor-pointer">
                    Submit
                </button>
                <button
                    onClick={handleModalCancel}
                    type="button"
                    className="text-[#FF3434] rounded-lg px-10 py-4 bg-transparent border border-[#FF3434] cursor-pointer">
                    Cancel
                </button>
            </Box>
        </Box>
    )
}

export default UploadBulkProperty