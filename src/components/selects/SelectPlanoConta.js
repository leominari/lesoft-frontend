import React from 'react';
import { TreeSelect } from 'antd';
import { getToken } from '../../utils/auth';
import api from '../../services/api';

const { TreeNode } = TreeSelect;

var tempData;

class SelectPlanoConta extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      planoContasSelectTree: [],
      loading: true,
      treeData: [],
    }
  }


  fillChildrens(data, codigoPai) {
    console.log(data, codigoPai);
    let x = tempData.filter(dt => { return dt.codigoPai === codigoPai });
    if (x.length > 0) {
      x.forEach(element => {
        let tempObj = {
          title: element.codigo + ' - ' + element.nome,
          value: element.codigo,
          key: element.codigo,
          children: [],
        }
        this.fillChildrens(tempObj.children, element.codigo);
        data.push(tempObj);
      })
    }
  }


  componentDidMount() {
    api.get('/pc?token=' + getToken()).then(response => {
      tempData = response.data;
      var defData = []
      let x = tempData.filter(dt => { return dt.codigoPai == null });
      x.forEach(element => {
        let tempObj = {
          title: element.codigo + ' - ' + element.nome,
          value: element.codigo,
          key: element.codigo,
          children: [],
        }
        this.fillChildrens(tempObj.children, element.codigo);
        defData.push(tempObj);
      })

      this.setState({
        treeData: defData,
      })
    });
  }

  // componentDidMount() {
  //   api.get('/pc?token=' + getToken()).then(response => {
  //     var res = response.data;
  //     console.log(response.data);
  //     let tData = this.state.treeData;
  //     let i = 0;
  //     while (res.length > 1) {
  //       if (!res[i].codigoPai) {
  //         tData.push({
  //           title: res[i].codigo + ' - ' + res[i].nome,
  //           value: res[i].codigo,
  //           key: res[i].codigo,
  //           children: [],
  //         })
  //         res.splice(i, 1);
  //         i--;
  //       }else{
  //         var x = res;
  //         console.log(res);
  //         this.fillChildren(x);
  //         res.splice(i, 1);
  //         i--;
  //       }
  //       if (res.length == i) {
  //         i = 0;
  //       } else {
  //         i++;
  //       }
  //     }

  //     this.setState({
  //       treeData: tData,
  //       loading: !this.state.loading,
  //     });
  //   });
  // }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children.length > 0) {
        return (
          <TreeNode title={item.title} value={item.value} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }


  render() {


    const onChange = (value) => {
      this.props.form.idPlanoContas = value;
    }
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        // allowClear
        disabled={this.props.disabled}
        // treeDefaultExpandAll
        onChange={onChange}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </TreeSelect>
    )
  }
}

export default SelectPlanoConta;

