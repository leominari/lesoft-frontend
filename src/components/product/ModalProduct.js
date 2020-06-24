import React, { useState } from 'react'
import { ProductStore } from '../../redux/store'
import { Button, Modal, Form, Input, notification } from 'antd'
import Axios from 'axios'
import { getToken } from '../../utils/auth'
import { productAction } from '../../redux/actions'

export default function ModalProduct() {

    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    const onSubmit = (values) => (isVisible(!newProduct(values)))


    async function newProduct(values) {
        const response = await Axios.post('/api/product/new', {
            ...values.product,
            token: getToken()
        })
        if (response.data.status_code === 200) {
            ProductStore.dispatch({
                type: productAction.SET,
                products: response.data.all_products
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
    };

    const closeModal = e => {
        isVisible(false)
    };


    return (
        <div>
            <Button onClick={showModal}>
                Novo Produto
                </Button>
            <Modal
                title="Novo Produto"
                visible={ModalVisible}
                footer={false}
                onCancel={closeModal}
            >
                <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>

                    <Form.Item name={['product', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'price']} label="Preço" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'unity']} label="Unidade" rules={[{ required: true }]}>
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