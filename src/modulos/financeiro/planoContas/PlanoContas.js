import React from 'react';
import './styles/planoContas.css';
import { Button, Tree } from 'antd';
import ModalNovaConta from './modal/ModalNovaConta';
import api from '../../../services/api';
import { getToken } from '../../../utils/auth';

class PlanoContas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
        }
    }


    componentDidMount() {
        api.get('/pc?token=' + getToken()).then(response => {
            console.log(response.data);
            let tempData = [];
            response.data.forEach(element => {
                tempData.push({
                    title: <ModalNovaConta text={element.codigo + '-' + element.nome + ' '} selected={element.codigoPai + '.' + element.codigo} disabled={false} icon={true} />,
                    key: element.codigoPai + ' - ' + element.codigo,
                })
            });

            this.setState({
                treeData: tempData,
            })
        });
    }

    render() {
        return <>
            <ModalNovaConta disabled={true} />
            <ModalNovaConta disabled={false} />
            <div>
                <br></br>
                <h2 className="texto">Plano de Contas</h2>
            </div>

            <Tree
                className="draggable-tree"
                draggable
                blockNode
                treeData={this.state.treeData}
            />
        </>
    }
}

export default PlanoContas;

