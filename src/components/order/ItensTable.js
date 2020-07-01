import React from 'react'
import { Button, Typography } from 'antd'
import { OrderProductStore } from '../../redux/store'
import SelectProduct from './AddProductTable'
import {
    MinusSquareOutlined
} from '@ant-design/icons'
import { orderProductAction } from '../../redux/actions'
const { Text } = Typography


class ItensTable extends React.Component {
    constructor(props) {
        super(props)
        this.list = []
        this.state = {
            order: [],
            total: 0
        }
    }

    componentDidMount() {

        const deleteItem = (e) => {
            OrderProductStore.dispatch({
                type: orderProductAction.REMOVE,
                product: e.target.value
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
                        <td><Button size="small" value={element.key} type="link" danger icon={<MinusSquareOutlined />} onClick={deleteItem}>Deletar</Button></td>
                    </tr>

                )
            });
            getTotal()
            this.props.form.products = data
            return temp
        }


        this.unsubscribe = OrderProductStore.subscribe(() => {
            this.setState({
                order: orderRender(OrderProductStore.getState())
            })
        });
    }


    render() {

        return (
            <>

                <SelectProduct />
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
    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default ItensTable;