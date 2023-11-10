import { CorporateLayout } from '@/components'
import React, { ReactElement } from 'react'
import headerIcon from 'public/corporate-icon/message.svg'
import Messages from '@/components/corporate/Message/Messages'
const headerTitle = 'Message'

function Message() {
    return (
        <div>
            <Messages />
        </div>
    )
}

Message.getLayout = (page: ReactElement) => (<CorporateLayout headerIcon={headerIcon} headerTitle={headerTitle} >{page}</CorporateLayout>)

export default Message