import React from 'react'
import api from '../../../services/api'
import { Button, Modal, Form, Input, notification, DatePicker } from 'antd'
import './../styles/financial.css'

import { getToken } from '../../../utils/auth';
import { Bill2Action } from '../../../redux/actions'
import { Bill2Store } from '../../../redux/store'
import SelectAccount from '../../account/SelectAccount'

class Modal2Receive extends React.Component {
    constructor(props) {
        super(props)
        this.data = {}
        this.state = {
            ModalVisible: false
        }
    }

    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const dateFormat = 'DD/MM/YYYY'


        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }

        const newBill2Receive = async (values) => {
            const desc = values.b2p.desc
            const value = values.b2p.value
            const dt = values.b2p.date
            const obj = {
                date: dt.year() + "-" + (dt.month() + 1) + "-" + dt.date(),
                description: desc,
                value: value,
                type: "receive",
                idAccount: this.data.idAccount,
                token: getToken()
            }
            await api.post('/bill2', obj).then((response) => {

                if (response.status === 200) {
                    if (response.data) {
                        api.get('/bill2?token=' + getToken()).then((response) => {
                            if (response.status === 200) {
                                Bill2Store.dispatch({
                                    type: Bill2Action.SET,
                                    bill2s: response.data
                                })
                                this.setState({
                                    ModalVisible: !this.state.ModalVisible
                                })
                            }
                        })
                    }
                } else {
                    notification.open({
                        message: 'Erro no Cadastro',
                        description:
                            'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    })
                }
            })

        }



        return (
            <div>
                <Button onClick={showModal}>
                    Nova Conta a Receber
                        </Button>
                <Modal
                    title="Nova conta a Receber"
                    visible={this.state.ModalVisible}
                    footer={false}
                    onCancel={showModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={newBill2Receive} >

                        <Form.Item name={['b2p', 'desc']} label="Descrição" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['b2p', 'value']} label="Valor" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['b2p', 'date']} label="Data" rules={[{ required: true }]}>
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                        <Form.Item label="Conta" rules={[{ required: true }]}>
                            <SelectAccount data={this.data} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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




export default Modal2Receive
