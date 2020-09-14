import React from 'react';
import { Table, Tag } from 'antd';
import './styles/pedido.css';
import { orderAction } from '../../../redux/actions';
import { getToken } from '../../../utils/auth';
import { OrderStore } from '../../../redux/store';
import api from '../../../services/api';

import CreateOrder from './crud/CreateOrder';
import EditModal from './modal/EditModal';


class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }


    async getAllOrders() {
        const getUrl = '/order?token=' + getToken()
        const response = await api.get(getUrl)
        OrderStore.dispatch({
            type: orderAction.SET,
            orders: response.data
        })
    }


    tableData(data) {
        const temp = []
        data.forEach(element => {
            let date = new Date(element.createDate)
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let status
            switch (element.status) {
                case "closed":
                    status = <Tag color="#108ee9">FECHADO</Tag>
                    break;
                case "received":
                    status = <Tag color="#87d068">RECEBIDO</Tag>
                    break;
                case "opened":
                    status = <Tag color="#f50">EM ABERTO</Tag>
                    break;
                default:
                    status = <Tag color="#fff">NENHUM</Tag>
                    break;
            }
            temp.push({
                key: element.id,
                status: status,
                idClient: element.Client,
                idSalesman: element.Salesman,
                finalPrice: 'R$ ' + Number(element.price).toFixed(2),
                date: day + '/' + month + '/' + year,
                actions: <EditModal order={element} />
            })
        });
        return temp
    }



    componentDidMount() {

        this.unsubscribe = OrderStore.subscribe(() => {
            this.setState({
                orders: this.tableData(OrderStore.getState())
            })
        })

        this.getAllOrders();

    }

    render() {
        const columns = [
            {
                title: 'Código do Pedido',
                dataIndex: 'key',
                key: 'key',
                sorter: (a, b) => 1,
                defaultSortOrder: 'descend'
            },
            {
                title: 'Status',
                dataIndex: 'status',
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
            {
                title: 'Ações',
                dataIndex: 'actions',
            },
        ];
        return (
            <div>
                <CreateOrder />
                <Table
                    dataSource={this.state.orders}
                    columns={columns}
                    className="distancia-botao"
                    sortDirections={['descend']}
                />
            </div>
        );
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

}

export default Order;
