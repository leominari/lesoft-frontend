import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import { Table, Button, notification, Row, Timeline } from 'antd';
import { TransactionStore } from '../../redux/store';
import { transactionAction } from '../../redux/actions';
import { getToken } from '../../utils/auth';

import ModalCredit from './transaction/ModalCredit'
import ModalDebit from './transaction/ModalDebit'

function ViewAccount() {
    let { id } = useParams()
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState(0)

    React.useEffect(() => {
        TransactionStore.subscribe(() => {
            setTransactions(tableData(TransactionStore.getState()))
        })
        getTransactions()
    }, [])

    function tableData(data) {
        const temp = []
        let balance = 0
        let helpColor = ""
        let helpDate
        data.forEach(element => {
            helpDate = new Date(element.createDate)
            balance += element.value
            helpColor = element.value >= 0 ? "green" : "red"
            temp.push(<Timeline.Item key={element.id} color={helpColor} label={"R$ " + element.value}>{element.description} dia {helpDate.getDate() + "/" + (helpDate.getMonth()+1) + "/" + helpDate.getFullYear()}</Timeline.Item>)
            // temp.push({
            //     key: element.id,
            //     description: element.description,
            //     value: "R$ " + Number(element.value).toFixed(2)
            // })
        });
        setBalance(balance)
        return temp
    }

    async function getTransactions() {
        const response = await Axios.get('/api/transaction/get/' + id + '/' + getToken())
        if (response.data.status_code === 200) {
            TransactionStore.dispatch({
                type: transactionAction.SET,
                transactions: response.data.all_transactions
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



    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'id'
        },
        {
            title: 'Valor',
            dataIndex: 'value',
        },
        {
            title: 'Opções',
            dataIndex: 'value',
        },
    ];

    return <>
        <Row>
            <ModalCredit account={id} />
            <ModalDebit account={id} />
        </Row>
        {/* <Button onClick={() => { console.log(transactions) }}>teste</Button> */}
        <h1>Saldo: R$ {Number(balance).toFixed(2)}</h1>
        <Timeline mode="left">
            {transactions}
        </Timeline>
        {/* <Table columns={columns} dataSource={transactions} bordered /> */}
    </>
}
export default ViewAccount