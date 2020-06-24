import React, { useState } from 'react'
import { DatePicker, Row, Button, Switch } from 'antd'
import SelectAccount from '../account/SelectAccount'
import './styles/pedido.css'

export default function Bill2Order(params){
    const dateFormat = 'DD/MM/YYYY'
    const data = params.order

    function handleDataPicked(value){
        const date = value.year() + "-" + ("00" + (value.month() + 1)).slice(-2) + "-" + value.date()
        data.date = date
    }

    return <>
        <Row>
            <DatePicker
                size="small"
                format={dateFormat}
                onSelect={handleDataPicked}
                className="distancia-direita10"
            />
            <SelectAccount data={data}/>
        </Row>
    </>
}
