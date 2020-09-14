import React from 'react';
import {
    Form,
    Input,
    Button,
    Checkbox,
    Row,
} from 'antd';

import { notifError, notifSuccess } from '../../../../components/notificacao/notificacao';
import api from '../../../../services/api';
import { getToken } from '../../../../utils/auth';
import dColaborator from '../../../../components/data/dColaborator';

const ColaboratorController = new dColaborator()

class PessoaJuridica extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ieCheck: false
        }
    }


    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const newColaborator = async (values) => {
            const response = await api.post('/colaborator', {
                ...values,
                type: 'pj',
                token: getToken()
            })
            if (response.status === 200) {
                this.props.onClose()
                notifSuccess('Colaborador cadastrado!', '')
                ColaboratorController.getAllColaborators()
                return true
            } else {
                notifError('Erro no Cadastro', 'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.')
                return false
            }
        }

        const checkChange = () => {
            this.setState({
                ieCheck: !this.state.ieCheck
            })
        }

        return (
            <Form
                {...formItemLayout}
                name="register"
                onFinish={newColaborator}
                scrollToFirstError
            >
                <Form.Item
                    name="razaoSocial"
                    label="Razão Social"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="nomeFantasia"
                    label="Nome Fantasia"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="cnpj"
                    label="CNPJ"
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="ie"
                    label="Ins. Estadual"
                >
                    <Row>
                        <Input disabled={this.state.ieCheck} />
                        <Checkbox onChange={checkChange}>Isento</Checkbox>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="im"
                    label="Ins. Municipal"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="icms"
                    label="Contribuinte ICMS"
                    valuePropName="checked"
                >
                    <Checkbox></Checkbox>
                </Form.Item>

                <Form.Item
                    name="consumidorFinal"
                    label="Consumidor Final"
                    valuePropName="checked"
                >
                    <Checkbox></Checkbox>
                </Form.Item>

                <Form.Item
                    name="cep"
                    label="CEP"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="street"
                    label="Rua"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="number"
                    label="Número"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="complement"
                    label="Complemento"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="neighborhood"
                    label="Bairro"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="city"
                    label="Cidade"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="state"
                    label="Estado"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="country"
                    label="Pais"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Telefone"
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="celular"
                    label="Celular"
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-Mail"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="observation"
                    label="Observações"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default PessoaJuridica