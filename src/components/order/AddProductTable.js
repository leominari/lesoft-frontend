import React from 'react'
import { Button, Row } from 'antd'
import SelectProduct from '../product/SelectProduct'
import { OrderProductStore } from '../../redux/store'

import {
    PlusCircleOutlined
} from '@ant-design/icons'
import { orderProductAction } from '../../redux/actions'


class AddProductTable extends React.Component {

    constructor(props) {
        super(props)
        this.inputs = {}
        this.product = {}
    }



    render() {
        const addCart = () => {
            OrderProductStore.dispatch({
                type: orderProductAction.ADD,
                products: {
                    key: parseInt(this.product.productId),
                    name: this.product.productName,
                    price: parseFloat(this.product.price),
                    quantity: parseInt(this.product.quantity),
                    unity: this.product.productUnity
                }
            })
            this.inputs.quantity = ""
            this.inputs.price = ""
        }


        const addQuantity = (e) => {
            this.product.quantity = e.target.value
            this.inputs.quantity = e.target
        }

        const addPrice = (e) => {
            this.product.price = e.target.value
            this.inputs.price = e.target
        }

        return (
            <>

                <p>Adicionar Produto</p>
                <Row className="distancia-produto">
                    <SelectProduct form={this.product} name="produto" className="box-produto" />

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
        );
    }

}

export default AddProductTable;