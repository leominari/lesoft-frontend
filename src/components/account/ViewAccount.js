import React from 'react'
import { notification, Row, Timeline } from 'antd';
import { TransactionStore } from '../../redux/store';
import { transactionAction } from '../../redux/actions';
import { getToken } from '../../utils/auth';
import { withRouter } from 'react-router-dom'
import ModalCredit from './transaction/ModalCredit'
import ModalDebit from './transaction/ModalDebit'
import api from '../../services/api';

class ViewAccount extends React.Component {
    constructor(props) {
        super(props)
        this.idAccount = this.props.match.params.id;
        this.state = {
            transactions: [],
            balance: 0
        }
    }

    componentDidMount() {
        const getTransactions = async () => {
            const response = await api.get('/transaction/' + this.idAccount + '?token=' + getToken())
            if (response.status === 200) {
                TransactionStore.dispatch({
                    type: transactionAction.SET,
                    transactions: response.data
                })
                return true
            } else {
                notification.open({
                    message: 'Erro no Cadastro',
                    description:
                        'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                })
                return false
            }
        }

        const tableData = (data) => {
            const temp = []
            let balance = 0
            let helpColor = ""
            let helpDate
            data.forEach(element => {
                helpDate = new Date(element.createdAt)
                balance += element.value
                helpColor = element.value >= 0 ? "green" : "red"
                temp.push(<Timeline.Item key={element.id} color={helpColor} label={"R$ " + element.value}>{element.description} dia {helpDate.getDate() + "/" + (helpDate.getMonth() + 1) + "/" + helpDate.getFullYear()}</Timeline.Item>)
                // temp.push({
                //     key: element.id,
                //     description: element.description,
                //     value: "R$ " + Number(element.value).toFixed(2)
                // })
            });
            this.setState({
                balance: balance
            })
            return temp
        }


        this.unsubscribe = TransactionStore.subscribe(() => {
            this.setState({
                transactions: tableData(TransactionStore.getState())
            })
        })
        getTransactions()
    }


    render() {

        // const columns = [
        //     {
        //         title: 'Descrição',
        //         dataIndex: 'description',
        //         key: 'id'
        //     },
        //     {
        //         title: 'Valor',
        //         dataIndex: 'value',
        //     },
        //     {
        //         title: 'Opções',
        //         dataIndex: 'value',
        //     },
        // ];


        return <>
            <Row>
                <ModalCredit account={this.idAccount} />
                <ModalDebit account={this.idAccount} />
            </Row>
            {/* <Button onClick={() => { console.log(transactions) }}>teste</Button> */}
            <h1>Saldo: R$ {Number(this.state.balance).toFixed(2)}</h1>
            <Timeline mode="left">
                {this.state.transactions}
            </Timeline>
            {/* <Table columns={columns} dataSource={transactions} bordered /> */}
        </>

    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}


export default withRouter(ViewAccount);


