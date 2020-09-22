import React from 'react';
import { Select } from 'antd';
import { getToken } from '../../utils/auth';
import api from '../../services/api';

const { Option } = Select;


class SelectPlanoConta extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.selected || "-- Selecione --",
    }
  }

  componentDidMount() {
    var pc;
    api.get('/pc?token=' + getToken()).then(response => {
      console.log(response);
    });

    // let optionRows = []
    // this.state.colaborators.forEach(colaborator => {
    //   optionRows.push(<Option key={colaborator.id}>{colaborator.name}</Option>)
    // });

    // this.setState({
    //   colaboratorOptions: optionRows
    // })


  }

  render() {


    const onChange = (value) => {
      this.props.form.idPlanoContas = value
    }

    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={"Selecione um Plano de Conta"}
        value={this.state.selected}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {this.state.opcoes}
      </Select>
    )
  }
}

export default SelectPlanoConta;

