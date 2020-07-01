import React from 'react'
import { Button, Modal, Form } from 'antd'
import { notifSuccess, notifError } from '../helpers/notfication'
import { getToken } from '../../utils/auth';
import { orderAction, Bill2Action } from '../../redux/actions';
import { OrderStore, Bill2Store } from '../../redux/store';
import api from '../../services/api';

import SelectColaborator from '../colaborator/SelectColaborator'
import dColaborator from '../data/dColaborator'
import dProduct from '../data/dProduct';
import ItensTable from './ItensTable'
import Bill2Order from './Bill2Order'

const Product = new dProduct()
const Colaborator = new dColaborator()

class ModalOrder extends React.Component {
    constructor(props) {
        super(props);
        this.order = {}
        this.bill2order = {}
        this.state = {
            ModalVisible: false
        }
    }

    componentDidMount() {
        Colaborator.getAllColaborators()
        Product.getAllProducts()
    }

    render() {

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 26 },
        };


        const calcTotal = () => {
            const data = this.order.products
            var total = 0
            data.forEach(element => {
                total += element.price * element.quantity
            });
            return total
        }


        const showModal = () => this.setState({
            ModalVisible: !this.state.ModalVisible
        });

        const newBill2Order = async () => {
            const obj = {
                date: this.bill2order.date,
                description: "Recebimento de Pedido",
                value: this.bill2order.value,
                type: "receive",
                idAccount: this.bill2order.idAccount,
                token: getToken()
            }

            const response = await api.post('/bill2', obj)
            if (response.status === 200) {
                Bill2Store.dispatch({
                    type: Bill2Action.SET,
                    bill2s: response.data
                })
                notifSuccess('Conta a receber gerada.', '')
                return true
            } else {
                notifError('Erro ao cadastrar conta a receber.', 'Entre em contato com a administração do sistema')
                return false
            }

        }



        const newOrder = async () => {
            const obj = {
                idClient: this.order.idClient,
                idSalesman: this.order.idSalesman,
                products: this.order.products,
                token: getToken()
            }
            if(this.bill2order.date && this.bill2order.idAccount){
                this.bill2order.value = calcTotal()
                newBill2Order()
            }

            await api.post('/order', obj).then(async function (response) {
                if (response.status === 200) {
                    if (response.data) {
                        await api.get('/order?token=' + getToken()).then(function (response) {
                            if (response.status === 200){
                                OrderStore.dispatch({
                                    type: orderAction.SET,
                                    orders: response.data
                                })
                            }
                        })
                    }
                    notifSuccess('Pedido Cadastrado.', '')
                } else {
                    notifError('Erro ao gerar conta a receber.', 'Entre em contato com a administração do sistema.')
                }
            }).catch(function (error) {
                console.log(error)
            })

            this.setState({
                ModalVisible: false
            })
            this.order = {}
            this.bill2order = {}
        }

        return (
            <div>
                <Button onClick={showModal}>
                    Novo Pedido
                    </Button>
                <Modal
                    title="Novo Pedido"
                    visible={this.state.ModalVisible}
                    footer={false}
                    onCancel={showModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={newOrder}>

                        <Form.Item label="Vendedor">
                            <SelectColaborator type="salesman" form={this.order} />
                        </Form.Item>
                        <Form.Item label="Cliente">
                            <SelectColaborator type="client" form={this.order} />
                        </Form.Item>
                        <Form.Item>
                            <ItensTable form={this.order} />
                        </Form.Item>
                        <Form.Item label="Conta a Receber">
                            <Bill2Order order={this.bill2order} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button className="distancia-direita10" type="primary" onClick={showModal} >
                                Cancelar
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Cadastrar
                            </Button>
                            {/* <Button onClick={()=>{console.log(this.order)}}>ver</Button> */}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}


export default ModalOrder;





