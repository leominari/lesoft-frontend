import React from 'react'
import { Button, Typography } from 'antd'
import AddProductTable from './AddProductTable'
import {
    MinusSquareOutlined
} from '@ant-design/icons'
const { Text } = Typography

class ItensTable extends React.Component {
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


    render() {

        const deleteItem = (e) => {
            let pl = this.state.products.filter(element => element.key !== parseInt(e.target.value))
            this.setState({
                products: pl,
                order: orderRender(pl)
            })
        }

        const getTotal = () => {
            let temp = 0
            this.list.forEach(element => {
                temp += element.price * element.quantity
            });
            this.setState({
                total: temp
            })
        }

        const orderRender = (data) => {
            const temp = []
            this.list = data
            data.forEach(element => {
                temp.push(
                    <tr key={element.key} className="ant-table-row ant-table-row-level-0">
                        <td className="ant-table-cell">{element.name}</td>
                        <td className="ant-table-cell">R$ {Number(element.price).toFixed(2)}</td>
                        <td className="ant-table-cell">{element.quantity}</td>
                        <td className="ant-table-cell">R$ {Number(element.quantity * element.price).toFixed(2)}</td>
                        <td><Button size="small" value={element.key} type="link" danger icon={<MinusSquareOutlined />} onClick={deleteItem}>Deletar</Button></td>
                    </tr>

                )
            });
            getTotal()
            this.props.form.products = data
            return temp
        }

        const setProductList = (pl) => {
            this.setState({
                products: pl,
                order: orderRender(pl)
            })
        }

        return (
            <>

                <AddProductTable className="addProductBar" data={this.data} setProductList={setProductList} productList={this.state.products} />
                <table className="table-auto">
                    <colgroup>
                        <col className="col-auto"></col>
                    </colgroup>
                    <thead className="ant-table-thead">
                        <tr>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Total</th>
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

export default ItensTable;