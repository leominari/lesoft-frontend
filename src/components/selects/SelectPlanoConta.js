import React from 'react';
import { Select } from 'antd';
import { getToken } from '../../utils/auth';
import api from '../../services/api';

const { Option } = Select;


class SelectPlanoConta extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      planoContasOption: [],
    }
  }

  componentDidMount() {
    let optionRows = []
    api.get('/pc?token=' + getToken()).then(response => {
      response.data.forEach(planoConta => {
        optionRows.push(<Option key={planoConta.id}>{planoConta.id}.{planoConta.descricao}</Option>)
      });

      this.setState({
        planoContasOption: optionRows
      })
    });
  }

  render() {


    const onChange = (value) => {
      this.props.form.idPlanoContas = value;
    }

    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={"Selecione um Plano de Conta"}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {this.state.planoContasOption}
      </Select>
    )
  }
}

export default SelectPlanoConta;

