import React, { useState } from 'react'
import { Button, Modal, Form, Input, notification } from 'antd'
import './../styles/account.css'

import Axios from 'axios'

import { getToken } from '../../../utils/auth';
import { AccountStore, TransactionStore } from '../../../redux/store';
import { accountAction, transactionAction } from '../../../redux/actions';


export default function ModalAdd(params) {
    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    const onSubmit = (values) => (isVisible(!newTransaction(values)))


    const closeModal = e => {
        isVisible(false)
    };




    async function newTransaction(values) {
        const response = await Axios.post('/api/transaction/add', {
            id: params.account,
            description: values.transaction.description,
            value: values.transaction.value,
            token: getToken()
        })
        if (response.data.status_code === 200) {
            TransactionStore.dispatch({
                type: transactionAction.SET,
                transactions: response.data.all_transactions
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
            // return false
        }
    }



    return (
        <div>
            <Button onClick={showModal}>
                Creditar na Conta
                </Button>
            <Modal
                title="Credito na Conta"
                visible={ModalVisible}
                footer={false}
                onCancel={closeModal}
            >
                <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>

                    <Form.Item name={['transaction', 'description']} label="Descrição" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['transaction', 'value']} label="Valor" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button className="distancia-direita10" type="primary" onClick={closeModal} >
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