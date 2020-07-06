import React from 'react'
import { Button, Row, InputNumber } from 'antd'
import SelectProduct from '../../product/SelectProduct'

import {
    PlusCircleOutlined
} from '@ant-design/icons'


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
            const pl = this.props.productList
            pl.push({
                key: this.props.data.idProduct,
                name: this.props.data.productName,
                price: this.props.data.price,
                quantity: this.props.data.quantity
            })
            this.props.setProductList(pl)
            this.setState({
                quantity: '',
                price: ''
            })
        }


        const addQuantity = (value) => {
            if (value) {
                this.props.data.quantity = value
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
                this.props.data.price = value
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
                    <SelectProduct form={this.product} data={this.props.data} name="produto" className="box-produto" />
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