import React from 'react'
import { Button, Row, InputNumber } from 'antd'
import SelectProduct from '../../product/SelectProduct'
import { OrderProductStore } from '../../../redux/store'

import {
    PlusCircleOutlined
} from '@ant-design/icons'
import { orderProductAction } from '../../../redux/actions'


class AddProductTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quantity: '',
            price: ''
        }
        this.inputs = {}
        this.product = {}
    }



    render() {
        const addCart = () => {
            OrderProductStore.dispatch({
                type: orderProductAction.ADD,
                products: {
                    key: this.product.productId,
                    name: this.product.productName,
                    price: this.state.price,
                    quantity: this.state.quantity,
                    unity: this.product.productUnity
                }
            })
            this.setState({
                quantity: '',
                price: ''
            })
        }


        const addQuantity = (value) => {
            if (value) {
                this.setState({
                    quantity: value
                })
            } else {
                this.setState({
                    quantity: ''
                })
            }


        }

        const addPrice = (value) => {
            if (value) {
                this.setState({
                    price: value
                })
            } else {
                this.setState({
                    price: ''
                })
            }

        }

        return (
            <>

                <p>Adicionar Produto</p>
                <Row className="distancia-produto">
                    <SelectProduct form={this.product} name="produto" className="box-produto" />
                    <div className="box-preco">
                        <InputNumber
                            placeholder="0,00"
                            value={this.state.price}
                            parser={value => value.replace(/\s?|(,*)/g, '')}
                            decimalSeparator=","
                            onChange={addPrice}
                            addonBefore="R$"
                            />
                            </div>

                    <div className="box-quantidade">
                        <InputNumber
                            value={this.state.quantity}
                            placeholder="Quantidade"
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            decimalSeparator=","
                            onChange={addQuantity}

                        />
                    </div>

                    <Button onClick={addCart} icon={<PlusCircleOutlined />}></Button>

                </Row>


            </>
        );
    }

}

export default AddProductTable;