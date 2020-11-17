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

class FormColaborador extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ieCheck: false,
            ieValue: '',
            icmsCheck: false,
            consumidorFinalCheck: false,
            pessoaJuridica: false,
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
            let obj = {
                ...values,
                icms: this.state.icmsCheck,
                ie: this.state.ieCheck,
                ieValue: this.state.ieValue,
                consumidorFinal: this.state.consumidorFinalCheck,
                token: getToken()
            };
            console.log(obj);
            const response = await api.post('/colaborator', obj);
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

        const checkChange = (value) => {
            switch (value.target.name) {
                case 'consumidorFinal':
                    this.setState({
                        consumidorFinalCheck: !this.state.consumidorFinalCheck
                    });
                    break;
                case 'ie':
                    this.setState({
                        ieCheck: !this.state.ieCheck
                    });
                    break;
                case 'icms':
                    this.setState({
                        icmsCheck: !this.state.icmsCheck
                    });
                    break;
            }
        }

        const identificadorChange = e => {
            let value = e.target.value;
            if (value.length <= 11) {
                this.setState({
                    pessoaJuridica: false,
                });
            } else {
                this.setState({
                    pessoaJuridica: true,
                });
            }
        }

        const inputChange = e => {
            const [target] = e.target;
            this.setState({
                [target]: e.target.value,
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
                    label="Nome/Razão Social"
                >
                    <Input name="nome" onChange={inputChange} />
                </Form.Item>


                <Form.Item
                    name="identificador"
                    label="CPF/CNPJ"
                    hasFeedback
                >
                    <Input onChange={identificadorChange} />
                </Form.Item>

                <Form.Item
                    name="nomeFantasia"
                    label="Nome Fantasia"
                    hidden={!this.state.pessoaJuridica}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="ie"
                    label="Ins. Estadual"
                    hidden={!this.state.pessoaJuridica}
                >
                    <Row>
                        <Input disabled={this.state.ieCheck} onChange={inputChange} />
                        <Checkbox name="ie" onChange={checkChange}>Isento</Checkbox>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="im"
                    label="Ins. Municipal"
                    hidden={!this.state.pessoaJuridica}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="icms"
                    label="Contribuinte ICMS"
                    valuePropName="checked"
                    hidden={!this.state.pessoaJuridica}
                >
                    <Checkbox name="icms" onChange={checkChange}></Checkbox>
                </Form.Item>

                <Form.Item
                    name="consumidorFinal"
                    label="Consumidor Final"
                    valuePropName="checked"
                >
                    <Checkbox name="consumidorFinal" onChange={checkChange}></Checkbox>
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
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    componentWillUnmount() {
        this.setState({
            pessoaJuridica: false,
        })
    }
}

export default FormColaborador;