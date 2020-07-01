import React from 'react'
import { Button, Modal, Radio } from 'antd'
import './styles/colab.css'
import PessoaFisica from './type/PessoaFisica'
import PessoaJuridica from './type/PessoaJuridica'

class ModalColaborator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ModalVisible: false,
            typeColaborator: 0
        }
    }

    render() {

        const selectColab = (e) => {
            this.setState({
                typeColaborator: e.target.value
            })
        }

        const ColaboratorType = () => {
            switch (this.state.typeColaborator) {
                case 0:
                    return <></>
                case "PF":
                    return <PessoaFisica />
                case "PJ":
                    return <PessoaJuridica />
                default:
                    break;
            }
        }


        const showModal = () => {
            this.setState({
                ModalVisible: !this.state.ModalVisible
            })
        }



        return (
            <div>
                <Button onClick={showModal}>
                    Novo Colaborador
                    </Button>
                <Modal
                    title="Novo Colaborador"
                    visible={this.state.ModalVisible}
                    footer={false}
                    onCancel={showModal}
                >
                    <Radio.Group onChange={selectColab} >
                        <Radio value={"PF"}>Pessoa Fisica</Radio>
                        <Radio value={"PJ"}>Pessoa Juridica</Radio>
                    </Radio.Group>
                    <ColaboratorType modal={this.state.ModalVisible}/>
                </Modal>
            </div>
        )
    }

}

export default ModalColaborator;
