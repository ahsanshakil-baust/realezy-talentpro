import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AgreementDetails from '@/components/chatProgressForm/agreement_create/tenant/AgreementDetails';
import { useSelector } from 'react-redux';
import { useGetDetailsAgreementQuery } from '@/store';
import AgreementPanleDetails from './AgreementPanleDetails';





interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


export default function AgreementPanle({ currentAgreementId }: any) {
  const [value, setValue] = React.useState(0);
  const { data, isLoading } = useGetDetailsAgreementQuery(currentAgreementId)
  console.log("AgreementPanle ~ data:", data)


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabsColor = {
    fontSize: '18px',
    color: '#A1A1A1',
    fontWeight: '400',
    '&.Mui-selected': {
      color: '#034EA1',
    }
  }


  return (
    <Box sx={{ width: '100%' }}>
    {/*   <div>
        <button>Chat</button>
      </div> */}
      <Box sx={{ borderBottom: 0, borderColor: '#034EA1' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab disableRipple={true} sx={tabsColor} label="Agreement Summary" />
          <Tab disableRipple={true} sx={tabsColor} label="Agreement Full Details" />
          <Tab disableRipple={true} sx={tabsColor} label="Inventory List" />
          <Tab disableRipple={true} sx={tabsColor} label="Condition Report" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AgreementPanleDetails data={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <iframe src={data?.doc_url} width="100%" height="635px" />
      </CustomTabPanel>
     {/*  <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Four
      </CustomTabPanel> */}
    </Box>
  );
}