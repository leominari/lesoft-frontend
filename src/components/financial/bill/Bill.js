import React from 'react'
import { Calendar, Badge, Row } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import moment from 'moment'
import ModalPay from './ModalPay'
import ModalReceive from './ModalReceive'
import { BillStore } from '../../../redux/store'
import { getToken } from '../../../utils/auth'
import { BillAction } from '../../../redux/actions'
import api from '../../../services/api'
import ModalBills from './ModalBills'

moment.updateLocale('pt', {
    weekdaysMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
});

class Bill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bill: []
        }
    }

    componentDidMount() {
        this.unsubscribe = BillStore.subscribe(() => {
            this.setState({
                bill: BillStore.getState()
            })
        })

        async function getAllBills() {
            await api.get('/bill?token=' + getToken()).then(response => {
                BillStore.dispatch({
                    type: BillAction.SET,
                    bills: response.data
                })
            })
        }

        getAllBills();

    }


    render() {
        function overdue(td, dt) {
            const today = new Date(td)
            const date = new Date(dt)

            if (date.getFullYear() >= today.getFullYear()) {
                if (date.getFullYear() === today.getFullYear()) {
                    if (date.getMonth() >= today.getMonth()) {
                        if (date.getMonth() === today.getMonth()) {
                            if (date.getDate() >= today.getDate()) {
                                if (date.getDate() === today.getDate()) {
                                    return false
                                }
                                else {
                                    return false
                                }
                            } else {
                                return true
                            }
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            } else {
                return true
            }
        }


        const getListData = (value) => {
            let listData = {
                pay: [],
                receive: [],
                color: ""
            }
            const date = value.year() + "-" + ("00" + (value.month() + 1)).slice(-2) + "-" + value.date()
            const bill = this.state.bill
            const today = new moment()

            if (bill.length > 0) {
                bill.forEach(element => {
                    const elementDate = new Date(element.date)
                    const teste = elementDate.getFullYear() + "-" + ("00" + (elementDate.getMonth() + 1)).slice(-2) + "-" + elementDate.getDate()
                    console.log(date, teste)
                    if (date === teste) {
                        if (element.type === "pay") {
                            listData.color = overdue(today._d, date) ? "#FF0000" : "#0000FF"
                            listData.pay.push(element)
                            overdue(today, date)
                        } else {
                            listData.receive.push(element)
                        }
                    }
                });
            }
            return listData
        }

        const dateCellRender = (value) => {
            const listData = getListData(value);
            const temp = []
            if (listData.pay.length > 0) {
                temp.push(
                    <div key="pay">
                        <Badge
                            className="badge-space"
                            style={{ backgroundColor: listData.color }}
                            count={listData.pay.length}
                        >
                            <ModalBills data={listData.pay} />
                        </Badge>
                    </div>
                )
            }
            if (listData.receive.length > 0) {
                temp.push(
                    <div key="receive">
                        <Badge
                            className="badge-space"
                            style={{ backgroundColor: '#52c41a' }}
                            count={listData.receive.length}
                        >
                            <ModalBills data={listData.receive} />
                        </Badge>
                    </div>
                )
            }

            return (
                <div className="space-top10">
                    {temp}
                </div>
            );
        }

        const getMonthData = (value) => {
            if (value.month() === 8) {
                return 1394;
            }
        }

        const monthCellRender = (value) => {
            const num = getMonthData(value);
            return num ? (
                <div className="notes-month">
                    <section>{num}</section>
                    <span>Backlog number</span>
                </div>
            ) : null;
        }

        return <>
            <Row>
                <ModalReceive />
                <ModalPay />
            </Row>
            <Calendar locale={ptBR} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </>
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default Bill;



