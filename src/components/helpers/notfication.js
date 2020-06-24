import React from 'react'
import { notification } from 'antd';

function notifSuccess(msg, body){
    notification.success({
        message: msg,
        description: body,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    })
}

function notifError(msg, body){
    notification.error({
        message: msg,
        description: body,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    })
}


export { notifSuccess }
export { notifError }
