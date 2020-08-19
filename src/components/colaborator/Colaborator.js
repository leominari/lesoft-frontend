import React from 'react'
import { Table } from 'antd'
import { ColaboratorStore } from '../../redux/store'
import ModalColaborator from './ModalColaborator'
import './styles/colab.css'
import dColaborator from '../data/dColaborator'



class Colaborator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colaborators: []
        }
    }

    componentDidMount() {
        const Colaborator = new dColaborator();
        this.unsubscribe = ColaboratorStore.subscribe(() => {
            const temp = ColaboratorStore.getState();
            this.setState({
                colaborators: Colaborator.tableData(temp),
            })
        })
        Colaborator.getAllColaborators()
    }

    render() {
        const columns = [
            {
                title: 'Código do Colaborador',
                dataIndex: 'key',
                key: 'key'

            },
            {
                title: 'Nome',
                dataIndex: 'name',
                key: 'name'

            },
            {
                title: 'Tipo',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: 'Ações',
                dataIndex: 'acao',
                key: 'acao'
            },
        ];


        return (
            <div>
                <ModalColaborator />
                <Table dataSource={this.state.colaborators} columns={columns} className="distancia-botao" />
            </div>
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default Colaborator;