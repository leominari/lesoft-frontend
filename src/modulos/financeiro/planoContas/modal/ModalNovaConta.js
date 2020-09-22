import React from 'react';
import api from '../../../../services/api';
import { Button, Modal, Form, Input, notification, DatePicker, InputNumber } from 'antd';
import '../styles/planoContas.css';

import SelectPlanoContas from '../../../../components/selects/SelectPlanoConta';

class ModalNovaConta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalVisible: false
        }
    }

    render() {
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 36 },
        };
        const dateFormat = 'DD/MM/YYYY'


        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }

        // const newBillPay = async (values) => {
        //     const obs = values.bp.obs
        //     const value = values.bp.value
        //     const dt = values.bp.date
        //     const obj = {
        //         date: dt.year() + "-" + (dt.month() + 1) + "-" + dt.date(),
        //         idColaborator: this.data.idClient,
        //         observation: obs,
        //         value: value,
        //         type: "pay",
        //         idAccount: this.data.idAccount,
        //         token: getToken()
        //     }
        //     await api.post('/bill', obj).then((response) => {

        //         if (response.status === 200) {
        //             if (response.data) {
        //                 api.get('/bill?token=' + getToken()).then((response) => {
        //                     if (response.status === 200) {
        //                         BillStore.dispatch({
        //                             type: BillAction.SET,
        //                             bills: response.data
        //                         })
        //                         this.setState({
        //                             ModalVisible: !this.state.ModalVisible
        //                         })
        //                     }
        //                 })
        //             }
        //         } else {
        //             notification.open({
        //                 message: 'Erro no Cadastro',
        //                 description:
        //                     'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
        //                 onClick: () => {
        //                     console.log('Notification Clicked!');
        //                 },
        //             })
        //         }
        //     })

        // }



        return (
            <div>
                <Button onClick={showModal}>
                    Nova Conta a Pagar
                        </Button>
                <Modal
                    title="Nova conta a Pagar"
                    visible={this.state.ModalVisible}
                    footer={false}
                    onCancel={showModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={() => { console.log('oi') }} >

                        <Form.Item name={['bp', 'date']} label="Data" >
                            <SelectPlanoContas />
                        </Form.Item>
                        <Form.Item name={['bp', 'obs']} label="Observação" >
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
