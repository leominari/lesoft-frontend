import React from 'react'
import { Button, Modal, Form } from 'antd'
import { notifSuccess, notifError } from '../../helpers/notfication'
import { getToken } from '../../../utils/auth';
import { orderAction, BillAction } from '../../../redux/actions';
import { OrderStore, BillStore } from '../../../redux/store';
import api from '../../../services/api';

import SelectColaborator from '../../colaborator/SelectColaborator'
import dColaborator from '../../data/dColaborator'
import dProduct from '../../data/dProduct';
import ItensTable from './ItensTable'
import BillOrder from './BillOrder'

const Product = new dProduct()
const Colaborator = new dColaborator()

class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.order = {}
        this.billOrder = {}
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

        const newBillOrder = async () => {
            const obj = {
                date: this.billorder.date,
                description: "Recebimento de Pedido",
                value: this.billorder.value,
                type: "receive",
                idAccount: this.billorder.idAccount,
                token: getToken()
            }

            const response = await api.post('/bill', obj)
            if (response.status === 200) {
                BillStore.dispatch({
                    type: BillAction.SET,
                    bills: response.data
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
                status: "opened",
                token: getToken()
            }
            if(this.billOrder.date && this.billOrder.idAccount){
                this.billOrder.value = calcTotal()
                newBillOrder()
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
            this.billOrder = {}
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
                    destroyOnClose={true}
                    width={580}
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
                            <BillOrder order={this.billOrder} />
                        </Form.Item>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8 }}>
                            <Button className="distancia-direita10" type="primary" onClick={showModal} >
                                Cancelar
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Cadastrar
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}


export default CreateOrder;





