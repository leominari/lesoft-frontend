import React, { useState } from 'react'
import { Button, Typography } from 'antd'
import { OrderProductStore } from '../../redux/store'
import SelectProduct from './SelectProduct'
import {
    MinusSquareOutlined
} from '@ant-design/icons'
import { orderProductAction } from '../../redux/actions'

export default function ItensTable(params) {
    const { Text } = Typography
    const [order, setOrder] = useState([])
    const product = {}
    const [total, setTotal] = useState(0)
    var list = []

    function deleteItem(e) {
        OrderProductStore.dispatch({
            type: orderProductAction.REMOVE,
            product: e.target.value
        })
    }

    function getTotal() {
        let temp = 0
        list.forEach(element => {
            temp += element.price * element.quantity
        });
        setTotal(temp)
    }


    function orderRender(data) {
        const temp = []
        list = data
        data.forEach(element => {
            temp.push(
                <tr key={element.key} className="ant-table-row ant-table-row-level-0">
                    <td className="ant-table-cell">{element.name}</td>
                    <td className="ant-table-cell">R$ {Number(element.price).toFixed(2)}</td>
                    <td className="ant-table-cell">{element.quantity}</td>
                    <td><Button size="small" value={element.key} type="link" danger icon={<MinusSquareOutlined />} onClick={deleteItem}>Deletar</Button></td>
                </tr>

            )
        });
        getTotal()
        params.form.products = data
        return temp
    }


    React.useEffect(() => {
        OrderProductStore.subscribe(() => {
            setOrder(orderRender(OrderProductStore.getState()))
        })
    }, [])


    return (
        <>

            <SelectProduct product={product} />
            <table className="table-auto">
                <colgroup>
                    <col className="col-auto"></col>
                </colgroup>
                <thead className="ant-table-thead">
                    <tr>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody className="ant-table-tbody" >
                    {order}
                    <tr className="ant-table-row ant-table-row-level-0">
                        <td className="ant-table-cell">
                            <Text type="danger">Total</Text>
                        </td >
                        <td>
                            <Text>R$ {Number(total).toFixed(2)}</Text>
                        </td>
                    </tr>
                </tbody>

            </table>
        </>
    )
}



