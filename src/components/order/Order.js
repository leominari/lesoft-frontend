import React, { useState } from 'react'
import { Table, Button } from 'antd'
import ModalPedido from './ModalOrder'
import { OrderStore } from '../../redux/store';
import './styles/pedido.css'
import { getToken } from '../../utils/auth';
import Axios from 'axios';
import { orderAction } from '../../redux/actions';

export default function Order() {
    const [orders, setOrders] = useState([])


    const columns = [
        {
            title: 'Código do Pedido',
            dataIndex: 'key',
            key: 'key'

        },
        {
            title: 'Vendedor',
            dataIndex: 'idSalesman',
            key: 'idSalesman'

        },
        {
            title: 'Cliente',
            dataIndex: 'idClient',
            key: 'idClient'
        },
        {
            title: 'Preço',
            dataIndex: 'finalPrice',
            key: 'finalPrice'
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date'
        },
    ];



    React.useEffect(() => {
        OrderStore.subscribe(() => {
            setOrders(tableData(OrderStore.getState()))
        })
        getAllOrders()

    }, [])

    async function getAllOrders() {
        const getUrl = '/api/order/getall' + getToken()
        const response = await Axios.get(getUrl)
        OrderStore.dispatch({
            type: orderAction.SET,
            orders: response.data
        })
    }


    function tableData(data) {
        const temp = []
        data.forEach(element => {
            let date = new Date(element.createDate)
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            temp.push({
                key: element.id,
                idClient: element.Client,
                idSalesman: element.Salesman,
                finalPrice: 'R$ ' + Number(element.price).toFixed(2),
                date: day + '/' + month + '/' + year
            })
        });
        return temp
    }


    return (
        <div>
            <ModalPedido />
            <Table dataSource={orders} columns={columns} className="distancia-botao" />
        </div>
    );

}

