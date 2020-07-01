import React from 'react'
import { Button, Input, notification } from 'antd'
import '../styles/colab.css'

import { getToken } from '../../../utils/auth';
import { ColaboratorStore } from '../../../redux/store'
import { colaboratorAction } from '../../../redux/actions';
import api from '../../../services/api';

class PessoaJuridica extends React.Component {
    render() {
        const newColaborator = async (values) => {
            const response = await api.post('/colaborator', {
                ...values.user,
                token: getToken()
            })
            if (response.status === 200) {
                ColaboratorStore.dispatch({
                    type: colaboratorAction.SET,
                    colaborators: response.data.all_colaborators
                })
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
        }


        return (
            <div>
                <Input />
                <Button className="distancia-direita10" type="primary"  >
                    Cancelar
                </Button>
                <Button type="primary" onClick={newColaborator}>
                    Cadastrar
                </Button>
            </div>
        )
    }
}

export default PessoaJuridica;