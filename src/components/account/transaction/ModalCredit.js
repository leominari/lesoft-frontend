import React from 'react'
import { Button, Modal, Form, Input, notification } from 'antd'
import './../styles/account.css'

import { getToken } from '../../../utils/auth';
import { TransactionStore } from '../../../redux/store';
import { transactionAction } from '../../../redux/actions';
import api from '../../../services/api';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalVisible: false
        }
    }


    render() {
        const newTransaction = async (values) => {
            const obj = {
                idAccount: this.props.account,
                description: values.transaction.description,
                value: values.transaction.value,
                token: getToken()
            }
            const response = await api.post('transaction', obj )
            if (response.status === 200) {
                TransactionStore.dispatch({
                    type: transactionAction.SET,
                    transactions: response.data
                })
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
        }

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };

        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }
        return (
            <div>
                <Button onClick={showModal}>
                    Creditar na Conta
                </Button>
                <Modal
                    title="Creditando na Conta"
                    visible={this.state.ModalVisible}
                    footer={false}
                    onCancel={showModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={newTransaction}>

                        <Form.Item name={['transaction', 'description']} label="Descrição" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['transaction', 'value']} label="Valor" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button className="distancia-direita10" type="primary" onClick={showModal} >
                                Cancelar
                        </Button>
                            <Button type="primary" htmlType="submit">
                                Debitar
                        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}


export default ModalAdd 