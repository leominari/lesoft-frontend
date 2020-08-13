import React from 'react'
import {
    Form,
    Input,
    Button,
    DatePicker,
    Select,
} from 'antd';

import { notifError, notifSuccess } from '../../helpers/notfication'
import api from '../../../services/api'
import { getToken } from '../../../utils/auth'
import dColaborator from '../../data/dColaborator'

const ColaboratorController = new dColaborator()

const { Option } = Select;

class PessoaFisica extends React.Component {
    onGenderChange(value) {
        console.log(value)
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
            const birth = values.birthDate
            console.log(values)
            values.birthDate = birth.year() + "-" + birth.month() + "-" + birth.date()
            const response = await api.post('/colaborator', {
                ...values,
                type: 'pf',
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



        return (
            <Form
                {...formItemLayout}
                name="register"
                onFinish={newColaborator}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Nome Completo"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="cpf"
                    label="CPF"
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="rg"
                    label="RG"
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item name="birthDate" label="Data Nascimento">
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Sexo"
                >
                    <Select
                        placeholder="Selecione o sexo"
                        onChange={this.onGenderChange}
                        allowClear
                    >
                        <Option value="male">Masculino</Option>
                        <Option value="female">Feminino</Option>
                        <Option value="other">Outro</Option>
                    </Select>
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
                    <Button type="primary" htmlType="submit" >
                        Registrar
                </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default PessoaFisica