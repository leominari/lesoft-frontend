import React from 'react';
import {
    Modal,
    Button,
} from 'antd';
import '../styles/colab.css';
import FormColaborador from './FormColaborador';
class ModalColaborator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ModalVisible: false,
            register: false,
            ieCheck: false
        }
    }




    render() {
        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }

        return (
            <div>
                <Button onClick={showModal}>
                    Cadastrar colaborador
                </Button>
                <Modal
                    title="Cadastro de colaborador"
                    visible={this.state.ModalVisible}
                    onCancel={showModal}
                    destroyOnClose={true}
                    footer={false}
                >
                    <FormColaborador />
                </Modal>
            </div>
        )
    }

}

export default ModalColaborator;
