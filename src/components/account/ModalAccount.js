import React, { useState } from 'react'
import { Button, Modal, Form, Input, notification } from 'antd'
import './styles/account.css'

import { getToken } from '../../utils/auth';
import { AccountStore } from '../../redux/store';
import { accountAction } from '../../redux/actions';
import api from '../../services/api';


export default function ModalAccount() {


    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };


    const onSubmit = (values) => (isVisible(!newAccount(values)))


    const closeModal = e => {
        isVisible(false)
    };




    async function newAccount(values) {
        const response = await api.post('/account', {
            ...values.account,
            token: getToken()
        })
        if (response.status === 200) {
            AccountStore.dispatch({
                type: accountAction.SET,
                accounts: response.data.all_accounts
            })
            return true
        } else {
            notification.open({
                message: 'Erro no Cadastro',
                description:
                    'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            })
            return false
        }
    }



    return (
        <div>
            <Button onClick={showModal}>
                Nova Conta
                </Button>
            <Modal
                title="Nova Conta"
                visible={ModalVisible}
                footer={false}
                onCancel={closeModal}
            >
                <Form {...layout} name="nest-messages" onFinish={onSubmit} >

                    <Form.Item name={['account', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
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