import React from 'react';
import './styles/planoContas.css';
import { Tree } from 'antd';
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


    fillTree(data) {
        if (data.length <= 0) return;
        let temp = [];
        data.forEach(element => {
            temp.push({
                title: <ModalNovaConta
                    text={element.codigo + ' ' + element.nome + ' '}
                    codPai={element.codigo}
                    disabled={true}
                    icon={true}
                />,
                key: element.codigo,
                pai: element.codigoPai,
                children: [],
            });
        });

        let aux = [...temp];

        aux = aux.filter(pc => {
            return pc.codigo == null
        });

        for (var i = 0; i < temp.length; i++) {
            for (var j = 0; j < aux.length; j++) {
                if (temp[i].key === aux[j].pai) {
                    console.log(temp[i].key, aux[j].pai);
                    temp[i].children.push(aux[j]);
                    aux.splice(j, 1);

                }
            }
        }
        temp = temp.filter(pc =>{
            return pc.pai == null
        })
        // console.log(temp);
        return temp;
    }


    componentDidMount() {
        api.get('/pc?token=' + getToken()).then(response => {
            // console.log(response.data);
            console.log(response.data);
            let tempData = this.fillTree(response.data);

            this.setState({
                treeData: tempData,
            })
        });
    }

    render() {
        return <>
            <ModalNovaConta disabled={true} />
            <div>
                <br></br>
                <h2 className="texto">Plano de Contas</h2>
            </div>

            <Tree
                className="draggable-tree"
                selectable={false}
                treeData={this.state.treeData}
            />
        </>
    }
}

export default PlanoContas;

