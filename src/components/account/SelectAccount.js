import React from 'react'
import dAccount from '../data/dAccount'
import { AccountStore } from '../../redux/store'
import { Select } from 'antd'
const { Option } = Select

class SelectAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectOptions: []
        }
    }


    componentDidMount() {
        const Account = new dAccount();

        function setOptions(data) {
            const temp = []
            data.forEach(element => {
                temp.push(<Option key={element.id} value={element.id}>{element.name}</Option>)
            });
            return temp
        }

        this.unsubscribe = AccountStore.subscribe(() => {
            const temp = AccountStore.getState()
            this.setState({
                SelectOptions: setOptions(temp)
            })
        })
        Account.getAllAccounts()
    }

    render() {
        const handleChange = (value) => {
            this.props.data.idAccount = value
        }

        return <>
            <Select
                style={{ width: 180 }}
                onChange={handleChange}
                placeholder="Selecione uma Conta"
            >
                {this.state.SelectOptions}
            </Select>
        </>
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

}

export default SelectAccount;