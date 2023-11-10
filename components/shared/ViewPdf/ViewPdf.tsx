import { Icon } from '@/components/shared'
import { Button, Drawer, IconButton } from '@mui/material'
import useDownloader from 'react-use-downloader'

interface ViewPdfProps {
  show: boolean
  handelClose: () => void
  name: string
  link: string
  fileName: string
}

const ViewPdf = ({ show, handelClose, name, link, fileName }: ViewPdfProps) => {
  // const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader()
  const { download } = useDownloader()

  return (
    <Drawer anchor="right" open={show} onClose={handelClose} className="view-invoice">
      <div className="view-invoice-header bg-userRole">
        <IconButton aria-label="close" color="light" className="!text-4xl !p-0 !mr-3" onClick={handelClose}>
          <Icon name="modalClose" />
        </IconButton>
        <p className="font-medium text-white text-2xl">{name}</p>

        <Button
          onClick={() => download(link, fileName)}
          variant="outlined"
          color="light"
          className="!ml-auto !text-base !py-2 !px-5">
          Download
        </Button>
      </div>
      <div className="view-invoice-body">
        {/* iframe */}
        <iframe src={link} width="100%" height="100%" />
      </div>
    </Drawer>
  )
}
export default ViewPdf
