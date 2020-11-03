import React from 'react';
// import api from '../../../../services/api'
import { Button, Drawer, Table } from 'antd';
import './../styles/financial.css';


class DrawerBills extends React.Component {
    constructor(props) {
        super(props)
        this.bills = []
        this.state = {
            visible: false
        }

    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    renderTableBill = () => {
        const temp = []
        this.props.data.forEach(bill => {
            temp.push({
                key: bill.id,
                colaboratorName: bill.colaboratorName,
                value: `R$${bill.value.toFixed(2).toString().replace(".", ",")}`,
                actions: <><Button>Ver</Button></>
            })
        });

        return temp;
    };


    render() {

        const RenderBills = () => {
            if (this.props.type === "pay") {
                this.props.data.forEach(bill => {
                    this.bills.push(<div key={bill.id}>
                        <p>{}</p>
                    </div>)
                });

                return <>
                    {this.bills}
                </>
            } else {
                const columns = [
                    {
                        title: 'Colaborator',
                        dataIndex: 'colaboratorName',
                        render: text => <a href >{text}</a>,
                    },
                    {
                        title: 'Valor',
                        className: 'column-money',
                        dataIndex: 'value',
                    },
                    {
                        title: 'Ações',
                        dataIndex: 'actions',
                    },
                ];

                return <>

                    {/* let billValue = bill.value.toFixed(2).toString().replace(".", ",") */}
                    <Table
                        columns={columns}
                        dataSource={this.renderTableBill()}
                        bordered
                        pagination={false}
                    />

                </>
            }
        }


        return (
            <div>
                <div className="head-example"
                    onClick={this.showDrawer}
                >
                </div>

                <Drawer
                    title="Contas do dia"
                    width={600}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <RenderBills />
                </Drawer>
            </div >
        )
    }
}




export default DrawerBills
