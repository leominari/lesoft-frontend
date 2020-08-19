import React from 'react'
import api from '../../../services/api'
import { Button, Modal, Form, Input, notification, DatePicker } from 'antd'
import './../styles/financial.css'

import { getToken } from '../../../utils/auth';
import { BillAction } from '../../../redux/actions'
import { BillStore } from '../../../redux/store'
import SelectAccount from '../../account/SelectAccount'

class ModalBills extends React.Component {
    constructor(props) {
        super(props)
        this.data = {}
        this.state = {
            ModalVisible: this.props.vis
        }
    }

    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const dateFormat = 'DD/MM/YYYY'


        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }

        const newBillReceive = async (values) => {
            const desc = values.bp.desc
            const value = values.bp.value
            const dt = values.bp.date
            const obj = {
                date: dt.year() + "-" + (dt.month() + 1) + "-" + dt.date(),
                description: desc,
                value: value,
                type: "receive",
                idAccount: this.data.idAccount,
                token: getToken()
            }
            await api.post('/bill', obj).then((response) => {

                if (response.status === 200) {
                    if (response.data) {
                        api.get('/bill?token=' + getToken()).then((response) => {
                            if (response.status === 200) {
                                BillStore.dispatch({
                                    type: BillAction.SET,
                                    bills: response.data
                                })
                                this.setState({
                                    ModalVisible: !this.state.ModalVisible
                                })
                            }
                        })
                    }
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
            })

        }



        return (
            <div>
                <div className="head-example"
                    onClick={showModal}
                >
                </div>

                <Modal
                    title="Nova conta a Receber"
                    visible={this.state.ModalVisible}
                    footer={false}
                    onCancel={showModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={newBillReceive} >

                        <Form.Item name={['bp', 'desc']} label="Descrição" >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['bp', 'value']} label="Valor" >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['bp', 'date']} label="Data" >
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                        <Form.Item label="Conta" >
                            <SelectAccount data={this.data} />
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




export default ModalBills
