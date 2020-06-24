import React, { useState } from 'react'
import { Button, Modal, Form, Input, notification, Radio } from 'antd'
import './styles/colab.css'

import Axios from 'axios'

import { getToken } from '../../utils/auth';
import { ColaboratorStore } from '../../redux/store'
import { colaboratorAction } from '../../redux/actions';
import PessoaFisica from './type/PessoaFisica'
import PessoaJuridica from './type/PessoaJuridica'

export default function ModalColaborator() {


    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);
    const [typeColaborator, setTypeColaborator] = useState(0)
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    const onSubmit = (values) => (isVisible(!newColaborator(values)))


    const closeModal = e => {
        isVisible(false)
    };




    async function newColaborator(values) {
        const response = await Axios.post('/api/colaborator/new', {
            ...values.user,
            token: getToken()
        })
        if (response.data.status_code === 200) {
            ColaboratorStore.dispatch({
                type: colaboratorAction.SET,
                colaborators: response.data.all_colaborators
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

    function selectColab(e){
        setTypeColaborator(e.target.value)
    }


    function ColaboratorType(){
        switch (typeColaborator) {
            case 0:
                return <></>
                break;
            case "PF":
                return <PessoaFisica />
                break;
            case "PJ":
                return <PessoaJuridica />
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Button onClick={showModal}>
                Novo Colaborador
                </Button>
            <Modal
                title="Novo Colaborador"
                visible={ModalVisible}
                footer={false}
                onCancel={closeModal}
            >
                <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>

                    <Radio.Group onChange={selectColab} >
                        <Radio value={"PF"}>Pessoa Fisica</Radio>
                        <Radio value={"PJ"}>Pessoa Juridica</Radio>
                    </Radio.Group>
                    <ColaboratorType />
                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'type']} label="Tipo" rules={[{ required: true }]}>
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
