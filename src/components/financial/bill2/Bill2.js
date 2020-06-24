import React, { useState } from 'react'
import { Calendar, Badge, Row, Button } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import moment from 'moment'
import Modal2Pay from './Modal2Pay'
import Modal2Receive from './Modal2Receive'
import { Bill2Store } from '../../../redux/store'
import Axios from 'axios'
import { getToken } from '../../../utils/auth'
import { Bill2Action } from '../../../redux/actions'

moment.updateLocale('pt', {
    weekdaysMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
});


export default function Bill2() {

    const [bill2, setBill2] = useState([])

    React.useEffect(() => {
        Bill2Store.subscribe(() => {
            setBill2(Bill2Store.getState())
        })

        async function get() {
            await Axios.get('/api/bill2/' + getToken()).then(response => {
                Bill2Store.dispatch({
                    type: Bill2Action.SET,
                    bill2s: response.data.all_bill2
                })
            })
        }

        get()
    }, [])

    function overdue(td, dt) {
        const today = new Date(td)
        const date = new Date(dt)

        if (date.getFullYear() >= today.getFullYear()){
            if (date.getFullYear() === today.getFullYear()){
                if (date.getMonth() >= today.getMonth()){
                    if (date.getMonth() === today.getMonth()){
                        if (date.getDate() >= today.getDate()){
                            if(date.getDate() === today.getDate()){
                                return false
                            }
                            else{
                                return false
                            }
                        }else{
                            return true
                        }
                    }else{
                        return false
                    }
                }else{
                    return true
                }
            }else{
                return false
            }
        }else{
            return true
        }

        console.log('salve')

    }


    function getListData(value) {
        let listData = {
            pay: [],
            receive: [],
            color: ""
        }
        const date = value.year() + "-" + ("00" + (value.month() + 1)).slice(-2) + "-" + value.date()
        const temp = bill2
        const today = new moment()
        if (temp.length > 0) {
            temp.forEach(element => {
                if (date === element.date) {
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

    function dateCellRender(value) {
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

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
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
            <Button onClick={() => { console.log(bill2.length) }}>ver billt2s</Button>
        </Row>
        <Calendar locale={ptBR} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </>
}
