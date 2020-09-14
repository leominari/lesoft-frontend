import React from 'react'
import { Button, Modal, Form, Input, notification } from 'antd'
import '../styles/account.css'

import { getToken } from '../../../../utils/auth';
import { AccountStore } from '../../../../redux/store';
import { accountAction } from '../../../../redux/actions';
import api from '../../../../services/api';

class ModalAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalVisible: false
        }
    }

    render() {

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };

        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }

        const newAccount = async (values) => {
            const response = await api.post('/account', {
                ...values.account,
                token: getToken()
            })
            if (response.status === 200) {
                AccountStore.dispatch({
                    type: accountAction.SET,
                    accounts: response.data.all_accounts
                })
                showModal()
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


        return (
            <div>

                <Button onClick={showModal}>
                    Nova Conta
                </Button>
                <Modal
                    title="Nova Conta"
                    visible={this.state.ModalVisible}
                    footer={false}
                    onCancel={showModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={newAccount} >

                        <Form.Item name={['account', 'name']} label="Name" >
                            <Input />
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

export default ModalAccount;