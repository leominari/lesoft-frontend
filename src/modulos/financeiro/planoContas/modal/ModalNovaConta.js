import React from 'react';
import api from '../../../../services/api';
import { getToken } from '../../../../utils/auth';
import { Button, Modal, Form, Input } from 'antd';
import '../styles/planoContas.css';
import { notifSuccess, notifError } from '../../../../components/notificacao/notificacao'
import SelectPlanoContas from '../../../../components/selects/SelectPlanoConta';

class ModalNovaConta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalVisible: false
        };
        this.form = {};
    }

    render() {
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 36 },
        };


        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }

        const newPlanoConta = async (values) => {
            const obj = {
                idPai: this.form.idPlanoContas ? this.form.idPlanoContas : null,
                descricao: values.bp.nome,
                token: getToken(),
            };
            await api.post('/pc', obj).then((response) => {
                if (response.status === 200) {
                    showModal();
                    notifSuccess('Cadastrado com sucesso.');
                } else {
                    showModal();
                    notifError('Erro ao cadastrar.');
                }
            })

        }



        return (
            <div>
                <Button onClick={showModal}>
                    Novo plano de conta
                </Button>
                <Modal
                    title="Nova plano de conta"
                    visible={this.state.ModalVisible}
                    footer={false}
                    onCancel={showModal}
                    destroyOnClose
                >
                    <Form {...layout} name="nest-messages" onFinish={newPlanoConta} >

                        <Form.Item name={['bp', 'codigo_pai']} label="Código do Pai" >
                            <SelectPlanoContas form={this.form} />
                        </Form.Item>
                        <Form.Item name={['bp', 'nome']} label="Nome" >
                            <Input.TextArea />
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




export default ModalNovaConta;
