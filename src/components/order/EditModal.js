import React from 'react'
import { Modal, Button, Form, notification } from 'antd';
import SelectColaborator from '../colaborator/SelectColaborator';
import { getToken } from '../../utils/auth';
import api from '../../services/api';
import { OrderStore, } from '../../redux/store';
import { orderAction, } from '../../redux/actions';
import { notifSuccess, notifError } from '../helpers/notfication';
import ItensTableEdit from './ItensTableEdit';

class EditModal extends React.Component {
  constructor(props) {
    super(props)
    this.order = {}
    this.state = {
      confirmLoading: false,
      ModalVisible: false
    };
  }

  componentDidMount() {
    const getProducts = async () => {
      await api.get('/orderproduct/' + this.props.order.id + '?token=' + getToken()).then((response) => {
        if (response.status === 200) {
          this.order.products = response.data
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
    getProducts()

  }

  newOrder = async () => {
    const obj = {
      idClient: this.order.idClient,
      idSalesman: this.order.idSalesman,
      products: this.order.products,
      status: "opened",
      token: getToken()
    }

    await api.post('/order', obj).then(async function (response) {
      if (response.status === 200) {
        if (response.data) {
          await api.get('/order?token=' + getToken()).then(function (response) {
            if (response.status === 200) {
              OrderStore.dispatch({
                type: orderAction.SET,
                orders: response.data
              })
            }
          })
        }
        notifSuccess('Pedido Atualizado.', '')
      } else {
        notifError('Erro ao gerar conta a receber.', 'Entre em contato com a administração do sistema.')
      }
    }).catch(function (error) {
      console.log(error)
    })

    this.setState({
      ModalVisible: false
    })
    this.order = {}
  }

  render() {
    const { confirmLoading } = this.state;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 26 },
    };


    const openEdit = () => {
      this.setState({
        ModalVisible: !this.state.ModalVisible
      })
    }


    const showModal = () => {
      this.setState({
        ModalVisible: !this.state.ModalVisible
      })
    };

    const handleOk = () => {
      this.setState({
        ModalText: 'The modal will be closed after two seconds',
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          ModalVisible: false,
          confirmLoading: false,
        });
      }, 2000);
    };


    return (
      <div>
        <Button onClick={openEdit}>Editar</Button>
        <Modal
          title={`Pedido número ${this.props.order.id}`}
          visible={this.state.ModalVisible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          destroyOnClose={true}
          onCancel={showModal}
        >
          <Form {...layout} name="nest-messages" onFinish={this.newOrder}>
            <Form.Item label="Vendedor">
              <SelectColaborator type="salesman" form={this.order} selected={this.props.order.Salesman} />
            </Form.Item>
            <Form.Item label="Cliente">
              <SelectColaborator type="client" form={this.order} selected={this.props.order.Client} />
            </Form.Item>
            <Form.Item>
              <ItensTableEdit form={this.order} orderid={this.props.order.id} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default EditModal