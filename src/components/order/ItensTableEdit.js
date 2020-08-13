import React from 'react'
import { Button, Typography } from 'antd'
import AddProductTable from './crud/AddProductTable'
import {
    MinusSquareOutlined
} from '@ant-design/icons'
import api from '../../services/api'
import { getToken } from '../../utils/auth'
const { Text } = Typography


class ItensTableEdit extends React.Component {
    constructor(props) {
        super(props)
        this.list = []
        this.state = {
            order: [],
            total: 0,
            products: []
        }
        this.data = {}
    }

    deleteItem = (e) => {
        let productList = this.state.products.filter(element => element.key !== parseInt(e.target.value))
        this.setState({
            products: productList,
            order: this.orderRender(productList)
        })
    }



    getTotal = () => {
        let total = 0
        this.list.forEach(product => {
            total += product.price * product.quantity
        });
        this.setState({
            total: total
        })
    }


    orderRender = (productList) => {
        const temp = []
        this.list = productList
        productList.forEach(product => {
            temp.push(
                <tr key={product.key} className="ant-table-row ant-table-row-level-0">
                    <td className="ant-table-cell">{product.name}</td>
                    <td className="ant-table-cell">R$ {Number(product.price).toFixed(2)}</td>
                    <td className="ant-table-cell">{product.quantity}</td>
                    <td><Button size="small" value={product.key} type="link" danger icon={<MinusSquareOutlined />} onClick={this.deleteItem}>Deletar</Button></td>
                </tr>

            )
        });
        this.getTotal()
        this.props.form.products = productList
        return temp
    }



    componentDidMount() {
        const getProducts = async () => {
            await api.get('/orderproduct/' + this.props.orderid + '?token=' + getToken()).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        products: response.data,
                        order: this.orderRender(response.data)
                    })
                } else {
                }

            })
        }
        getProducts()

    }


    render() {

        const setProductList = (productList) => {
            this.setState({
                products: productList,
                order: this.orderRender(productList)
            })
        }

        return (
            <>

                <AddProductTable data={this.data} setProductList={setProductList} productList={this.state.products} />
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
                        {this.state.order}
                        <tr className="ant-table-row ant-table-row-level-0">
                            <td className="ant-table-cell">
                                <Text type="danger">Total</Text>
                            </td >
                            <td>
                                <Text>R$ {Number(this.state.total).toFixed(2)}</Text>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </>
        )


    }
}

export default ItensTableEdit;