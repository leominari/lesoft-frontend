import React from 'react'
import { Table } from 'antd'
import './styles/pedido.css'
import { orderAction } from '../../redux/actions';
import { getToken } from '../../utils/auth';
import { OrderStore } from '../../redux/store';
import api from '../../services/api';

import ModalPedido from './ModalOrder'


class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }


    componentDidMount() {

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

        this.unsubscribe = OrderStore.subscribe(() => {
            this.setState({
                orders: tableData(OrderStore.getState())
            })
        })

        async function getAllOrders() {
            const getUrl = '/order?token=' + getToken()
            const response = await api.get(getUrl)
            OrderStore.dispatch({
                type: orderAction.SET,
                orders: response.data
            })
        }

        getAllOrders();

    }

    render() {
        const columns = [
            {
                title: 'Código do Pedido',
                dataIndex: 'key',
                key: 'key',
                sorter: (a,b) => 1,
                defaultSortOrder: 'descend'
                // sortDirections: ['descend']

            },
            {
                title: 'Vendedor',
                dataIndex: 'idSalesman',

            },
            {
                title: 'Cliente',
                dataIndex: 'idClient',
            },
            {
                title: 'Preço',
                dataIndex: 'finalPrice',
            },
            {
                title: 'Data',
                dataIndex: 'date',
            },
        ];

        return (
            <div>
                <ModalPedido />
                <Table 
                    dataSource={this.state.orders} 
                    columns={columns} 
                    className="distancia-botao" 
                    sortDirections={['descend']}
                />
            </div>
        );
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

}

export default Order;
