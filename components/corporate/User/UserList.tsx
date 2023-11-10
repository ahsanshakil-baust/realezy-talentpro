import PlusButtonIcon from '@/components/shared/Svg/PlusButtonIcon'
import { Box, Button, Tab } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import store, { hideLoader, hideModal, showLoader, showModal, useGetCorporateUserListQuery } from '@/store'
import { StoreThunkDispatch } from '@/types'
import UserCreate from './UserCreate'
import { Tabs } from '@mui/material'
import AccountTable from './AccountTable'
import AccountTypeTable from './AccountTypeTable'
import AddAccountIcon from 'public/corporate-icon/addAccount.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'


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
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function UserList() {
    const [value, setValue] = React.useState(0);
    const { data: session }: any = useSession()
    const { data: userList, isLoading: userLoading,refetch: refetchUserList }: any = useGetCorporateUserListQuery(session?.user?.id) 

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleAddUser = () => {
        store.dispatch(
            showModal({
                open: true,
                name: 'Add Sub-Account',
                children: (<UserCreate refetchUserList={refetchUserList} />),
                className: '',
            })
        )
    }

    return (
        <>
            <div className="flex pt-8 px-5 ">
                {/* Left Div */}
                <div className="flex-1">
                    <p className="text-xl text-left text-[#505050] font-medium mb-3">Manage Sub-Accounts</p>
                    <p className='text-[#999999] text-base font-normal'>You have added 5 default sub accounts.</p>
                </div>

                {/* Right Div */}
                <div className=''>
                    <button
                        onClick={handleAddUser}
                        className='flex items-center justify-center px-8 py-4 rounded-lg gap-3 text-base bg-[#00ADEE] text-white cursor-pointer'
                    >
                        <Image src={AddAccountIcon}/>
                        Add Sub-account
                    </button>
                </div>
            </div>
            <div>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{
                        pl:4,
                        '& .Mui-selected':{
                            color:'#00ADEE'
                        },
                        '& .MuiTabs-indicator':{
                            backgroundColor:'#00ADEE'
                        }
                    }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Account" {...a11yProps(0)} />
                            <Tab label="Account Type" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <AccountTable userList={userList} userLoading={userLoading} refetchUserList={refetchUserList} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <AccountTypeTable />
                    </CustomTabPanel>
                </Box>
            </div>
        </>
    )
}

export default UserList