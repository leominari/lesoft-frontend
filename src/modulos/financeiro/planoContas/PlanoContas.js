import React from 'react';
import './styles/planoContas.css';
import ModalNovaConta from './modal/ModalNovaConta';

class PlanoContas extends React.Component {
    contructor(props) {

    }
    render() {
        return <>
            <ModalNovaConta/>
            <div>
                <h2 className="texto">Plano de Contas</h2>
            </div>
        </>
    }
}

export default PlanoContas;

