import React from 'react'
import { Skeleton, Card, Row } from 'antd'
import {
    ExportOutlined,
} from '@ant-design/icons'
import { AccountStore } from '../../redux/store';
import { Link } from 'react-router-dom';

import ModalAccount from './ModalAccount';
import dAccount from '../data/dAccount'

const { Meta } = Card;

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            accountCards: [],
            Account: new dAccount()
        }
    }


    componentDidMount() {
        this.unsubscribe = AccountStore.subscribe(() => {
            const temp = []
            const tempAccounts = AccountStore.getState();
            tempAccounts.forEach(account => {
                temp.push(
                    <Card
                        style={{ width: 290, marginTop: 12, marginRight: 12 }}
                        key={account.id}
                        actions={[
                            <Link to={"/home/conta/" + account.id}><ExportOutlined key="select" /></Link>,
                        ]}
                    >
                        <Skeleton loading={false} avatar active>
                            <Meta
                                title={account.name}
                                description={['ultima transação', 'penultima transação', 'antipenutilma transação']}
                            />
                        </Skeleton>
                    </Card>
                )
            });
            this.setState({
                accounts: AccountStore.getState(),
                accountCards: temp
            })
        })

        this.state.Account.getAllAccounts()
    }

    render() {
        return (
            <>
                <ModalAccount />
                <Row>
                    {this.state.accountCards}
                </Row>
            </>
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default Account