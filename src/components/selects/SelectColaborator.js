import React from 'react'
import { Select } from 'antd'
import { ColaboratorStore } from '../../redux/store';
const { Option } = Select;


class SelectColaborator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colaborators: ColaboratorStore.getState(),
      colaboratorOptions: [],
      selected: this.props.selected || ""
    }
  }

  componentDidMount() {
    let optionRows = []
    
    this.state.colaborators.forEach(colaborator => {
      optionRows.push(<Option key={colaborator.id}>{colaborator.name}</Option>)      
    });

    this.setState({
      colaboratorOptions: optionRows
    })
  }



  render() {
    const typeColab = this.props.type;

    const selectType = () => {
      switch (typeColab) {
        //salesman
        case "salesman":
          return "Vendedor"
        //client
        case "client":
          return "Cliente"

        default:
          return "erro"
      }
    }


    const onChange = (value) => {
      switch (typeColab) {
        case "salesman":
          this.props.form.idSalesman = value
          this.setState({
            selected: value
          })
          break;
        case "client":
          this.props.form.idClient = value
          this.setState({
            selected: value
          })
          break;
        default:
          break;
      }
    }

    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={"Selecione um " + selectType()}
        value={this.state.selected}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >

        {this.state.colaboratorOptions}
      </Select>
    )
  }
}

export default SelectColaborator;

