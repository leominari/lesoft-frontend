import React, { useState } from 'react'
import { Button, Row } from 'antd'
import { ProductSelect } from './Select'
import { OrderProductStore } from '../../redux/store'

import {
    PlusCircleOutlined
} from '@ant-design/icons'
import { orderProductAction } from '../../redux/actions'


export default function ItensTable(data) {
    const [inputs, setInputs] = useState({})

    function addCart() {
        OrderProductStore.dispatch({
            type: orderProductAction.ADD,
            products: {
                key: parseInt(data.product.productId),
                name: data.product.productName,
                price: parseFloat(data.product.price),
                quantity: parseInt(data.product.quantity),
                unity: data.product.productUnity
            }
        })

        clear()
    }



    function addQuantity(e) {
        data.product.quantity = e.target.value
        setInputs({
            ...inputs,
            quantity: e.target
        })
    }

    function addPrice(e) {
        data.product.price = e.target.value
        setInputs({
            ...inputs,
            price: e.target
        })
    }

    function clear() {
        inputs.quantity.value = ""
        inputs.price.value = ""
    }


    return (
        <>

            <p>Adicionar Produto</p>
            <Row className="distancia-produto">
                <ProductSelect form={data.product} name="produto" className="box-produto" />

                <div className="box-quantidade">
                    <span className="ant-input-affix-wrapper">
                        <span className="ant-input-prefix">R$</span>
                        <input onChange={addPrice} placeholder="0,00" type="text" className="ant-input" />
                    </span>
                </div>

                <div className="box-preco">
                    <input
                        className="ant-input"
                        onChange={addQuantity}
                        placeholder="Quantidade"
                    />
                </div>

                <Button onClick={addCart} icon={<PlusCircleOutlined />}></Button>

            </Row>


        </>
    )
}