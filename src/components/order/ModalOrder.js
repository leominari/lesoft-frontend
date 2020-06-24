import React, { useState } from 'react'
import Axios from 'axios';
import { Button, Modal, Form, notification, Switch, DatePicker, Row, Checkbox } from 'antd'
import { getToken } from '../../utils/auth';
import { orderAction, Bill2Action } from '../../redux/actions';
import { OrderStore, Bill2Store } from '../../redux/store';
import { ColaboratorSelect } from './Select'
import dColaborator from '../data/dColaborator'
import dProduct from '../data/dProduct';
import TabelaItens from './ItensTable'
import Bill2Order from './Bill2Order'
import { notifSuccess, notifError } from '../helpers/notfication'
import { forEach } from 'lodash';

export default function ModalOrder() {
    const Product =  new dProduct()
    const Colaborator =  new dColaborator()
    const [ModalVisible, isVisible] = useState(false)
    const [b2o, isB2o] = useState(true)
    const showModal = () => isVisible(true);
    var b2oData = {}
    var order = {}
    var createdOrder
    // const order = {
    // }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 26 },
    };


    const validateMessages = {
        required: '${label} é necessário!'
    };


    React.useEffect(() => {
        Colaborator.getAllColaborators()
        Product.getAllProducts()
    }, [])


    function calcTotal(){
        const data = order.products
        var total = 0
        data.forEach(element => {
            total += element.price * element.quantity
        });
        return total
    }

    const newOrder = async function () {
        const obj = {
            idClient: order.idClient,
            idSalesman: order.idSalesman,
            products: JSON.stringify(order.products),
            token: getToken()
        }
        b2oData.value = calcTotal()
        await Axios.post('/api/order/new', obj).then(function (response) {
            if (response.data.status_code === 200) {
                OrderStore.dispatch({
                    type: orderAction.SET,
                    orders: response.data.all_orders
                })
                createdOrder = response.data.new_order
                if(b2oData.date && b2oData.idAccount){
                    newBill2Order()
                }else{
                    console.log('nao salve')
                }
                notifSuccess('Pedido Cadastrado.', '')
                isB2o(false)
            } else {
                notifError('Erro ao gerar conta a receber.', 'Entre em contato com a administração do sistema.')
            }
        }).catch(function (error) {
            // your action on error success
        })

    }

    const closeModal = e => {
        isVisible(false)
    };

    async function newBill2Order(){
        const obj = {
            date: b2oData.date,
            description: "Recebimento do Pedido número ",
            value: b2oData.value,
            type: "receive",
            idAccount: b2oData.idAccount,
            token: getToken()
        }
        console.log(obj)


        const response = await Axios.post('/api/bill2', obj)
        if (response.data.status_code === 200) {
            Bill2Store.dispatch({
                type: Bill2Action.SET,
                bill2s: response.data.all_bill2
            })
            notifSuccess('Conta a receber gerada.', '')
            return true
        } else {
            notifError('Erro ao cadastrar conta a receber.', 'Entre em contato com a administração do sistema')
            return false
        }

    }


    return (
        <div>
            <Button onClick={showModal}>
                Novo Pedido
                </Button>
            <Modal
                title="Novo Pedido"
                visible={ModalVisible}
                footer={false}
                onCancel={closeModal}
            >
                <Form {...layout} name="nest-messages" onFinish={newOrder} validateMessages={validateMessages}>

                    <Form.Item label="Vendedor">
                        <ColaboratorSelect type={0} form={order} />
                    </Form.Item>
                    <Form.Item label="Cliente">
                        <ColaboratorSelect type={1} form={order} />
                    </Form.Item>
                    <Form.Item>
                        <TabelaItens form={order} refresh={isVisible} />
                    </Form.Item>
                    <Form.Item label="Conta a Receber">
                        <Bill2Order order={b2oData}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button className="distancia-direita10" type="primary" onClick={closeModal} >
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
