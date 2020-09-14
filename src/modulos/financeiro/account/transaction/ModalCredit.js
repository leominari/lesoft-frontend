import React from 'react'
import { Button, Modal, Form, Input, notification } from 'antd'
import './../styles/account.css'

import { getToken } from '../../../../utils/auth';
import { TransactionStore } from '../../../../redux/store';
import { transactionAction } from '../../../../redux/actions';
import api from '../../../../services/api';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalVisible: false
        }
    }


    render() {

        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }

        const newTransaction = async (values) => {
            const obj = {
                idAccount: this.props.account,
                description: values.transaction.description,
                value: values.transaction.value,
                token: getToken()
            }
            await api.post('transaction', obj).then(async(response) => {
                if (response.status === 200) {
                    if (response.data) {
                        await api.get('/transaction/' + this.idAccount + '?token=' + getToken()).then((response) => {
                            if (response.status === 200) {
                                TransactionStore.dispatch({
                                    type: transactionAction.SET,
                                    transactions: response.data
                                })
                            }
                        })
                        showModal()
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

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };

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

                        <Form.Item name={['transaction', 'description']} label="Descrição" >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['transaction', 'value']} label="Valor" >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button className="distancia-direita10" type="primary" onClick={showModal} >
                                Cancelar
                        </Button>
                            <Button type="primary" htmlType="submit">
                                Creditar
                        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}


export default ModalAdd 