import React, { useState } from 'react'
import { Skeleton, Switch, Card, Avatar, Button, Row } from 'antd'
import {
    PlusOutlined,
    ExportOutlined,
    MinusOutlined
} from '@ant-design/icons'

import { AccountStore } from '../../redux/store';
import ModalAccount from './ModalAccount';
import dAccount from '../data/dAccount'
import { Link } from 'react-router-dom';

const { Meta } = Card;

function Account() {
    const Account = new dAccount()

    const [accounts, setAccounts] = useState([])
    const [accountCards, setCard] = useState([])


    React.useEffect(() => {
        AccountStore.subscribe(() => {
            setAccounts(AccountStore.getState())
        })
        Account.getAllAccounts()
    }, [])

    React.useEffect(() => {
        let temp = []
        accounts.forEach(account => {
            temp.push(
                <Card
                    style={{ width: 290, marginTop: 12, marginRight: 12 }}
                    key={account.id}
                    actions={[
                        <Link to={"/home/conta/" + account.id}><ExportOutlined key="select"/></Link>,
                        <PlusOutlined key="add" />,
                        <MinusOutlined key="remove" />
                    ]}
                >
                    <Skeleton loading={false} avatar active>
                        <Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={account.name}
                            description={['ultima transação', 'penultima transação', 'antipenutilma transação']}
                        />
                    </Skeleton>
                </Card>
            )
        });
        setCard(temp)
    }, [accounts])

    return (
        <>
            <ModalAccount />
            <Row>
                {accountCards}
            </Row>
        </>
    );
}


export default Account