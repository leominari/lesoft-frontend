import React from 'react';
import { TreeSelect } from 'antd';
import { getToken } from '../../utils/auth';
import api from '../../services/api';

class SelectPlanoConta extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [],
    }
  }


  fillTree(data) {
    if (data.length <= 0) return;
    let temp = [];
    data.forEach(element => {
      temp.push({
        title: element.codigo + ' ' + element.nome,
        value: element.codigo,
        pai: element.codigoPai,
        children: [],
      });
    });

    let aux = [...temp];

    aux = aux.filter(pc => {
      return pc.codigo == null
    });

    for (var i = 0; i < temp.length; i++) {
      for (var j = 0; j < aux.length; j++) {
        if (temp[i].value === aux[j].pai) {
          console.log(temp[i].value, aux[j].pai);
          temp[i].children.push(aux[j]);
          aux.splice(j, 1);

        }
      }
    }
    temp = temp.filter(pc => {
      return pc.pai == null
    })
    console.log(temp);
    return temp;
  }


  componentDidMount() {
    api.get('/pc?token=' + getToken()).then(response => {
      var defData = this.fillTree(response.data);
      this.setState({
        treeData: defData,
      })
    });
  }

  render() {

    const onChange = (value) => {
      this.props.form.idPlanoContas = value;
    }

    return (
      <TreeSelect
        showSearch
        style={{
          width: '80%',
          marginLeft: 10
        }}
        placeholder="Please select"
        treeData={this.state.treeData}
        disabled={this.props.disabled}
        onChange={onChange}
      />
    )
  }
}

export default SelectPlanoConta;

