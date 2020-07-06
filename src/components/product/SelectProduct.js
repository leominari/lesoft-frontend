import React from 'react'
import { Select } from 'antd'
import { ProductStore } from '../../redux/store';
const { Option } = Select;

class SelectProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productsOptions: [],
      products: ProductStore.getState()
    }
  }

  componentDidMount() {
    let optionRows = []
    let key = 0
    this.state.products.forEach(element => {
      optionRows.push(<Option key={key}>{element.name}</Option>)
      key++
    });
    this.setState({
      productsOptions: optionRows
    })
  }


  render() {

    const onChange = (value) => {
      this.props.data.idProduct = this.state.products[value].id
      this.props.data.productName = this.state.products[value].name

      this.props.form.productId = this.state.products[value].id;
      this.props.form.productName = this.state.products[value].name
      this.props.form.productUnity = this.state.products[value].unity
      this.props.form.productDefaultPrice = this.state.products[value].price
    }


    return (

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Selecione um produto"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {this.state.productsOptions}
      </Select>
    )

  }

}

export default SelectProduct;