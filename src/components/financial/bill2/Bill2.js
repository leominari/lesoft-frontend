import React from 'react'
import { Calendar, Badge, Row, Button } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import moment from 'moment'
import Modal2Pay from './Modal2Pay'
import Modal2Receive from './Modal2Receive'
import { Bill2Store } from '../../../redux/store'
import { getToken } from '../../../utils/auth'
import { Bill2Action } from '../../../redux/actions'
import api from '../../../services/api'

moment.updateLocale('pt', {
    weekdaysMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
});


class Bill2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bill2: []
        }
    }

    componentDidMount() {
        this.unsubscribe = Bill2Store.subscribe(() => {
            this.setState({
                bill2: Bill2Store.getState()
            })
        })

        async function getAllBill2() {
            await api.get('/bill2?token=' + getToken()).then(response => {
                Bill2Store.dispatch({
                    type: Bill2Action.SET,
                    bill2s: response.data
                })
            })
        }

        getAllBill2();

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
            const temp = this.state.bill2
            const today = new moment()
            if (temp.length > 0) {
                temp.forEach(element => {
                    if (date === element.date.substr(0, 10)) {
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
                    <Badge
                        className="badge-space"
                        key="pay"
                        style={{ backgroundColor: listData.color }}
                        count={listData.pay.length}
                    >
                        <div className="head-example"
                            onClick={() => { console.log(listData.pay) }}
                        >
                        </div>
                    </Badge>
                )
            }
            if (listData.receive.length > 0) {
                temp.push(
                    <Badge
                        className="badge-space"
                        key="receive"
                        style={{ backgroundColor: '#52c41a' }}
                        count={listData.receive.length}
                    >
                        <div className="head-example"
                            onClick={() => { console.log(listData.receive) }}
                        >
                        </div>
                    </Badge>
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
                <Modal2Receive />
                <Modal2Pay />
                <Button onClick={() => { console.log(this.state.bill2) }}>ver billt2s</Button>
            </Row>
            <Calendar locale={ptBR} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </>
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default Bill2;