import React from 'react'
import { Table } from 'antd'
import './styles/prod.css'

import ModalProduct from './ModalProduct'
import { ProductStore } from '../../redux/store';
import dProduct from '../data/dProduct';


class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }


    componentDidMount() {
        const Product = new dProduct();
        function tableData(data) {
            const temp = []
            data.forEach(element => {
                temp.push({
                    key: element.id,
                    name: element.name,
                    price: element.value,
                    unity: element.unity
                })
            });
            return temp

        }

        this.unsubscribe = ProductStore.subscribe(() => {
            this.setState({
                products: tableData(ProductStore.getState()),
            })
        })
        Product.getAllProducts()
    }


    render() {
        const columns = [
            {
                title: 'Código do Produto',
                dataIndex: 'key',
                key: 'key'

            },
            {
                title: 'Nome',
                dataIndex: 'name',
                key: 'name'

            },
            {
                title: 'Preço',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Unidade',
                dataIndex: 'unity',
                key: 'unity'
            },
        ];

        return (
            <div>
                <ModalProduct />
                <Table dataSource={this.state.products} columns={columns} className="distancia-botao" />
            </div>
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default Product;