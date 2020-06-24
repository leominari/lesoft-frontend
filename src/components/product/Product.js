import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import './styles/prod.css'

import ModalProduct from './ModalProduct'
import { ProductStore } from '../../redux/store';
import dProduct from '../data/dProduct';



export default function Product() {
    const Product = new dProduct()
    const [products, setProducts] = useState([])


    useEffect(() => {
        ProductStore.subscribe(() => {
            setProducts(tableData(ProductStore.getState()))
        })
        Product.getAllProducts()
    }, [])

    function tableData(data) {
        const temp = []
        data.forEach(element => {
            temp.push({
                key: element.id,
                name: element.name,
                price: element.price,
                unity: element.unity
            })
        });
        return temp

    }


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
            <Table dataSource={products} columns={columns} className="distancia-botao" />
        </div>
    );

}

