import React, { useState } from 'react'
import dAccount from '../data/dAccount'
import { AccountStore } from '../../redux/store'
import { Button, Select } from 'antd'
import { forEach } from 'lodash'

export default function SelectAccount(params){

    const { Option } = Select
    const Account = new dAccount
    const [AccountState, setAccountState] = useState([])
    const [SelectOptions, setSelectOptions] = useState([])

    React.useEffect(() => {
        AccountStore.subscribe(() => {
            const temp = AccountStore.getState()
            setSelectOptions(setOptions(temp))
            setAccountState(temp)
        })
        Account.getAllAccounts()
    }, [])

    function setOptions(data){
        const temp = []
        data.forEach(element => {
            temp.push(<Option key={element.id} value={element.id}>{element.name}</Option>)
        });
        return temp
    }

    function handleChange(value){
        params.data.idAccount = value
    }

    return <>
        <Select
            style={{ width: 120 }}
            onChange={handleChange}
            placeholder="Selecione uma Conta"
            disabled={params.disabled}
        >
            {SelectOptions}
        </Select>
    </>
}
