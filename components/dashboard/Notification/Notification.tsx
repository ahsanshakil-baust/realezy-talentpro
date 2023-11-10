import { ViewPdf } from '@/components/shared'
import config from '@/config'
import { showModal,
  useGetUserNotificationsQuery,
  useDeleteUserNotificationMutation ,
  useUpdateUserNotificationMutation} from '@/store'


import { StoreThunkDispatch } from '@/types'
import { Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


interface NotificationProps {
  userId: string
}

interface ActionButtonsProps {
  data: any
  userId: string
}

const ActionButtons = ({ data, userId }: ActionButtonsProps) => {

   console.log("datttt"+JSON.stringify(data))
  const {refetch} = useGetUserNotificationsQuery(
    { userId: userId ?? 0, pageNumber: 1 },
    { skip: !userId }
  );

  const [deleteMutation] = useDeleteUserNotificationMutation();
  const handleDelete = async () => {
    try {
        await deleteMutation({ notification_id: data.id });
        refetch();
    } catch (error) {
       //error
    }
  }

  const [updateUserNotification] = useUpdateUserNotificationMutation();
  const handleUpdateRead = async () => {

    console.log("noti_id"+data.id)
    try {
      await updateUserNotification({ notification_id: data.id });
        refetch();
    } catch (error) {
      //error
    }
  }

  return (
    <div className="flex gap-2">
       {data.status === 'Not Read' ? (
        <Button  className="bg-blue-500 text-white hover:bg-blue-800" onClick={handleUpdateRead}>
          Read
        </Button>
          ) : (


            <Button  className="bg-gray-500 text-white hover:bg-blue-800 opacity-50" >
            Read
          </Button>
          )
          }

      <Button variant="contained"  onClick={handleDelete}>
        Delete
      </Button >
    </div>
  )
}

const Notification = ({ userId }: NotificationProps) => {
  const {
    data: notificationData,
    isLoading: notificationLoading,
    refetch
  } = useGetUserNotificationsQuery( { userId: userId ?? 0, pageNumber: 1 },
    { skip: !userId });



  if (!userId) return null

  const rearrangedNotificationData = notificationData?.map((notificationInfo: { id: any; msg: any; created: any; is_read: any }) => ({
    id: notificationInfo.id,
    purpose_details: notificationInfo.msg,
    created: notificationInfo.created,
    status: notificationInfo.is_read == 1 ? 'Read' : 'Not Read',
  }));

  const columns: GridColDef[] = [
    { field: 'purpose_details', headerName: 'Purpose' , width: 400},
    { field: 'created', headerName: 'Date' , width: 300},
    { field: 'status', headerName: 'Status' , width: 200},
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: ({ row }) => <ActionButtons data={row} userId={userId} />,
    },
  ]
  return (
    <div className="bg-detailsCard py-8 px-12 rounded-3xl min-h-[70vh] flex flex-col">
      <h1 className="content-header mb-7">
        {notificationData ? `All Notification (${notificationData.length})` : 'All Notification'}
      </h1>

      <DataGrid
        rows={rearrangedNotificationData || []}
        columns={columns}
        loading={notificationLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        localeText={{
          noRowsLabel: notificationLoading ? 'Loading...' : 'No Notification Found',
        }}
        className="!flex-grow-1 content-title"
      />
    </div>
  )
}
export default Notification
